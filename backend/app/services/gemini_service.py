import json
import os
import logging

from dotenv import load_dotenv
from google import genai


# =========================================================
# LOGGING CONFIGURATION
# =========================================================

logger = logging.getLogger(__name__)


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

API_KEYS = [
    os.getenv(f"GEMINI_API_KEY_{i}")
    for i in range(1, 7)
]

API_KEYS = [
    key.strip()
    for key in API_KEYS
    if key and key.strip()
]

if not API_KEYS:
    raise RuntimeError(
        "No Gemini API keys configured in .env"
    )


# =========================================================
# MODEL CONFIGURATION
# =========================================================

GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.5-flash-lite",
)


# =========================================================
# GEMINI CLIENT INITIALIZATION
# =========================================================

def get_client(api_key: str):
    return genai.Client(api_key=api_key)


active_index = 0
client = get_client(API_KEYS[active_index])


# =========================================================
# GENERATE STYLING RECOMMENDATION
# =========================================================

async def generate_styling_recommendation(prompt: str):
    global client, active_index

    logger.info(
        "Sending styling request using Gemini key #%s",
        active_index + 1,
    )

    try:
        response = await client.aio.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )

        logger.info("Gemini request succeeded.")

    except Exception as error:
        error_text = str(error)
        error_upper = error_text.upper()

        is_quota_error = (
            "429" in error_text
            or "RESOURCE_EXHAUSTED" in error_upper
            or "QUOTA" in error_upper
        )

        if is_quota_error:

            logger.warning(
                "Quota or rate limit encountered for key #%s",
                active_index + 1,
            )

            # Try the next configured key if available.
            if active_index + 1 < len(API_KEYS):

                active_index += 1
                client = get_client(API_KEYS[active_index])

                logger.info(
                    "Retrying with configured key #%s",
                    active_index + 1,
                )

                try:
                    # IMPORTANT: Retry uses the same new model.
                    response = await client.aio.models.generate_content(
                        model=GEMINI_MODEL,
                        contents=prompt,
                    )

                    logger.info(
                        "Gemini retry succeeded using key #%s",
                        active_index + 1,
                    )

                except Exception as retry_error:
                    retry_text = str(retry_error).upper()

                    if (
                        "429" in str(retry_error)
                        or "RESOURCE_EXHAUSTED" in retry_text
                        or "QUOTA" in retry_text
                    ):
                        logger.error(
                            "Quota limit reached on the retry key."
                        )
                        raise RuntimeError(
                            "AI_QUOTA_EXHAUSTED"
                        ) from retry_error

                    logger.exception(
                        "Gemini retry failed."
                    )
                    raise

            else:
                logger.error(
                    "No additional configured Gemini keys available."
                )

                raise RuntimeError(
                    "AI_QUOTA_EXHAUSTED"
                ) from error

        else:
            logger.exception(
                "Gemini API request failed."
            )
            raise

    # =====================================================
    # GET RESPONSE TEXT
    # =====================================================

    if not response.text:
        raise ValueError(
            "Gemini returned an empty response."
        )

    text = response.text.strip()

    # Remove Markdown code fences if present.
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    # =====================================================
    # PARSE JSON
    # =====================================================

    try:
        recommendation = json.loads(text)

    except json.JSONDecodeError as error:
        logger.error(
            "Gemini returned invalid JSON."
        )

        raise ValueError(
            "Gemini returned an invalid JSON response."
        ) from error

    # =====================================================
    # VALIDATE RESPONSE
    # =====================================================

    if not isinstance(recommendation, dict):
        raise ValueError(
            "Gemini response is not a JSON object."
        )

    if "outfit" not in recommendation:
        raise ValueError(
            "Gemini response does not contain an outfit."
        )

    if not isinstance(recommendation["outfit"], list):
        raise ValueError(
            "Gemini outfit response is not a list."
        )

    return recommendation

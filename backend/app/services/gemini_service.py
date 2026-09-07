import json
import os
import logging

from dotenv import load_dotenv
from google import genai


# =========================================================
# LOGGING CONFIGURATION
# =========================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

# Collect all keys into a list
API_KEYS = [
    os.getenv("GEMINI_API_KEY_1"),
    os.getenv("GEMINI_API_KEY_2"),
    os.getenv("GEMINI_API_KEY_3"),
    os.getenv("GEMINI_API_KEY_4"),
    os.getenv("GEMINI_API_KEY_5"),
    os.getenv("GEMINI_API_KEY_6"),
]

# Filter out any missing ones
API_KEYS = [key for key in API_KEYS if key]

if not API_KEYS:
    raise RuntimeError("No Gemini API keys configured in .env")


# =========================================================
# GEMINI CLIENT INITIALIZATION
# =========================================================

def get_client(api_key: str):
    return genai.Client(api_key=api_key)

# Track index of active key
active_index = 0
client = get_client(API_KEYS[active_index])


# =========================================================
# GENERATE STYLING RECOMMENDATION
# =========================================================

async def generate_styling_recommendation(prompt: str):
    global client, active_index

    logging.info(f"Sending request with Gemini key #{active_index+1}: {API_KEYS[active_index][:10]}...")

    try:
        response = await client.aio.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )
        logging.info("Gemini request succeeded.")

    except Exception as error:
        error_text = str(error)

        if (
            "429" in error_text
            or "RESOURCE_EXHAUSTED" in error_text
            or "quota" in error_text.lower()
        ):
            logging.error(f"Quota exceeded on key #{active_index+1}: {API_KEYS[active_index][:10]}...")
            logging.error(error_text)

            # Try next key if available
            if active_index + 1 < len(API_KEYS):
                active_index += 1
                logging.info(f"Switching to GEMINI_API_KEY_{active_index+1}...")
                client = get_client(API_KEYS[active_index])

                # Retry once with new key
                response = await client.aio.models.generate_content(
                    model="gemini-3.5-flash",
                    contents=prompt,
                )
                logging.info(f"Retry with key #{active_index+1} succeeded.")
            else:
                logging.error("All keys exhausted.")
                raise RuntimeError("AI_QUOTA_EXHAUSTED") from error

        else:
            logging.error("Gemini API error:")
            logging.error(error_text)
            raise

    # =====================================================
    # GET RESPONSE TEXT
    # =====================================================
    if not response.text:
        raise ValueError("Gemini returned an empty response")

    text = response.text.strip()

    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    try:
        recommendation = json.loads(text)
    except json.JSONDecodeError as error:
        logging.error("Gemini returned invalid JSON:")
        logging.error(text)
        raise ValueError("Gemini returned an invalid JSON response") from error

    if not isinstance(recommendation, dict):
        raise ValueError("Gemini response is not a JSON object")

    if "outfit" not in recommendation:
        raise ValueError("Gemini response does not contain an outfit")

    if not isinstance(recommendation["outfit"], list):
        raise ValueError("Gemini outfit response is not a list")

    return recommendation

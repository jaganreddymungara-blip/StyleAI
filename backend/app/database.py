from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(MONGO_URL)

db = client[DATABASE_NAME]

# Collections
users_collection = db["users"]
profiles_collection = db["profiles"]
wardrobe_collection = db["wardrobe"]
favorites_collection = db["favorites"]
recommendation_history_collection = db["recommendation_history"]

print("Database:", DATABASE_NAME)
print("Mongo URL:", MONGO_URL)
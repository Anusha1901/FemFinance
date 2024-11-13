from dotenv import load_dotenv
import os

load_dotenv()

# Access variables like this
DATABASE_URL = os.getenv("DATABASE_URL")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
import os
import requests

API_KEY = os.getenv("OPENROUTER_API_KEY")

if not API_KEY:
    raise SystemExit("OPENROUTER_API_KEY required")

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "HTTP-Referer": "https://modelit.local",
    "X-Title": "ModelIt Image Regeneration",
}

response = requests.get("https://openrouter.ai/api/v1/models", headers=HEADERS, timeout=60)
response.raise_for_status()

data = response.json()

for model in data.get("data", []):
    if "gemini" in model["id"].lower():
        print(model["id"])

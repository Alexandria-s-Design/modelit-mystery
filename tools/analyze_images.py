import base64
import json
import os
from pathlib import Path

from openai import OpenAI

BASE_DIR = Path(__file__).resolve().parent.parent
IMAGES_DIR = BASE_DIR / "images" / "scenes"
OUTPUT_FILE = BASE_DIR / "images" / "scene_analysis.json"


PROMPT = """You are reviewing concept art frames for an educational science story about Dr. Maya.
Describe the main character, the scene setting, and overall mood in 2-3 sentences.
Note any visual elements that support the story's biotech theme.
Mention if the character appears consistent with a friendly Black female scientist in a white lab coat with teal shirt and curly bun hairstyle.
Flag any inconsistencies or anything that feels off for a middle school audience."""


def encode_image(path: Path) -> str:
    with open(path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def analyze_image(client: OpenAI, image_path: Path) -> dict:
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": PROMPT},
                    {
                        "type": "input_image",
                        "image_url": f"data:image/png;base64,{encode_image(image_path)}",
                    },
                ],
            }
        ],
    )

    description = response.output_text.strip()

    return {
        "image": image_path.name,
        "analysis": description,
    }


def main():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise SystemExit("OPENAI_API_KEY is required to analyze images.")

    client = OpenAI(api_key=api_key)

    results = []
    for image_path in sorted(IMAGES_DIR.glob("*.png")):
        print(f"Analyzing {image_path.name}...")
        result = analyze_image(client, image_path)
        results.append(result)

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    print(f"\nAnalysis complete. Summary saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()

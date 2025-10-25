import base64
from pathlib import Path

from openai import OpenAI

client = OpenAI()

img_path = Path("images/scenes/ch0_scene1_maya_intro.png")

with open(img_path, "rb") as f:
    encoded = base64.b64encode(f.read()).decode("utf-8")

prompt = "Describe the main character's appearance and setting."

response = client.responses.create(
    model="gpt-4.1-mini",
    input=[
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": prompt},
                {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{encoded}",
                },
            ],
        }
    ],
)

print(response.output_text)

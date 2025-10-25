import json
from pathlib import Path

analysis_path = Path("images/scene_analysis.json")
data = json.loads(analysis_path.read_text(encoding="utf-8"))

flags = []
for entry in data:
    text = entry["analysis"].lower()
    if any(word in text for word in ["inconsist", "deviation", "off"]):
        flags.append(entry)

print(f"Found {len(flags)} potential consistency notes.")
for entry in flags:
    print("\n", entry["image"])
    lines = entry["analysis"].split("\n")
    print("  " + lines[0])
    if len(lines) > 1:
        print("  " + lines[1])

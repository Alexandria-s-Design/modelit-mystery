"""
Validate all game assets are present and accessible.
"""

from pathlib import Path

print("=== ModelIt Mystery - Asset Validation ===\n")

# Check voice files
voice_dir = Path("audio/voice")
expected_voices = 79

if voice_dir.exists():
    voice_files = [f.name for f in voice_dir.iterdir() if f.suffix == ".mp3"]
    print(f"[OK] Voice files: {len(voice_files)}/{expected_voices} found")

    if len(voice_files) < expected_voices:
        print(f"  WARNING: Missing {expected_voices - len(voice_files)} voice files")

    boss_variants = {
        3: ["correct", "gameover1", "gameover3"],
        6: ["correct", "gameover1", "gameover3"],
        9: ["correct", "gameover1", "gameover3"],
    }
    voice_set = set(voice_files)
    for chapter, variants in boss_variants.items():
        missing = [
            variant
            for variant in variants
            if f"ch{chapter}_{variant}.mp3" not in voice_set
        ]
        if missing:
            print(
                f"  WARNING: Missing boss voice clips for chapter {chapter}: {', '.join(missing)}"
            )
else:
    print(f"[MISS] Voice directory not found: {voice_dir}")

# Check background music
music_file = Path("audio/background_music.mp3")
if music_file.exists():
    size = music_file.stat().st_size / (1024 * 1024)  # MB
    print(f"[OK] Background music: {size:.2f} MB")
else:
    print(f"[MISS] Background music not found: {music_file}")

# Check scene images
images_dir = Path("images/scenes")
expected_images = 49

if images_dir.exists():
    image_files = [f for f in images_dir.iterdir() if f.suffix == ".png"]
    print(f"[OK] Scene images: {len(image_files)}/{expected_images} found")
else:
    print(f"[MISS] Images directory not found: {images_dir}")

# Check main game file
game_file = Path("modelit-story.html")
if game_file.exists():
    size_kb = game_file.stat().st_size / 1024
    print(f"[OK] Main game file: {size_kb:.1f} KB")

    content = game_file.read_text(encoding="utf-8")
    if "puter.com" in content:
        print("  WARNING: Puter.js references still present")
    else:
        print("  [OK] Puter.js successfully removed")

    if "audio/background_music.mp3" in content:
        print("  [OK] Local background music integrated")
    else:
        print("  WARNING: Background music might not be integrated")

    if "audio/voice/" in content:
        print("  [OK] Local voice system integrated")
    else:
        print("  WARNING: Voice system might not be integrated")
else:
    print(f"[MISS] Main game file not found: {game_file}")

print("\n=== Validation Complete ===")

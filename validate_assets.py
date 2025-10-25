"""
Validate all game assets are present and accessible
"""

import os

print("=== ModelIt Mystery - Asset Validation ===\n")

# Check voice files
voice_dir = "audio/voice"
expected_voices = 79

if os.path.exists(voice_dir):
    voice_files = [f for f in os.listdir(voice_dir) if f.endswith('.mp3')]
    print(f"✓ Voice files: {len(voice_files)}/{expected_voices} found")
    if len(voice_files) < expected_voices:
        print(f"  WARNING: Missing {expected_voices - len(voice_files)} voice files")
else:
    print(f"✗ Voice directory not found: {voice_dir}")

# Check background music
music_file = "audio/background_music.mp3"
if os.path.exists(music_file):
    size = os.path.getsize(music_file) / (1024 * 1024)  # MB
    print(f"✓ Background music: {size:.2f} MB")
else:
    print(f"✗ Background music not found: {music_file}")

# Check scene images
images_dir = "images/scenes"
expected_images = 49

if os.path.exists(images_dir):
    image_files = [f for f in os.listdir(images_dir) if f.endswith('.png')]
    print(f"✓ Scene images: {len(image_files)}/{expected_images} found")
else:
    print(f"✗ Images directory not found: {images_dir}")

# Check main game file
game_file = "modelit-story.html"
if os.path.exists(game_file):
    size = os.path.getsize(game_file) / 1024  # KB
    print(f"✓ Main game file: {size:.1f} KB")

    # Check for Puter.js references (should be removed)
    with open(game_file, 'r', encoding='utf-8') as f:
        content = f.read()
        if 'puter.com' in content:
            print(f"  WARNING: Puter.js references still present")
        else:
            print(f"  ✓ Puter.js successfully removed")

        if 'audio/background_music.mp3' in content:
            print(f"  ✓ Local background music integrated")
        else:
            print(f"  WARNING: Background music might not be integrated")

        if 'audio/voice/' in content:
            print(f"  ✓ Local voice system integrated")
        else:
            print(f"  WARNING: Voice system might not be integrated")
else:
    print(f"✗ Main game file not found: {game_file}")

print("\n=== Validation Complete ===")

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regenerate 20 Inconsistent Dr. Maya Images with Perfect Character Consistency"""

import os
import sys

# Fix Windows console encoding
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

import os
import json
import requests
import time
from pathlib import Path

# Load API key from .env
env_file = Path(__file__).parent / '.env'
if env_file.exists():
    with open(env_file, 'r') as f:
        for line in f:
            if line.startswith('OPENROUTER_API_KEY='):
                API_KEY = line.split('=', 1)[1].strip()

if not API_KEY:
    print("❌ OPENROUTER_API_KEY not found in .env file")
    exit(1)

OUTPUT_DIR = Path(__file__).parent / 'images' / 'scenes'

# Character reference for consistency
CHARACTER_REFERENCE = """Beautiful African American woman scientist Dr. Maya with:
- Rich brown skin tone (warm medium-dark brown)
- Natural curly/afro hair styled professionally (dark brown/black)
- Large expressive brown eyes, warm and intelligent
- White lab coat over teal/cyan shirt
- Friendly, confident, approachable expression
- Futuristic laboratory setting with cyan/blue lighting
- Semi-realistic cartoon/anime art style (Pixar/Disney animated movie quality)
- Professional digital illustration, vibrant colors, clean lines"""

# 20 images that need regeneration for character consistency
IMAGES_TO_REGENERATE = [
    {
        'filename': 'ch0_scene2_glowing_cells.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya looking amazed at Petri dish with glowing blue cells, cells pulsing with bioluminescent blue light, holographic microscope display, scientific wonder expression, dynamic glowing effect'
    },
    {
        'filename': 'ch1_scene3_mysterious_signal.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya examining mysterious signal on holographic screen, pointing at signal protein visualization, curious investigative expression, glowing molecular structures floating around'
    },
    {
        'filename': 'ch2_scene1_network_mapping.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya standing before large holographic network diagram, mapping cellular connections, thoughtful analytical expression, cyan glowing network nodes and connections'
    },
    {
        'filename': 'ch2_scene3_changing_pattern.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya watching holographic display showing rapidly changing blue glow patterns, concerned focused expression, multiple screens showing dynamic cellular changes'
    },
    {
        'filename': 'ch3_scene1_lab_notes.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya reviewing lab notes on tablet, serious focused expression, holographic data floating around, mutation warning symbols visible'
    },
    {
        'filename': 'ch3_scene3_different_results.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya examining lab results with worried concerned expression, tablet showing mutation data, holographic displays with orange warning alerts, dramatic tension'
    },
    {
        'filename': 'ch4_scene2_decoding_rules.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya decoding logic rules on holographic interface, determined intellectual expression, AND/OR gates visualized as glowing diagrams, network patterns'
    },
    {
        'filename': 'ch4_scene3_cells_spreading.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya with alarmed surprised expression, raising hand as she observes cells multiplying rapidly on screens, dynamic spreading cell animation effect'
    },
    {
        'filename': 'ch5_scene3_final_state.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya with eureka moment expression, pointing at holographic state space diagram showing convergence pattern, excited discovery pose, glowing pattern visualization'
    },
    {
        'filename': 'ch6_scene1_feedback_discovery.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya discovering feedback loop diagram, amazed realization expression, circular feedback loop glowing on holographic display, breakthrough moment lighting'
    },
    {
        'filename': 'ch6_scene3_encrypted_message.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya reading encrypted message on holographic screen, serious intense expression, code and encrypted text visible, orange alert symbols, feedback loop diagram'
    },
    {
        'filename': 'ch7_scene1_simulation_screen.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya operating simulation controls, focused professional expression, multiple holographic simulation screens showing predictions, futuristic control interface'
    },
    {
        'filename': 'ch7_scene3_ventilation_check.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya looking up suspiciously at ventilation system, one eyebrow raised questioning expression, holding tablet with environmental readings, mysterious atmosphere'
    },
    {
        'filename': 'ch8_scene1_experiment_setup.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya setting up experiment with test tubes and equipment, careful precise expression, holographic experiment protocol visible, scientific instruments glowing'
    },
    {
        'filename': 'ch8_scene3_power_outage.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya in darkened lab with emergency red lighting, holding flashlight, determined brave expression, cells still glowing blue in darkness, dramatic emergency atmosphere'
    },
    {
        'filename': 'ch9_scene1_validation_comparison.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya comparing model predictions with real data, analytical thinking expression, split-screen holographic displays showing comparison charts, validation graphs'
    },
    {
        'filename': 'ch9_scene2_evolved_feedback.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya analyzing evolved feedback system, concentrated intellectual expression, complex feedback loop diagram with multiple connections glowing cyan'
    },
    {
        'filename': 'ch9_scene3_intruder_alert.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya during red alert emergency, fierce determined protective expression, hands on control panel, red emergency lighting, alarm symbols, high tension moment'
    },
    {
        'filename': 'ch10_scene1_final_iteration.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya making final model adjustments, confident skilled expression, holographic model interface, iteration cycle visualization, professional mastery pose'
    },
    {
        'filename': 'ch10_scene2_solution_found.png',
        'prompt': f'{CHARACTER_REFERENCE}, Dr. Maya victorious celebration pose with arms raised, huge proud smile, achievement holographic displays, success indicators, bright celebratory atmosphere, triumphant moment'
    }
]

def generate_image_openrouter(filename, prompt):
    """Generate image using OpenRouter with DALL-E 3"""
    print(f"\n🎨 Generating: {filename}")
    print(f"   Prompt: {prompt[:80]}...")

    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:8000',
        'X-Title': 'ModelIt Mystery - Dr. Maya Character Consistency'
    }

    # Use DALL-E 3 via OpenRouter for high-quality image generation
    payload = {
        'model': 'openai/dall-e-3',
        'prompt': prompt,
        'n': 1,
        'size': '1024x1024',
        'quality': 'hd',
        'style': 'vivid'
    }

    try:
        response = requests.post(
            'https://openrouter.ai/api/v1/images/generations',
            headers=headers,
            json=payload,
            timeout=120
        )

        if response.status_code == 200:
            data = response.json()
            image_url = data['data'][0]['url']

            # Download the generated image
            print(f"   📥 Downloading from: {image_url[:60]}...")
            img_response = requests.get(image_url, timeout=60)

            if img_response.status_code == 200:
                output_path = OUTPUT_DIR / filename
                with open(output_path, 'wb') as f:
                    f.write(img_response.content)
                print(f"   ✅ SUCCESS: {filename} ({len(img_response.content) // 1024}KB)")
                return True
            else:
                print(f"   ❌ Download failed: {img_response.status_code}")
                return False
        else:
            print(f"   ❌ API Error: {response.status_code}")
            print(f"   Response: {response.text[:200]}")
            return False

    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def main():
    print("="*70)
    print("🎨 REGENERATING 20 INCONSISTENT DR. MAYA IMAGES")
    print("="*70)
    print(f"\n✅ API Key configured")
    print(f"✅ Output directory: {OUTPUT_DIR}")
    print(f"✅ Using DALL-E 3 (HD quality) via OpenRouter")
    print(f"\n📊 Total images to regenerate: {len(IMAGES_TO_REGENERATE)}")
    print("\n" + "="*70)

    if not OUTPUT_DIR.exists():
        print(f"❌ Output directory not found: {OUTPUT_DIR}")
        exit(1)

    success_count = 0
    fail_count = 0

    for i, image_data in enumerate(IMAGES_TO_REGENERATE, 1):
        print(f"\n[{i}/{len(IMAGES_TO_REGENERATE)}] Processing...")

        if generate_image_openrouter(image_data['filename'], image_data['prompt']):
            success_count += 1
        else:
            fail_count += 1

        # Wait 3 seconds between requests to respect rate limits
        if i < len(IMAGES_TO_REGENERATE):
            print("   ⏳ Waiting 3 seconds...")
            time.sleep(3)

    # Final summary
    print("\n" + "="*70)
    print("📊 GENERATION SUMMARY")
    print("="*70)
    print(f"✅ Successfully generated: {success_count}/{len(IMAGES_TO_REGENERATE)}")
    print(f"❌ Failed: {fail_count}/{len(IMAGES_TO_REGENERATE)}")
    print(f"\n💰 Estimated cost: ~${len(IMAGES_TO_REGENERATE) * 0.04:.2f} (DALL-E 3 HD)")
    print("="*70)

    if success_count == len(IMAGES_TO_REGENERATE):
        print("\n🎉 ALL IMAGES GENERATED SUCCESSFULLY!")
        print("✅ Dr. Maya character consistency achieved across all scenes!")
    elif success_count > 0:
        print(f"\n⚠️  {success_count} images generated, but {fail_count} failed.")
        print("You may need to retry the failed images.")
    else:
        print("\n❌ No images were generated successfully.")
        print("Please check your API key and OpenRouter account balance.")

if __name__ == '__main__':
    main()

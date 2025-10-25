#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regenerate 20 Dr. Maya Images with Nano Banana (Gemini 2.5 Flash) - HIGH QUALITY"""

import os
import sys
import json
import requests
import time
import base64
from pathlib import Path

# Fix Windows console
if sys.platform == 'win32':
    os.system('chcp 65001 > nul')

# Load API key
env_file = Path(__file__).parent / '.env'
if env_file.exists():
    with open(env_file, 'r') as f:
        for line in f:
            if line.startswith('OPENROUTER_API_KEY='):
                API_KEY = line.split('=', 1)[1].strip()

OUTPUT_DIR = Path(__file__).parent / 'images' / 'scenes'

# High-level character reference for Nano Banana
CHARACTER_REF = """Dr. Maya: Beautiful African American woman scientist, rich warm brown skin, natural curly afro hair (dark brown), large expressive brown eyes, white lab coat over teal shirt, friendly intelligent expression, futuristic cyan-lit laboratory, semi-realistic cartoon style (Pixar/Disney quality), professional digital illustration"""

# 20 images for regeneration with Nano Banana
IMAGES = [
    {'file': 'ch0_scene2_glowing_cells.png', 'desc': 'Dr. Maya amazed at Petri dish with glowing blue bioluminescent cells, holographic microscope'},
    {'file': 'ch1_scene3_mysterious_signal.png', 'desc': 'Dr. Maya examining mysterious signal protein on holographic screen, curious expression'},
    {'file': 'ch2_scene1_network_mapping.png', 'desc': 'Dr. Maya before large holographic network diagram, mapping cellular connections'},
    {'file': 'ch2_scene3_changing_pattern.png', 'desc': 'Dr. Maya watching displays showing rapidly changing blue glow patterns, concerned'},
    {'file': 'ch3_scene1_lab_notes.png', 'desc': 'Dr. Maya reviewing lab notes on tablet, serious focused, mutation warnings visible'},
    {'file': 'ch3_scene3_different_results.png', 'desc': 'Dr. Maya worried examining mutation data on tablet, orange warning alerts'},
    {'file': 'ch4_scene2_decoding_rules.png', 'desc': 'Dr. Maya decoding logic rules, AND/OR gates glowing on holographic interface'},
    {'file': 'ch4_scene3_cells_spreading.png', 'desc': 'Dr. Maya alarmed, hand raised, watching cells multiply rapidly on screens'},
    {'file': 'ch5_scene3_final_state.png', 'desc': 'Dr. Maya eureka moment, pointing at holographic state space showing convergence'},
    {'file': 'ch6_scene1_feedback_discovery.png', 'desc': 'Dr. Maya discovering feedback loop, amazed at circular glowing diagram'},
    {'file': 'ch6_scene3_encrypted_message.png', 'desc': 'Dr. Maya serious reading encrypted code on screen, orange alerts, feedback diagram'},
    {'file': 'ch7_scene1_simulation_screen.png', 'desc': 'Dr. Maya operating simulation controls, multiple prediction screens'},
    {'file': 'ch7_scene3_ventilation_check.png', 'desc': 'Dr. Maya suspicious looking up at vents, eyebrow raised, holding tablet'},
    {'file': 'ch8_scene1_experiment_setup.png', 'desc': 'Dr. Maya setting up experiment with test tubes, careful precise expression'},
    {'file': 'ch8_scene3_power_outage.png', 'desc': 'Dr. Maya in dark lab with red emergency lights, holding flashlight, cells glowing blue'},
    {'file': 'ch9_scene1_validation_comparison.png', 'desc': 'Dr. Maya comparing model vs real data, analytical, split-screen displays'},
    {'file': 'ch9_scene2_evolved_feedback.png', 'desc': 'Dr. Maya analyzing complex evolved feedback system, concentrated expression'},
    {'file': 'ch9_scene3_intruder_alert.png', 'desc': 'Dr. Maya during red alert, fierce determined, hands on control panel, alarms'},
    {'file': 'ch10_scene1_final_iteration.png', 'desc': 'Dr. Maya making final model adjustments, confident skilled, iteration visualization'},
    {'file': 'ch10_scene2_solution_found.png', 'desc': 'Dr. Maya victorious arms raised, huge smile, achievement displays, celebration'}
]

def generate_nano_banana(filename, description):
    """Generate image using Nano Banana (Google Gemini 2.5 Flash via OpenRouter)"""
    print(f"\n[{IMAGES.index(next(i for i in IMAGES if i['file'] == filename)) + 1}/{len(IMAGES)}] {filename}")

    full_prompt = f"{CHARACTER_REF}. Scene: {description}. High quality, vibrant colors, professional art."

    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:8000',
        'X-Title': 'ModelIt Mystery - Dr. Maya'
    }

    payload = {
        'model': 'google/gemini-2.0-flash-exp:free',  # Nano Banana
        'prompt': full_prompt,
        'n': 1,
        'size': '1024x1024'
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

            img_response = requests.get(image_url, timeout=60)
            if img_response.status_code == 200:
                with open(OUTPUT_DIR / filename, 'wb') as f:
                    f.write(img_response.content)
                print(f"  SUCCESS ({len(img_response.content)//1024}KB)")
                return True
            else:
                print(f"  DOWNLOAD FAILED: {img_response.status_code}")
                return False
        else:
            print(f"  API ERROR: {response.status_code} - {response.text[:150]}")
            return False
    except Exception as e:
        print(f"  EXCEPTION: {str(e)[:100]}")
        return False

def main():
    print("=" * 70)
    print("REGENERATING 20 DR. MAYA IMAGES WITH NANO BANANA (GEMINI 2.5 FLASH)")
    print("=" * 70)
    print(f"\nModel: google/gemini-2.0-flash-exp (Nano Banana)")
    print(f"Images: {len(IMAGES)}")
    print(f"Output: {OUTPUT_DIR}\n")
    print("=" * 70)

    success = 0
    failed = 0

    for img in IMAGES:
        if generate_nano_banana(img['file'], img['desc']):
            success += 1
        else:
            failed += 1
        time.sleep(2)  # Rate limiting

    print("\n" + "=" * 70)
    print(f"COMPLETE: {success}/{len(IMAGES)} successful, {failed} failed")
    print("=" * 70)

    if success == len(IMAGES):
        print("\nALL IMAGES GENERATED SUCCESSFULLY!")

if __name__ == '__main__':
    main()

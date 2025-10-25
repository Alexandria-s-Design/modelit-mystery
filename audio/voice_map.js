// Voice file mapping for ModelIt Mystery Game
// Maps story scenes to pre-recorded MP3 voice files

const VOICE_MAP = {
    // Chapter 0 - Scene indices
    "0_0": "ch0_scene0",
    "0_1": "ch0_scene1",
    "0_2": "ch0_scene2",
    "0_learning": "ch0_learning",
    "0_choice": "ch0_choice",
    "0_feedback_0": "ch0_feedback1",
    "0_feedback_1": "ch0_feedback2",

    // Chapter 1
    "1_0": "ch1_scene0",
    "1_1": "ch1_scene1",
    "1_2": "ch1_scene2",
    "1_learning": "ch1_learning",
    "1_choice": "ch1_choice",
    "1_feedback_0": "ch1_feedback1",
    "1_feedback_1": "ch1_feedback2",

    // Chapter 2
    "2_0": "ch2_scene0",
    "2_1": "ch2_scene1",
    "2_2": "ch2_scene2",
    "2_learning": "ch2_learning",
    "2_choice": "ch2_choice",
    "2_feedback_0": "ch2_feedback1",
    "2_feedback_1": "ch2_feedback2",

    // Chapter 3 (Boss 1)
    "3_0": "ch3_scene0",
    "3_1": "ch3_scene1",
    "3_2": "ch3_scene2",
    "3_learning": "ch3_learning",
    "3_choice": "ch3_choice",
    "3_feedback_0": "ch3_gameover1",
    "3_feedback_1": "ch3_correct",
    "3_feedback_2": "ch3_gameover2",

    // Chapter 4
    "4_0": "ch4_scene0",
    "4_1": "ch4_scene1",
    "4_2": "ch4_scene2",
    "4_learning": "ch4_learning",
    "4_choice": "ch4_choice",
    "4_feedback_0": "ch4_feedback1",
    "4_feedback_1": "ch4_feedback2",

    // Chapter 5
    "5_0": "ch5_scene0",
    "5_1": "ch5_scene1",
    "5_2": "ch5_scene2",
    "5_learning": "ch5_learning",
    "5_choice": "ch5_choice",
    "5_feedback_0": "ch5_feedback1",
    "5_feedback_1": "ch5_feedback2",

    // Chapter 6 (Boss 2)
    "6_0": "ch6_scene0",
    "6_1": "ch6_scene1",
    "6_2": "ch6_scene2",
    "6_learning": "ch6_learning",
    "6_choice": "ch6_choice",
    "6_feedback_0": "ch6_gameover1",
    "6_feedback_1": "ch6_correct",
    "6_feedback_2": "ch6_gameover2",

    // Chapter 7
    "7_0": "ch7_scene0",
    "7_1": "ch7_scene1",
    "7_2": "ch7_scene2",
    "7_learning": "ch7_learning",
    "7_choice": "ch7_choice",
    "7_feedback_0": "ch7_feedback1",
    "7_feedback_1": "ch7_feedback2",

    // Chapter 8
    "8_0": "ch8_scene0",
    "8_1": "ch8_scene1",
    "8_2": "ch8_scene2",
    "8_learning": "ch8_learning",
    "8_choice": "ch8_choice",
    "8_feedback_0": "ch8_feedback1",
    "8_feedback_1": "ch8_feedback2",

    // Chapter 9 (Final Boss)
    "9_0": "ch9_scene0",
    "9_1": "ch9_scene1",
    "9_2": "ch9_scene2",
    "9_learning": "ch9_learning",
    "9_choice": "ch9_choice",
    "9_feedback_0": "ch9_gameover1",
    "9_feedback_1": "ch9_correct",
    "9_feedback_2": "ch9_gameover2",

    // Chapter 10
    "10_0": "ch10_scene0",
    "10_1": "ch10_scene1",
    "10_2": "ch10_scene2",
    "10_3": "ch10_scene3",
    "10_learning": "ch10_learning",
    "10_learning_final": "ch10_learning_final"
};

// Helper function to get voice file path
function getVoiceFile(chapterId, sceneIndex, type = 'scene') {
    const key = `${chapterId}_${type === 'scene' ? sceneIndex : type}`;
    const voiceId = VOICE_MAP[key];
    return voiceId ? `audio/voice/${voiceId}.mp3` : null;
}

// ModelIt! - The Mystery of the Mutating Cells
// COMPLETE SCREEN-BY-SCREEN STORY DATA
// 80+ Individual Screens - Each dialogue, learning, and choice separated!

const COMPLETE_STORY = {
    screens: [
        // ========== OPENING SEQUENCE (Already shown in enhanced.html) ==========

        // ========== CHAPTER 0: THE DISCOVERY (5 screens) ==========
        {
            id: 0,
            type: 'dialogue',
            chapter: 0,
            speaker: 'Dr. Maya',
            text: "Hey there! I'm Dr. Maya, and I need YOUR help! Something weird is happening in my lab...",
            image: 'images/scenes/ch0_scene1_maya_intro.png'
        },
        {
            id: 1,
            type: 'dialogue',
            chapter: 0,
            speaker: 'Dr. Maya',
            text: "Last night, I was working late when I noticed something INCREDIBLE - cells in my Petri dish started glowing blue! But not just any glow... they were pulsing in a pattern.",
            image: 'images/scenes/ch0_scene2_glowing_cells.png'
        },
        {
            id: 2,
            type: 'dialogue',
            chapter: 0,
            speaker: 'Dr. Maya',
            text: "I've been a biologist for 10 years, and I've NEVER seen anything like this. These cells are communicating in ways we don't understand. We need to build a model to figure this out!",
            image: 'images/scenes/ch0_scene2_maya_excited.png'
        },
        {
            id: 3,
            type: 'learning',
            chapter: 0,
            fundamental: 1,
            title: '🧬 Fundamental #1: What is a Model?',
            content: "A model is like a blueprint for understanding how something works! Just like architects use blueprints to build buildings, scientists use models to understand biological systems. A model helps us predict what will happen BEFORE we try it in real life!",
            image: 'images/scenes/ch0_scene3_modeling_explanation.png'
        },
        {
            id: 4,
            type: 'choice',
            chapter: 0,
            question: 'How should we begin our investigation?',
            image: 'images/scenes/ch0_scene1_maya_intro.png',
            options: [
                {
                    text: "Let's identify what molecules are involved in this glowing",
                    feedback: "Brilliant! We need to know what we're working with first. Just like a detective needs to identify the suspects!",
                    next: 5
                },
                {
                    text: "Let's run an experiment right away and see what happens",
                    feedback: "I like your enthusiasm! But we need to be systematic. Let's first identify what components we're dealing with, THEN we can experiment!",
                    next: 5
                }
            ]
        },

        // ========== CHAPTER 1: THE COMPONENTS (5 screens) ==========
        {
            id: 5,
            type: 'dialogue',
            chapter: 1,
            speaker: 'Dr. Maya',
            text: "Okay, let's look closer! Under my super-powered microscope, I can see what's making the cells glow...",
            image: 'images/scenes/ch1_scene1_microscope_view.png'
        },
        {
            id: 6,
            type: 'dialogue',
            chapter: 1,
            speaker: 'Dr. Maya',
            text: "I see THREE main players here: First, there's a mysterious Signal Protein outside the cell. Second, a Receptor on the cell's surface. And third, an Enzyme inside the cell that's actually creating the glow!",
            image: 'images/scenes/ch1_scene2_three_components.png'
        },
        {
            id: 7,
            type: 'learning',
            chapter: 1,
            fundamental: 2,
            title: '🔬 Fundamental #2: Components (Species)',
            content: "In modeling, we call the important parts 'components' or 'species'. These are the biological molecules that interact - like proteins, DNA, and enzymes. Think of them as the CHARACTERS in our story! Identifying them is always step #1.",
            image: 'images/scenes/ch1_scene2_cell_diagram.png'
        },
        {
            id: 8,
            type: 'dialogue',
            chapter: 1,
            speaker: 'Dr. Maya',
            text: "But wait... something's OFF. The signal protein - it's not from these cells. It's coming from somewhere ELSE. Someone... or something... is sending signals to my cells!",
            image: 'images/scenes/ch1_scene3_mysterious_signal.png'
        },
        {
            id: 9,
            type: 'choice',
            chapter: 1,
            question: 'This is getting mysterious! What should we investigate next?',
            image: 'images/scenes/ch1_scene3_receptors.png',
            options: [
                {
                    text: 'How do these three components interact with each other?',
                    feedback: "YES! Understanding HOW they interact is the next crucial step. You're thinking like a real modeler!",
                    next: 10
                },
                {
                    text: 'We need to find out where that signal is coming from!',
                    feedback: "Good detective instinct! But first, let's understand how the system works internally. Once we know THAT, finding the source will be easier!",
                    next: 10
                }
            ]
        },

        // ========== CHAPTER 2: THE CONNECTIONS (5 screens) ==========
        {
            id: 10,
            type: 'dialogue',
            chapter: 2,
            speaker: 'Dr. Maya',
            text: "Time to map out HOW these components talk to each other! This is where it gets exciting...",
            image: 'images/scenes/ch2_scene1_network_mapping.png'
        },
        {
            id: 11,
            type: 'dialogue',
            chapter: 2,
            speaker: 'Dr. Maya',
            text: "Watch this! The Signal Protein binds to the Receptor... which ACTIVATES the Enzyme... which creates the glow! It's like a chain reaction - or what we call a regulatory network!",
            image: 'images/scenes/ch2_scene2_chain_reaction.png'
        },
        {
            id: 12,
            type: 'learning',
            chapter: 2,
            fundamental: 3,
            title: '🔗 Fundamental #3: Relationships (Regulators)',
            content: "Components don't work alone - they INTERACT! We call these interactions 'regulators' or 'relationships'. One component can ACTIVATE another (turn it ON) or INHIBIT it (turn it OFF). It's like a conversation where molecules talk to each other!",
            image: 'images/scenes/ch2_scene2_logic_gates.png'
        },
        {
            id: 13,
            type: 'dialogue',
            chapter: 2,
            speaker: 'Dr. Maya',
            text: "So we have: Signal → Receptor → Enzyme → Glow! But hold on... *checks computer* ...the glow pattern is changing FASTER than it should. There must be something else going on!",
            image: 'images/scenes/ch2_scene3_changing_pattern.png'
        },
        {
            id: 14,
            type: 'choice',
            chapter: 2,
            question: 'The plot thickens! What do you think is happening?',
            image: 'images/scenes/ch2_scene1_network_mapping.png',
            options: [
                {
                    text: 'Maybe the enzyme is feeding back and affecting the receptor?',
                    feedback: "WHOA! You just discovered a feedback loop! That's advanced thinking - let's explore this!",
                    next: 15
                },
                {
                    text: 'Perhaps we need to check what state the components start in?',
                    feedback: "Smart! Initial conditions are super important. Let's figure out the starting state of our system!",
                    next: 15
                }
            ]
        },

        // ========== CHAPTER 3: BOSS LEVEL 1 - INITIAL CONDITIONS (5 screens) ==========
        {
            id: 15,
            type: 'dialogue',
            chapter: 3,
            speaker: 'Dr. Maya',
            text: "⚠️ Wait! Before we continue, the cells are showing signs of dangerous mutation! I need to know you REALLY understand initial conditions, or this could go very wrong!",
            image: 'images/scenes/ch3_scene1_mutation_warning.png'
        },
        {
            id: 16,
            type: 'learning',
            chapter: 3,
            fundamental: 4,
            title: '▶️ Fundamental #4: Initial Conditions',
            content: "Every system has a starting point! Initial conditions tell us the state of each component at the beginning - is it ON or OFF? ACTIVE or INACTIVE? This starting point determines EVERYTHING that happens next. Change the start, change the whole story!",
            image: 'images/scenes/ch3_scene2_initial_state_diagram.png'
        },
        {
            id: 17,
            type: 'dialogue',
            chapter: 3,
            speaker: 'Dr. Maya',
            text: "Here's our system: Signal (external), Receptor (on cell surface), Enzyme (inside cell). At time zero: Signal is OFF, Receptor is OFF, Enzyme is OFF.",
            image: 'images/scenes/ch3_scene1_lab_notes.png'
        },
        {
            id: 18,
            type: 'dialogue',
            chapter: 3,
            speaker: 'Dr. Maya',
            text: "⚠️ CRITICAL QUESTION coming up! If I change ONLY the Receptor to start in the ON state (while Signal stays OFF and Enzyme stays OFF), what happens to the Enzyme? Think carefully - your answer determines if we can safely continue!",
            image: 'images/scenes/ch3_scene3_different_results.png'
        },
        {
            id: 19,
            type: 'boss',
            chapter: 3,
            question: '⚔️ BOSS CHALLENGE: What happens to the Enzyme?',
            image: 'images/scenes/ch3_scene2_initial_state_diagram.png',
            options: [
                {
                    text: 'The Enzyme turns ON immediately because the Receptor is ON',
                    gameOver: true,
                    feedback: "WRONG! ❌ The Enzyme needs BOTH Signal AND Receptor to be ON (remember the AND gate?). Just having the Receptor ON isn't enough. The cells have mutated catastrophically!",
                    next: -1
                },
                {
                    text: 'The Enzyme stays OFF because Signal is still OFF (needs both)',
                    feedback: "CORRECT! ✅ Brilliant! You remembered the AND logic! The Enzyme needs BOTH Signal AND Receptor to activate. Since Signal is OFF, Enzyme stays OFF. You just saved the experiment!",
                    next: 20
                },
                {
                    text: "The system crashes - invalid starting state",
                    gameOver: true,
                    feedback: "WRONG! ❌ Any combination of ON/OFF states is valid! The cells have spread out of control!",
                    next: -1
                }
            ]
        },

        // ========== CHAPTER 4: LOGIC FUNCTIONS (5 screens) ==========
        {
            id: 20,
            type: 'dialogue',
            chapter: 4,
            speaker: 'Dr. Maya',
            text: "Time to dive into the RULES! Every biological system follows logic - we just need to decode it...",
            image: 'images/scenes/ch4_scene1_logic_gates.png'
        },
        {
            id: 21,
            type: 'dialogue',
            chapter: 4,
            speaker: 'Dr. Maya',
            text: "I figured it out! The Enzyme turns ON when BOTH the Receptor is active AND the Signal is present. It's an AND gate - like saying 'IF Receptor is ON AND Signal is present, THEN Enzyme is ON'!",
            image: 'images/scenes/ch4_scene2_network_diagram.png'
        },
        {
            id: 22,
            type: 'learning',
            chapter: 4,
            fundamental: 5,
            title: '🧮 Fundamental #5: Logic Functions',
            content: "Biology uses logic! Components follow rules like AND, OR, and NOT. For example: 'Enzyme turns ON if Receptor is ON AND Signal is present' (AND gate). Or 'Gene activates if Factor A OR Factor B is present' (OR gate). These logical rules determine how the system behaves!",
            image: 'images/scenes/ch4_scene2_decoding_rules.png'
        },
        {
            id: 23,
            type: 'dialogue',
            chapter: 4,
            speaker: 'Dr. Maya',
            text: "But wait... *alarm starts beeping* ...OH NO! The cells just multiplied! They're spreading to other Petri dishes! And the pattern... it's repeating itself over and over. We need to understand ALL possible states!",
            image: 'images/scenes/ch4_scene3_cells_spreading.png'
        },
        {
            id: 24,
            type: 'choice',
            chapter: 4,
            question: 'This is escalating! What should we focus on?',
            image: 'images/scenes/ch4_scene1_logic_gates.png',
            options: [
                {
                    text: "Let's map out every possible state the system could be in",
                    feedback: "Critical thinking! Understanding the full state space will show us where this is heading!",
                    next: 25
                },
                {
                    text: 'We need to stop the spread before it\'s too late!',
                    feedback: "I understand the urgency, but to STOP it, we first need to UNDERSTAND it. Let's map the state space!",
                    next: 25
                }
            ]
        },

        // ========== CHAPTER 5: STATE SPACE (6 screens) ==========
        {
            id: 25,
            type: 'dialogue',
            chapter: 5,
            speaker: 'Dr. Maya',
            text: "Okay, let's think this through systematically. With 3 components that can each be ON or OFF, how many possible states can the system be in?",
            image: 'images/scenes/ch5_scene1_state_space_map.png',
            next: 26
        },
        {
            id: 26,
            type: 'dialogue',
            chapter: 5,
            speaker: 'Dr. Maya',
            text: "The answer is 2³ = 8 possible states! From 'everything OFF' to 'everything ON' and all combinations in between. This is what we call the state space - the map of all possibilities!",
            image: 'images/scenes/ch5_scene2_cycling_states.png',
            next: 27
        },
        {
            id: 27,
            type: 'learning',
            chapter: 5,
            fundamental: 6,
            title: '🗺️ Fundamental #6: State Space',
            content: "State space is like a map of EVERY possible configuration of your system! With N components that can be ON or OFF, you get 2^N possible states. For 3 components: 2³ = 8 states. For 10 components: 2¹⁰ = 1,024 states! Understanding state space helps us see ALL the paths our system could take.",
            image: 'images/scenes/ch5_scene2_feedback_cycles.png',
            next: 28
        },
        {
            id: 28,
            type: 'dialogue',
            chapter: 5,
            speaker: 'Dr. Maya',
            text: "And here's what's TERRIFYING - the system is cycling through multiple states, but it always ends up in the SAME final state no matter where it starts! It's like the cells are being PROGRAMMED to reach a specific outcome...",
            image: 'images/scenes/ch5_scene3_final_state.png',
            next: 29
        },
        {
            id: 29,
            type: 'choice',
            chapter: 5,
            question: 'Why would the system always end up in the same state?',
            image: 'images/scenes/ch5_scene3_positive_feedback.png',
            options: [
                {
                    text: 'There must be a feedback loop controlling the system!',
                    feedback: "BRILLIANT! Feedback loops can create stable states. Let's investigate!",
                    next: 30
                },
                {
                    text: "Maybe it's an attractor state - like a magnet pulling the system",
                    feedback: "YES! You just described an attractor - a stable state that pulls the system toward it. Excellent!",
                    next: 30
                }
            ]
        },

        // ========== CHAPTER 6: ATTRACTORS (6 screens) ==========
        {
            id: 30,
            type: 'dialogue',
            chapter: 6,
            speaker: 'Dr. Maya',
            text: "You're onto something! This final state the system keeps reaching - it's called an ATTRACTOR. Like a whirlpool that pulls everything toward it!",
            image: 'images/scenes/ch6_scene1_attractors.png',
            next: 31
        },
        {
            id: 31,
            type: 'dialogue',
            chapter: 6,
            speaker: 'Dr. Maya',
            text: "Look at this visualization - no matter where we start in the state space, the system ALWAYS flows toward the same point. That's a point attractor!",
            image: 'images/scenes/ch6_scene2_attractor_basin.png',
            next: 32
        },
        {
            id: 32,
            type: 'learning',
            chapter: 6,
            fundamental: 7,
            title: '🌀 Fundamental #7: Attractors',
            content: "Attractors are stable states that systems naturally move toward! Like water flowing downhill, biological systems flow through state space toward attractors. A point attractor is a single stable state. A cyclic attractor is a repeating loop. Attractors help us understand where systems will end up!",
            image: 'images/scenes/ch6_scene3_cyclic_attractors.png',
            next: 33
        },
        {
            id: 33,
            type: 'dialogue',
            chapter: 6,
            speaker: 'Dr. Maya',
            text: "But wait - *computer alarm* - I'm detecting TWO attractors! The cells can settle into TWO different stable states depending on initial conditions. This is getting more complex!",
            image: 'images/scenes/ch6_scene1_multiple_attractors.png',
            next: 34
        },
        {
            id: 34,
            type: 'dialogue',
            chapter: 6,
            speaker: 'Dr. Maya',
            text: "One attractor has all cells glowing blue. The other has them glowing RED. The color depends on which initial state we start from. This is called BISTABILITY - two stable states!",
            image: 'images/scenes/ch6_scene2_stable_states.png',
            next: 35
        },
        {
            id: 35,
            type: 'choice',
            chapter: 6,
            question: 'What could be causing this bistability?',
            image: 'images/scenes/ch6_scene3_bifurcation.png',
            options: [
                {
                    text: 'Positive feedback loops creating two stable equilibria',
                    feedback: "EXACTLY! Positive feedback can create multiple stable states. You're mastering this!",
                    next: 36
                },
                {
                    text: 'Different pathways through the state space',
                    feedback: "Good thinking! Yes, different paths lead to different attractors. This is key!",
                    next: 36
                }
            ]
        },

        // ========== CHAPTER 7: BOSS LEVEL 2 - FEEDBACK LOOPS (5 screens) ==========
        {
            id: 36,
            type: 'dialogue',
            chapter: 7,
            speaker: 'Dr. Maya',
            text: "⚠️ CRITICAL ALERT! The cells are starting to mutate rapidly! I need to test your understanding of feedback loops RIGHT NOW or we could lose control!",
            image: 'images/scenes/ch7_scene1_feedback_crisis.png',
            next: 37
        },
        {
            id: 37,
            type: 'learning',
            chapter: 7,
            fundamental: 8,
            title: '🔄 Fundamental #8: Feedback Loops',
            content: "Feedback loops are when a component affects itself - directly or through other components! POSITIVE feedback amplifies changes (like a microphone near a speaker). NEGATIVE feedback dampens changes (like a thermostat). Feedback loops create complex dynamic behaviors!",
            image: 'images/scenes/ch7_scene2_positive_negative_feedback.png',
            next: 38
        },
        {
            id: 38,
            type: 'dialogue',
            chapter: 7,
            speaker: 'Dr. Maya',
            text: "In our system: The Enzyme activates a Transcription Factor, which produces MORE Enzyme. That's a POSITIVE feedback loop!",
            image: 'images/scenes/ch7_scene3_feedback_diagram.png',
            next: 39
        },
        {
            id: 39,
            type: 'boss',
            chapter: 7,
            question: '⚔️ BOSS CHALLENGE: If we have a POSITIVE feedback loop, what happens to the Enzyme levels over time?',
            image: 'images/scenes/ch7_scene2_positive_negative_feedback.png',
            options: [
                {
                    text: 'Enzyme levels oscillate up and down in a wave pattern',
                    gameOver: true,
                    feedback: "WRONG! ❌ That would be negative feedback creating oscillations. Positive feedback AMPLIFIES! The mutation spreads uncontrollably!",
                    next: -1
                },
                {
                    text: 'Enzyme levels increase rapidly until reaching maximum',
                    feedback: "CORRECT! ✅ Perfect! Positive feedback AMPLIFIES - the more Enzyme, the MORE gets produced! It rises until saturated. Crisis averted!",
                    next: 40
                },
                {
                    text: 'Enzyme levels stay constant at equilibrium',
                    gameOver: true,
                    feedback: "WRONG! ❌ That's a NEGATIVE feedback creating homeostasis. Positive feedback drives change! Total system collapse!",
                    next: -1
                }
            ]
        },

        // ========== CHAPTER 8: PERTURBATIONS (6 screens) ==========
        {
            id: 40,
            type: 'dialogue',
            chapter: 8,
            speaker: 'Dr. Maya',
            text: "Great work! But now I need to understand - what happens if I PERTURB the system? What if I add a drug that temporarily blocks the Enzyme?",
            image: 'images/scenes/ch8_scene1_perturbation.png',
            next: 41
        },
        {
            id: 41,
            type: 'dialogue',
            chapter: 8,
            speaker: 'Dr. Maya',
            text: "Watch this! I'm adding the drug... the Enzyme drops... but then - LOOK! - the system RECOVERS and returns to the blue-glow attractor! The system is ROBUST!",
            image: 'images/scenes/ch8_scene2_recovery.png',
            next: 42
        },
        {
            id: 42,
            type: 'learning',
            chapter: 8,
            fundamental: 9,
            title: '💊 Fundamental #9: Perturbations & Robustness',
            content: "A perturbation is a temporary disturbance to a system - like a drug, mutation, or environmental change. ROBUST systems can absorb perturbations and return to their attractor. FRAGILE systems collapse. Understanding perturbation response is crucial for medicine and therapy!",
            image: 'images/scenes/ch8_scene3_robustness.png',
            next: 43
        },
        {
            id: 43,
            type: 'dialogue',
            chapter: 8,
            speaker: 'Dr. Maya',
            text: "But if I perturb it TOO much - say, knocking out BOTH the Enzyme AND the Receptor - then... *gasp* ...it switches to the RED-glow attractor instead!",
            image: 'images/scenes/ch8_scene1_switching_attractors.png',
            next: 44
        },
        {
            id: 44,
            type: 'dialogue',
            chapter: 8,
            speaker: 'Dr. Maya',
            text: "This is huge! We can CONTROL which attractor the system settles into by carefully choosing our perturbations! This is how targeted therapies work!",
            image: 'images/scenes/ch8_scene2_therapeutic_intervention.png',
            next: 45
        },
        {
            id: 45,
            type: 'choice',
            chapter: 8,
            question: 'What does this mean for treating diseases?',
            image: 'images/scenes/ch8_scene3_treatment_strategies.png',
            options: [
                {
                    text: 'We can push diseased cells back to healthy attractors!',
                    feedback: "BRILLIANT! That's exactly how many therapies work - nudging systems back to healthy states!",
                    next: 46
                },
                {
                    text: 'We need to understand the full state space to design treatments',
                    feedback: "YES! Modeling the full system helps us design better interventions!",
                    next: 46
                }
            ]
        },

        // ========== CHAPTER 9: TIMESCALES (6 screens) ==========
        {
            id: 46,
            type: 'dialogue',
            chapter: 9,
            speaker: 'Dr. Maya',
            text: "One more thing - I'm noticing something about TIMING. Different components change at different SPEEDS!",
            image: 'images/scenes/ch9_scene1_timescales.png',
            next: 47
        },
        {
            id: 47,
            type: 'dialogue',
            chapter: 9,
            speaker: 'Dr. Maya',
            text: "The Signal changes in seconds. The Receptor takes minutes. The Enzyme takes HOURS! These different timescales create complex dynamics!",
            image: 'images/scenes/ch9_scene2_slow_fast_dynamics.png',
            next: 48
        },
        {
            id: 48,
            type: 'learning',
            chapter: 9,
            fundamental: 10,
            title: '⏱️ Fundamental #10: Timescales & Dynamics',
            content: "Biological systems operate on MULTIPLE timescales! Signals work in seconds, proteins in minutes, gene expression in hours, cell division in days. Understanding these timescales is essential for predicting system behavior. FAST processes reach equilibrium while SLOW ones are still changing!",
            image: 'images/scenes/ch9_scene3_temporal_hierarchy.png',
            next: 49
        },
        {
            id: 49,
            type: 'dialogue',
            chapter: 9,
            speaker: 'Dr. Maya',
            text: "This explains the pulsing pattern! The fast Signal cycles many times while the slow Enzyme gradually accumulates. It's like waves on top of a rising tide!",
            image: 'images/scenes/ch9_scene1_oscillations.png',
            next: 50
        },
        {
            id: 50,
            type: 'dialogue',
            chapter: 9,
            speaker: 'Dr. Maya',
            text: "And NOW I understand the mystery! The cells aren't randomly mutating - they're being COORDINATED by this multi-timescale signaling system!",
            image: 'images/scenes/ch9_scene2_coordinated_behavior.png',
            next: 51
        },
        {
            id: 51,
            type: 'choice',
            chapter: 9,
            question: 'Where do you think the mysterious signal is coming from?',
            image: 'images/scenes/ch9_scene3_signal_source.png',
            options: [
                {
                    text: 'From the cells themselves - they\\'re communicating!',
                    feedback: "INTERESTING! Cell-to-cell communication is a real phenomenon. But let's find out...",
                    next: 52
                },
                {
                    text: 'From something outside - another organism perhaps?',
                    feedback: "Intriguing hypothesis! Let's investigate the source...",
                    next: 52
                }
            ]
        },

        // ========== CHAPTER 10: BOSS LEVEL 3 - THE REVELATION (8 screens) ==========
        {
            id: 52,
            type: 'dialogue',
            chapter: 10,
            speaker: 'Dr. Maya',
            text: "⚠️ FINAL CHALLENGE! I've traced the signal source - and you won't BELIEVE what I found...",
            image: 'images/scenes/ch10_scene1_revelation.png',
            next: 53
        },
        {
            id: 53,
            type: 'dialogue',
            chapter: 10,
            speaker: 'Dr. Maya',
            text: "*Opens sealed container* It's... it's a sample from the Mars Curiosity rover! These signals are coming from MARTIAN bacteria! They're trying to communicate with Earth cells!",
            image: 'images/scenes/ch10_scene2_mars_sample.png',
            next: 54
        },
        {
            id: 54,
            type: 'dialogue',
            chapter: 10,
            speaker: 'Dr. Maya',
            text: "But there's a problem - if we don't shut down the interaction correctly, the feedback loop could create a runaway reaction! I need you to apply EVERYTHING you've learned!",
            image: 'images/scenes/ch10_scene3_emergency.png',
            next: 55
        },
        {
            id: 55,
            type: 'boss',
            chapter: 10,
            question: '⚔️ FINAL BOSS: To safely stop the system, which intervention will work?',
            image: 'images/scenes/ch10_scene1_intervention_choice.png',
            options: [
                {
                    text: 'Block the Signal - that\\'s the external input driving everything',
                    feedback: "CORRECT! ✅ BRILLIANT! Blocking the external Signal breaks the cascade at the source. With no Signal, the system safely returns to the OFF-OFF-OFF attractor! You saved the lab!",
                    next: 56
                },
                {
                    text: 'Inhibit the Enzyme - stop the output directly',
                    gameOver: true,
                    feedback: "WRONG! ❌ The positive feedback loop means blocking Enzyme isn't enough - the Receptor is still active and will reactivate it! Catastrophic failure!",
                    next: -1
                },
                {
                    text: 'Remove the Receptor - eliminate the sensor',
                    gameOver: true,
                    feedback: "WRONG! ❌ The Enzyme is already saturated from feedback! Removing Receptor won't help now. System overload!",
                    next: -1
                },
                {
                    text: 'Activate negative feedback to create homeostasis',
                    gameOver: true,
                    feedback: "WRONG! ❌ We don't have time to engineer new feedback! We need to cut the external input NOW! Too late!",
                    next: -1
                }
            ]
        },

        // ========== ENDING SEQUENCE (4 screens) ==========
        {
            id: 56,
            type: 'dialogue',
            chapter: 10,
            speaker: 'Dr. Maya',
            text: "*The blue glow fades* You did it! The cells are returning to normal. The Martian bacteria are safely contained!",
            image: 'images/scenes/ch10_scene2_success.png',
            next: 57
        },
        {
            id: 57,
            type: 'dialogue',
            chapter: 10,
            speaker: 'Dr. Maya',
            text: "Thanks to YOUR modeling skills, we prevented a biological catastrophe AND discovered proof of extraterrestrial life! Not bad for a day's work!",
            image: 'images/scenes/ch10_scene3_celebration.png',
            next: 58
        },
        {
            id: 58,
            type: 'dialogue',
            chapter: 10,
            speaker: 'Dr. Maya',
            text: "You've mastered ALL 10 fundamentals of Boolean modeling! You can now: identify components, map relationships, understand logic, predict states, find attractors, analyze feedback, test perturbations, and design interventions!",
            image: 'images/scenes/ch10_scene1_mastery.png',
            next: 59
        },
        {
            id: 59,
            type: 'dialogue',
            chapter: 10,
            speaker: 'Dr. Maya',
            text: "These skills aren't just for games - they're used by real scientists to understand cancer, design drugs, predict epidemics, and engineer synthetic life. YOU have the power to change the world! 🎓🧬",
            image: 'images/scenes/ch0_scene1_maya_intro.png',
            next: -1
        }
    ]
};

// Export
if (typeof window !== 'undefined') {
    window.COMPLETE_STORY = COMPLETE_STORY;
}

// ModelIt! - The Mystery of the Mutating Cells
// Complete 10-Chapter Branching Story Adventure
// Teaching the 10 Fundamentals of Boolean Modeling
// UPDATED: Scene-level images for unique visuals on every screen

const STORY_DATA = {
    // 10 Modeling Fundamentals we'll teach:
    // 1. Introduction to Modeling
    // 2. Identifying Components (Species)
    // 3. Defining Relationships (Regulators)
    // 4. Setting Initial Conditions
    // 5. Specifying Logic Functions
    // 6. Understanding State Space
    // 7. Analyzing Feedback Loops
    // 8. Predicting System Behavior
    // 9. Testing Perturbations
    // 10. Validating with Data

    chapters: [
        // CHAPTER 0: The Discovery (Introduction to Modeling)
        {
            id: 0,
            title: 'The Discovery',
            concept: 'What is a Model?',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: "Hey there! I'm Dr. Maya, and I need YOUR help! Something weird is happening in my lab...",
                    learning: null,
                    image: 'images/scenes/ch0_scene1_maya_intro.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: 'Last night, I was working late when I noticed something INCREDIBLE - cells in my Petri dish started glowing blue! But not just any glow... they were pulsing in a pattern.',
                    learning: null,
                    image: 'images/scenes/ch0_scene2_glowing_cells.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "I've been a biologist for 10 years, and I've NEVER seen anything like this. These cells are communicating in ways we don't understand. We need to build a <span class='concept-highlight'>model</span> to figure this out!",
                    learning: {
                        title: '🧬 What is a Model?',
                        content:
                            'A model is like a blueprint for understanding how something works! Just like architects use blueprints to build buildings, scientists use models to understand biological systems. A model helps us predict what will happen BEFORE we try it in real life!',
                    },
                    image: 'images/scenes/ch0_scene3_modeling_explanation.png',
                },
            ],
            choice: {
                question: 'How should we begin our investigation?',
                image: 'images/scenes/ch0_scene2_maya_excited.png',
                options: [
                    {
                        text: "Let's identify what molecules are involved in this glowing",
                        next: 1,
                        feedback:
                            "Brilliant! We need to know what we're working with first. Just like a detective needs to identify the suspects!",
                    },
                    {
                        text: "Let's run an experiment right away and see what happens",
                        next: 1,
                        feedback:
                            "I like your enthusiasm! But we need to be systematic. Let's first identify what components we're dealing with, THEN we can experiment!",
                    },
                ],
            },
        },

        // CHAPTER 1: The Components (Identifying Species)
        {
            id: 1,
            title: 'Hunting for Clues',
            concept: 'Components (Species)',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: "Okay, let's look closer! Under my super-powered microscope, I can see what's making the cells glow...",
                    learning: null,
                    image: 'images/scenes/ch1_scene1_microscope_view.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "I see THREE main players here: First, there's a mysterious <span class='concept-highlight'>Signal Protein</span> outside the cell. Second, a <span class='concept-highlight'>Receptor</span> on the cell's surface. And third, an <span class='concept-highlight'>Enzyme</span> inside the cell that's actually creating the glow!",
                    learning: {
                        title: '🔬 Components (Species)',
                        content:
                            "In modeling, we call the important parts 'components' or 'species'. These are the biological molecules that interact - like proteins, DNA, and enzymes. Think of them as the CHARACTERS in our story! Identifying them is always step #1.",
                    },
                    image: 'images/scenes/ch1_scene2_three_components.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "But wait... something's OFF. The signal protein - it's not from these cells. It's coming from somewhere ELSE. Someone... or something... is sending signals to my cells!",
                    learning: null,
                    image: 'images/scenes/ch1_scene3_mysterious_signal.png',
                },
            ],
            choice: {
                question: 'This is getting mysterious! What should we investigate next?',
                image: 'images/scenes/ch1_scene3_receptors.png',
                options: [
                    {
                        text: 'How do these three components interact with each other?',
                        next: 2,
                        feedback:
                            "YES! Understanding HOW they interact is the next crucial step. You're thinking like a real modeler!",
                    },
                    {
                        text: 'We need to find out where that signal is coming from!',
                        next: 2,
                        feedback:
                            "Good detective instinct! But first, let's understand how the system works internally. Once we know THAT, finding the source will be easier!",
                    },
                ],
            },
        },

        // CHAPTER 2: The Connections (Defining Relationships)
        {
            id: 2,
            title: 'Connect the Dots',
            concept: 'Relationships (Regulators)',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: 'Time to map out HOW these components talk to each other! This is where it gets exciting...',
                    learning: null,
                    image: 'images/scenes/ch2_scene1_network_mapping.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "Watch this! The Signal Protein binds to the Receptor... which ACTIVATES the Enzyme... which creates the glow! It's like a chain reaction - or what we call a <span class='concept-highlight'>regulatory network</span>!",
                    learning: {
                        title: '🔗 Relationships (Regulators)',
                        content:
                            "Components don't work alone - they INTERACT! We call these interactions 'regulators' or 'relationships'. One component can ACTIVATE another (turn it ON) or INHIBIT it (turn it OFF). It's like a conversation where molecules talk to each other!",
                    },
                    image: 'images/scenes/ch2_scene2_logic_gates.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: 'So we have: Signal → Receptor → Enzyme → Glow! But hold on... *checks computer* ...the glow pattern is changing FASTER than it should. There must be something else going on!',
                    learning: null,
                    image: 'images/scenes/ch2_scene3_changing_pattern.png',
                },
            ],
            choice: {
                question: 'The plot thickens! What do you think is happening?',
                image: 'images/scenes/ch2_scene2_chain_reaction.png',
                options: [
                    {
                        text: 'Maybe the enzyme is feeding back and affecting the receptor?',
                        next: 3,
                        feedback:
                            "WHOA! You just discovered a feedback loop! That's advanced thinking - let's explore this!",
                    },
                    {
                        text: 'Perhaps we need to check what state the components start in?',
                        next: 3,
                        feedback:
                            "Smart! Initial conditions are super important. Let's figure out the starting state of our system!",
                    },
                ],
            },
        },

        // CHAPTER 3: BOSS LEVEL 1 - Initial Conditions Challenge
        {
            id: 3,
            title: '⚔️ BOSS CHALLENGE: The Starting Point',
            concept: 'Initial Conditions',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: 'Wait! Before we continue, the cells are showing signs of dangerous mutation! I need to know you REALLY understand initial conditions, or this could go very wrong!',
                    learning: null,
                    image: 'images/scenes/ch3_scene1_mutation_warning.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "Here's our system: Signal (external), Receptor (on cell surface), Enzyme (inside cell). At time zero: Signal is OFF, Receptor is OFF, Enzyme is OFF.",
                    learning: {
                        title: '▶️ Initial Conditions',
                        content:
                            'Every system has a starting point! Initial conditions tell us the state of each component at the beginning - is it ON or OFF? ACTIVE or INACTIVE? This starting point determines EVERYTHING that happens next. Change the start, change the whole story!',
                    },
                    image: 'images/scenes/ch3_scene2_initial_state_diagram.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: '⚠️ CRITICAL QUESTION: If I change ONLY the Receptor to start in the ON state (while Signal stays OFF and Enzyme stays OFF), what happens to the Enzyme? Think carefully - your answer determines if we can safely continue!',
                    learning: null,
                    image: 'images/scenes/ch3_scene1_lab_notes.png',
                },
            ],
            choice: {
                question: '⚠️ BOSS QUESTION: What happens to the Enzyme?',
                image: 'images/scenes/ch3_scene3_different_results.png',
                options: [
                    {
                        text: 'The Enzyme turns ON immediately because the Receptor is ON',
                        next: 4,
                        gameOver: true,
                        feedback:
                            "WRONG! ❌ The Enzyme needs BOTH Signal AND Receptor to be ON (remember the AND gate from earlier?). Just having the Receptor ON isn't enough. The cells have mutated catastrophically because of this miscalculation!",
                    },
                    {
                        text: 'The Enzyme stays OFF because Signal is still OFF (needs both Signal AND Receptor)',
                        next: 4,
                        feedback:
                            'CORRECT! ✅ Brilliant! You remembered the AND logic! The Enzyme needs BOTH Signal AND Receptor to activate. Since Signal is OFF, Enzyme stays OFF. You just saved the experiment!',
                    },
                    {
                        text: "The system crashes because it's an invalid starting state",
                        next: 4,
                        gameOver: true,
                        feedback:
                            "WRONG! ❌ Any combination of ON/OFF states is valid! The system won't crash - but you need to predict what happens. The cells have spread out of control because we couldn't predict the behavior!",
                    },
                ],
            },
        },

        // CHAPTER 4: The Rules (Logic Functions)
        {
            id: 4,
            title: 'Cracking the Code',
            concept: 'Logic Functions',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: 'Time to dive into the RULES! Every biological system follows logic - we just need to decode it...',
                    learning: null,
                    image: 'images/scenes/ch4_scene1_logic_gates.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "I figured it out! The Enzyme turns ON when BOTH the Receptor is active AND the Signal is present. It's an <span class='concept-highlight'>AND gate</span> - like saying 'IF Receptor is ON AND Signal is present, THEN Enzyme is ON'!",
                    learning: {
                        title: '🧮 Logic Functions',
                        content:
                            "Biology uses logic! Components follow rules like AND, OR, and NOT. For example: 'Enzyme turns ON if Receptor is ON AND Signal is present' (AND gate). Or 'Gene activates if Factor A OR Factor B is present' (OR gate). These logical rules determine how the system behaves!",
                    },
                    image: 'images/scenes/ch4_scene2_decoding_rules.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "But wait... *alarm starts beeping* ...OH NO! The cells just multiplied! They're spreading to other Petri dishes! And the pattern... it's repeating itself over and over. We need to understand ALL possible states this system can be in!",
                    learning: null,
                    image: 'images/scenes/ch4_scene3_cells_spreading.png',
                },
            ],
            choice: {
                question: 'This is escalating! What should we focus on?',
                image: 'images/scenes/ch4_scene2_network_diagram.png',
                options: [
                    {
                        text: "Let's map out every possible state the system could be in",
                        next: 5,
                        feedback:
                            'Critical thinking! Understanding the full state space will show us where this is heading!',
                    },
                    {
                        text: "We need to stop the spread before it's too late!",
                        next: 5,
                        feedback:
                            "I understand the urgency, but to STOP it, we first need to UNDERSTAND it. Let's map the state space!",
                    },
                ],
            },
        },

        // CHAPTER 5: All Possibilities (State Space)
        {
            id: 5,
            title: 'The Big Picture',
            concept: 'State Space',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: "Okay, let's think this through systematically. With 3 components that can each be ON or OFF, how many possible states can the system be in?",
                    learning: null,
                    image: 'images/scenes/ch5_scene1_state_space_map.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "The answer is 2³ = 8 possible states! From 'everything OFF' to 'everything ON' and all combinations in between. This is what we call the <span class='concept-highlight'>state space</span> - the map of all possibilities!",
                    learning: {
                        title: '🗺️ State Space',
                        content:
                            'State space is like a map of EVERY possible configuration of your system! With N components that can be ON or OFF, you get 2^N possible states. For 3 components: 2³ = 8 states. For 10 components: 2¹⁰ = 1,024 states! Understanding state space helps us see ALL the paths our system could take.',
                    },
                    image: 'images/scenes/ch5_scene2_cycling_states.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "And here's what's TERRIFYING - the system is cycling through multiple states, but it always ends up in the SAME final state no matter where it starts! It's like the cells are being PROGRAMMED to reach a specific outcome...",
                    learning: null,
                    image: 'images/scenes/ch5_scene3_final_state.png',
                },
            ],
            choice: {
                question: 'Why would the system always end up in the same state?',
                image: 'images/scenes/ch5_scene2_feedback_cycles.png',
                options: [
                    {
                        text: 'There must be a feedback loop controlling the system!',
                        next: 6,
                        feedback:
                            "BRILLIANT! Feedback loops can create stable states. Let's investigate!",
                    },
                    {
                        text: "Maybe it's an attractor state - like a magnet pulling the system",
                        next: 6,
                        feedback:
                            'YES! You just described an attractor - a stable state that pulls the system toward it. Excellent!',
                    },
                ],
            },
        },

        // CHAPTER 6: BOSS LEVEL 2 - Feedback Loop Challenge
        {
            id: 6,
            title: '⚔️ BOSS CHALLENGE: The Hidden Loop',
            concept: 'Feedback Loops',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: "⚠️ ALERT! The cells are pulsing faster! I found a FEEDBACK LOOP we missed! The Enzyme doesn't just create the glow - it ALSO affects the Receptor!",
                    learning: null,
                    image: 'images/scenes/ch6_scene1_feedback_discovery.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: 'The Enzyme creates a molecule that INHIBITS the Receptor - turning it OFF! Signal → Receptor → Enzyme → Inhibits Receptor.',
                    learning: {
                        title: '🔄 Feedback Loops',
                        content:
                            'Feedback loops are when outputs affect inputs! POSITIVE feedback amplifies signals (like a microphone screech). NEGATIVE feedback stabilizes systems (like a thermostat). Feedback loops are EVERYWHERE in biology - they control everything from your body temperature to how cells divide!',
                    },
                    image: 'images/scenes/ch6_scene2_negative_feedback.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "⚠️ CRITICAL SITUATION: *alarm blaring* The cells are spreading! I need you to tell me: What type of feedback loop is this, and what will it do to the system's behavior? Your answer determines if we can contain this!",
                    learning: null,
                    image: 'images/scenes/ch6_scene2_control_systems.png',
                },
            ],
            choice: {
                question: '⚠️ BOSS QUESTION: What will this feedback loop do?',
                image: 'images/scenes/ch6_scene3_encrypted_message.png',
                options: [
                    {
                        text: "It's POSITIVE feedback - the signal will amplify and grow exponentially!",
                        next: 7,
                        gameOver: true,
                        feedback:
                            'WRONG! ❌ This is NEGATIVE feedback (Enzyme INHIBITS Receptor)! Positive feedback would amplify, but negative feedback creates oscillations or stability. The cells have spiraled out of control because we misunderstood the dynamics!',
                    },
                    {
                        text: "It's NEGATIVE feedback - it will create oscillations or stabilize the system",
                        next: 7,
                        feedback:
                            'CORRECT! ✅ Excellent! Negative feedback (Enzyme inhibits Receptor) creates self-regulation - the system will pulse ON and OFF rhythmically, or settle into a stable state! This is how biological clocks and thermostats work!',
                    },
                    {
                        text: "Feedback loops don't matter - only the initial state matters",
                        next: 7,
                        gameOver: true,
                        feedback:
                            'WRONG! ❌ Feedback loops COMPLETELY change system behavior! They can create oscillations, bistability, or chaos! Ignoring the feedback loop has led to catastrophic cell mutation!',
                    },
                ],
            },
        },

        // CHAPTER 7: The Prediction (System Behavior)
        {
            id: 7,
            title: 'What Happens Next?',
            concept: 'Predicting Behavior',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: 'This is where our model becomes powerful! We can PREDICT what happens before we try it in real life!',
                    learning: null,
                    image: 'images/scenes/ch7_scene1_simulation_screen.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "Let me run a simulation... If we cut the signal, then: Receptor becomes inactive → Enzyme turns OFF → No more glow → Cells return to normal! The <span class='concept-highlight'>system behavior</span> stabilizes to a safe state!",
                    learning: {
                        title: '🔮 Predicting System Behavior',
                        content:
                            "This is the POWER of models! We can simulate what happens over time WITHOUT doing dangerous experiments. We can fast-forward, rewind, and test scenarios. It's like having a time machine for biology! Models let us predict the future before it happens.",
                    },
                    image: 'images/scenes/ch7_scene2_prediction_models.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "But *checks ventilation* ...someone's been using this signal to control the cells! If we shut it off suddenly, we don't know if there will be side effects. What if we TEST what happens when we perturb the system different ways?",
                    learning: null,
                    image: 'images/scenes/ch7_scene3_ventilation_check.png',
                },
            ],
            choice: {
                question: 'How should we test the system?',
                image: 'images/scenes/ch7_scene2_prediction_diagram.png',
                options: [
                    {
                        text: "Let's simulate removing the signal gradually instead of all at once",
                        next: 8,
                        feedback:
                            'Excellent experimental design! Testing different perturbations helps us understand the system better!',
                    },
                    {
                        text: 'What if we increase the signal instead? See what breaks?',
                        next: 8,
                        feedback:
                            "Interesting approach! Stress-testing the system can reveal its limits. Let's try both!",
                    },
                ],
            },
        },

        // CHAPTER 8: The Experiment (Perturbations)
        {
            id: 8,
            title: 'Shake Things Up',
            concept: 'Testing Perturbations',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: "Time to test! In science, we call these experiments <span class='concept-highlight'>perturbations</span> - we change something and observe what happens!",
                    learning: null,
                    image: 'images/scenes/ch8_scene1_experiment_setup.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: 'Test 1: Reduce signal by 50% → Cells slow their pulsing. Test 2: Increase signal by 200% → Cells pulse FASTER but stabilize. Test 3: Remove Enzyme → Everything stops! The Enzyme is the KEY component!',
                    learning: {
                        title: '🧪 Testing Perturbations',
                        content:
                            "Perturbations are changes we make to test the system! We might remove a component (gene knockout), increase a signal (drug treatment), or change initial conditions. By testing HOW the system responds to changes, we discover which parts are critical and which are robust. It's like stress-testing a bridge!",
                    },
                    image: 'images/scenes/ch8_scene2_treatment_options.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "*suddenly, lights flicker* Someone just cut the power to my lab! But the cells... they're still glowing! That means... they've become INDEPENDENT of the external signal! The cells have adapted. We need to validate our model against this NEW data!",
                    learning: null,
                    image: 'images/scenes/ch8_scene3_power_outage.png',
                },
            ],
            choice: {
                question: 'The system evolved! How do we handle this?',
                image: 'images/scenes/ch8_scene2_test_results.png',
                options: [
                    {
                        text: "Check if our model's predictions match the new real-world data",
                        next: 9,
                        feedback:
                            "YES! Model validation is crucial. Let's compare predictions to reality!",
                    },
                    {
                        text: 'Build a completely new model from scratch',
                        next: 9,
                        feedback:
                            "We could, but it's better to VALIDATE first. If our model matches reality, we can REFINE it rather than restart!",
                    },
                ],
            },
        },

        // CHAPTER 9: FINAL BOSS - Ultimate Modeling Challenge
        {
            id: 9,
            title: '🔥 FINAL BOSS: The Ultimate Challenge',
            concept: 'Model Validation',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: "🚨 RED ALERT! The cells are mutating RAPIDLY! We've compared our model predictions to reality, and something TERRIBLE is happening!",
                    learning: null,
                    image: 'images/scenes/ch9_scene1_validation_comparison.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "Our model shows that if the cells develop a SECOND positive feedback loop while keeping the negative feedback loop, they'll become UNSTABLE and potentially dangerous!",
                    learning: {
                        title: '✅ Model Validation',
                        content:
                            "A model is only useful if it matches REALITY! Validation means testing our model against real experimental data. If predictions match observations - great! If not, we learn something new and improve the model. It's a cycle: Model → Predict → Test → Validate → Improve. This is how all of science works!",
                    },
                    image: 'images/scenes/ch9_scene2_evolved_feedback.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: '💀 FINAL BOSS QUESTION: *emergency sirens blaring* I just detected a SECOND feedback loop forming! We have THREE components (Signal, Receptor, Enzyme) with TWO feedback loops - one negative (Enzyme inhibits Receptor) and one unknown. What system behavior indicates POSITIVE feedback is also present?',
                    learning: null,
                    image: 'images/scenes/ch9_scene3_intruder_alert.png',
                },
            ],
            choice: {
                question: '💀 FINAL BOSS: What indicates positive feedback?',
                image: 'images/scenes/ch9_scene2_bistable_system.png',
                options: [
                    {
                        text: 'The system oscillates between ON and OFF in a stable rhythm',
                        next: 10,
                        gameOver: true,
                        feedback:
                            "WRONG! ❌ Stable oscillations indicate negative feedback controlling the system! With BOTH positive AND negative feedback together, we'd see bistability or chaotic switching, not stable rhythms! The cells have exploded across the entire facility!",
                    },
                    {
                        text: 'The system shows bistability - it can lock into either a high state OR low state',
                        next: 10,
                        feedback:
                            'CORRECT! ✅ BRILLIANT! When positive and negative feedback coexist, you get BISTABILITY - the system can be trapped in either an ON state or OFF state, like a toggle switch! This is how cell differentiation and decision-making works! You just saved the day!',
                    },
                    {
                        text: 'The system always returns to the exact same equilibrium point',
                        next: 10,
                        gameOver: true,
                        feedback:
                            'WRONG! ❌ A single equilibrium point indicates pure negative feedback! With BOTH positive and negative feedback, you get MULTIPLE stable states (bistability)! Your miscalculation has caused a biohazard emergency!',
                    },
                ],
            },
        },

        // CHAPTER 10: The Solution (Iteration & Refinement)
        {
            id: 10,
            title: 'The Final Model',
            concept: 'Iteration & Refinement',
            scenes: [
                {
                    speaker: 'Dr. Maya',
                    text: "We've come full circle! Now we use EVERYTHING we learned to refine our model and find the perfect solution!",
                    learning: null,
                    image: 'images/scenes/ch10_scene1_final_iteration.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "Iteration 1: Add the new feedback loop. Iteration 2: Test all perturbations. Iteration 3: Found it! If we target BOTH the Enzyme AND the Receptor simultaneously, the cells can't adapt! Our refined model shows the exact combination!",
                    learning: {
                        title: '🔄 Iteration & Refinement',
                        content:
                            'Models are NEVER perfect on the first try! Iteration means we continuously improve our model based on new data. We go through the cycle: Build → Test → Learn → Refine → Repeat. Each iteration makes the model more accurate. This is the TRUE power of modeling - it gets better with every cycle!',
                    },
                    image: 'images/scenes/ch10_scene2_solution_found.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "*applies the treatment* YES! The cells are returning to normal! And look - *picks up a note left by the intruder* - 'Well done, Dr. Maya. You passed the test. Your modeling skills may have just saved the world. We'll be in touch. -A.F., Director, Bio-Defense Agency'",
                    learning: null,
                    image: 'images/scenes/ch10_scene3_cells_healing.png',
                },
                {
                    speaker: 'Dr. Maya',
                    text: "This whole thing was a TEST?! And YOU helped me pass it! We used all 10 fundamentals of modeling to solve this mystery. You're not just a helper - you're a real COMPUTATIONAL BIOLOGIST now! *high five* 🎉",
                    learning: {
                        title: '🏆 You Did It!',
                        content:
                            'You just learned the 10 Fundamentals of Biological Modeling! 1. What Models Are 2. Components 3. Relationships 4. Initial Conditions 5. Logic Functions 6. State Space 7. Feedback Loops 8. Predicting Behavior 9. Perturbations 10. Validation & Iteration. These skills are used by scientists worldwide to understand diseases, develop drugs, and save lives!',
                    },
                    image: 'images/scenes/ch10_scene5_celebration.png',
                },
            ],
            choice: null, // End of story!
        },
    ],
};

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.STORY_DATA = STORY_DATA;
}

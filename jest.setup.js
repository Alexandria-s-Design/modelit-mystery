// Jest setup file for DOM testing
// Add custom matchers or global test configuration here

// Mock Web Audio API for tests
global.AudioContext = jest.fn().mockImplementation(() => ({
    createOscillator: jest.fn().mockReturnValue({
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
        frequency: {
            setValueAtTime: jest.fn(),
            exponentialRampToValueAtTime: jest.fn(),
        },
        type: 'sine',
    }),
    createGain: jest.fn().mockReturnValue({
        connect: jest.fn(),
        gain: {
            setValueAtTime: jest.fn(),
            exponentialRampToValueAtTime: jest.fn(),
        },
    }),
    destination: {},
    currentTime: 0,
}));

// Mock Audio element for voice/music tests
global.Audio = jest.fn().mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    load: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    volume: 1,
    currentTime: 0,
    duration: 100,
    paused: true,
}));

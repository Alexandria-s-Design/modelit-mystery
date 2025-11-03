# Contributing to ModelIt Mystery

Thank you for your interest in contributing to ModelIt Mystery! This educational game helps students learn Boolean modeling through an interactive adventure with Dr. Maya.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Python 3.6+ (for asset validation)
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- Git

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/charlesmartinedd/modelit-mystery.git
   cd modelit-mystery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Validate assets**
   ```bash
   npm run validate:assets
   ```

4. **Start local server**
   ```bash
   npm start
   ```
   Then open http://localhost:8080 in your browser

## 🛠️ Development Workflow

### Code Quality

Before committing, ensure your code passes all checks:

```bash
# Run linter
npm run lint

# Fix auto-fixable lint issues
npm run lint:fix

# Format code
npm run format

# Run all tests
npm test

# Run all validations
npm run validate
```

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Test your changes**
   ```bash
   # Run tests
   npm test
   
   # Validate assets still work
   npm run validate:assets
   
   # Test in browser
   npm start
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

### Commit Message Format

We use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add keyboard shortcuts for navigation
fix: resolve audio loading issue on mobile
docs: update API setup guide
```

## 📁 Project Structure

```
modelit-mystery/
├── src/                    # Game logic and systems
│   ├── game.js            # Main game engine
│   ├── dialogue-system.js # Voice/text management
│   ├── error-handler.js   # Error handling system
│   └── image-api.js       # Dynamic image loading
├── audio/                 # Voice files and music
├── images/                # Scene images
├── docs/                  # Documentation
├── __tests__/             # Test files
└── *.html                 # Game HTML files
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm test:watch

# Generate coverage report
npm test:coverage
```

### Writing Tests

- Place test files next to the code they test or in `__tests__/`
- Name test files with `.test.js` or `.spec.js`
- Use descriptive test names
- Test edge cases and error conditions

Example:
```javascript
describe('playClickSound', () => {
    it('should create oscillator and gain nodes', () => {
        playClickSound();
        expect(AudioContext).toHaveBeenCalled();
    });
});
```

## 🎨 Code Style

### JavaScript

- Use ES6+ features (const, arrow functions, etc.)
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

Example:
```javascript
/**
 * Plays a click sound effect using Web Audio API
 * @returns {void}
 */
function playClickSound() {
    const oscillator = audioContext.createOscillator();
    // ... rest of implementation
}
```

### HTML/CSS

- Use semantic HTML5 elements
- Add ARIA labels for accessibility
- Keep styles in CSS files when possible
- Use CSS custom properties for theming

## 📝 Documentation

When adding features, update:

1. **README.md** - User-facing documentation
2. **Inline comments** - Explain complex logic
3. **JSDoc** - Document function parameters and returns
4. **docs/** - Technical documentation if needed

## 🔐 Security

### API Keys

**NEVER commit API keys or sensitive data!**

- Use `src/config.js` (gitignored) for API keys
- Reference `src/config.example.js` for template
- Update `.gitignore` if adding new config files

### Reporting Security Issues

If you discover a security vulnerability, please email:
- charlesmartinedd@gmail.com

Do not create public GitHub issues for security vulnerabilities.

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description** - What happened vs. what you expected
2. **Steps to reproduce** - Detailed steps to recreate the issue
3. **Environment** - Browser, OS, Node version
4. **Screenshots** - If applicable
5. **Console logs** - Any error messages

## ✨ Feature Requests

We welcome feature ideas! When suggesting features:

1. **Describe the problem** - What need does this address?
2. **Propose a solution** - How should it work?
3. **Consider alternatives** - Other approaches you've considered
4. **Educational value** - How does this help students learn?

## 🎓 Educational Content

When modifying educational content:

- Keep language appropriate for middle school (ages 11-14)
- Use real-world examples and analogies
- Maintain scientific accuracy
- Make it engaging and fun!
- Test with target audience if possible

## 🌐 Accessibility

Ensure your contributions are accessible:

- Use semantic HTML
- Add ARIA labels
- Test keyboard navigation
- Check color contrast ratios (4.5:1 minimum)
- Test with screen readers when possible

## 📦 Dependencies

### Adding New Dependencies

Before adding a new npm package:

1. **Is it necessary?** - Can we use existing code or a native API?
2. **Is it maintained?** - Check last update date and issue count
3. **Is it lightweight?** - Check bundle size
4. **Is it compatible?** - Works in target browsers

Use `npm install --save-dev` for development dependencies.

## 🎯 Code Review Process

Pull requests are reviewed for:

1. **Functionality** - Does it work as intended?
2. **Code quality** - Follows style guide, well-commented
3. **Tests** - Has adequate test coverage
4. **Documentation** - Updated relevant docs
5. **Performance** - No negative impact on load times
6. **Accessibility** - Maintains or improves accessibility

## 💚 Need Help?

- **Questions?** Open a GitHub issue with the "question" label
- **Stuck?** Check existing issues or documentation
- **Want to chat?** Reach out to the maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for helping make ModelIt Mystery better for students everywhere! 🎓🔬**

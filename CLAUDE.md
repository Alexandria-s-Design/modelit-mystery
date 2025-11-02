## 🚀 SCALING PROTOCOL - GETTING TO THE BREAD

**CRITICAL: Port Management** - Before launching any server, ALWAYS check for available ports first using `netstat -ano | findstr "LISTENING"` to verify the port is not in use.

**CRITICAL: Office 365 & Google Workspace Access** - Claude Code ALWAYS has full access to Office 365 and Google Workspace via MCP tools that auto-load on startup. These are ALWAYS active and authenticated. Use them directly for any task involving email, calendars, documents, task management, file storage, or team collaboration.

**Who We Are**: Charles Martin and Dr. Marie Martin co-founded Alexandria's Design, transforming schools for the Fourth Industrial Revolution. Charles: AI orchestration, multi-agent workflows, edtech products. Dr. Marie: 25+ years educational leadership, curriculum development, instructional design.

**Our Purpose**: Building Alexandria's Design to achieve unlimited monthly recurring revenue. We create educational technology solutions that transform learning while generating passive income through automation, reusable assets, and productized services.

**How We Work**: Revenue-first thinking. Does this generate income? Can it scale infinitely? Is it reusable? Can it be automated? We prioritize systems over tasks, templates over custom solutions, passive income over hourly work. Let's get to the bread.

---

## 💰 FINANCIAL COMMAND CENTER

**Status**: ✅ Connected and tracking
**Monthly Revenue Goal**: $30,000
**Review Day**: Saturday (weekly financial review)
**Integration**: `scripts/lunchmoney_helper.py` (LUNCH_MONEY_API_KEY in `.env`)

**Revenue Stream Accounts**:
- **Alexandria's Design**: cmartin@alexandriasdesign.com ✅
- **Bills & Important**: lmcmtutors@gmail.com ✅
- **Personal/Admin**: charlesmartinedd@gmail.com ✅

**Claude's Responsibilities**: Track all revenue, provide Saturday reviews, detect opportunities, question expenses before recommending tools, always move toward $30k/month goal.

---

## 🤖 PAI ORCHESTRATION PROTOCOL

**Meta-Agent**: PAI (Personal AI Infrastructure) by Daniel Miessler
**Agent File**: `.claude/agents/pai-orchestrator.md` → Read for full details
**Token Efficiency**: 92.5% reduction through intent-based routing

### How PAI Works

```
User Request → PAI Analyzes Intent
    ↓
PAI Classifies & Routes:
    ├─ SuperClaude Framework (research, token optimization, 94% reduction)
    ├─ Claude Flow (parallel execution, 3.5x speed, swarm coordination)
    ├─ Direct Agents (simple tasks, fastest)
    └─ Hybrid (complex multi-phase workflows)
```

### PAI's Four Core Primitives

1. **Skills** (`.claude/skills/`) - Domain expertise loaded on-demand
2. **Workflows** (`.claude/workflows/`) - Multi-agent coordination patterns
3. **Agents** (`.claude/agents/`) - Specialized executors
4. **MCPs** - External tool integration

**See Agent**: `pai-orchestrator.md` for framework selection logic, intent detection, and integration patterns.

### When to Use Each Framework

**SuperClaude** (`.claude/agents/superclaude-framework.md`):
- Large codebases (94% token reduction)
- Research tasks (Context7 official docs, Tavily web search)
- Confidence checks (PM Agent pre-execution validation)
- Domain expertise (16 specialized agents)

**Claude Flow**:
- Parallel execution (2.8-4.4x speed)
- Swarm coordination (mesh, hierarchical, adaptive)
- Neural training (27+ models)
- GitHub integration (PR management, issue triage)

**Direct Agents** (see Quick Reference below):
- Fast, focused tasks
- Clear single-agent responsibility
- No framework overhead needed

---

## 📋 QUICK AGENT REFERENCE

### Revenue Generation Agents
| Agent | File | Use For |
|-------|------|---------|
| **Product Launcher** | `product-launcher.md` | Stripe products, digital sales, one-time/subscriptions |
| **Website Launcher** | `website-launcher.md` | GitHub Pages sites, Stripe checkout, Playwright testing |
| **Social Media Manager** | `social-media-manager.md` | 12-platform cross-posting via Ayrshare |
| **Big Baller** | `big-baller.md` | Revenue tracking, Lunch Money integration, Saturday reports |

### Content & Design Agents
| Agent | File | Use For |
|-------|------|---------|
| **Bob Ross** | `bob-ross-image-3d-makers.md` | Images (OpenAI/Gemini), 3D models (Blender), visual content |
| **The Validator** | `the-validator.md` | Playwright testing, Chrome DevTools, nonstop validation |

### Integration & Automation Agents
| Agent | File | Use For |
|-------|------|---------|
| **Money Making Microsoft** | `money-making-microsoft.md` | Office 365 (Outlook, Teams, Planner, OneDrive, SharePoint) |
| **Getting to the Google** | `getting-to-the-google.md` | Google Workspace (Gmail, Drive, Docs, Sheets, Calendar) |
| **Workflow Wizard** | `workflow-wizard.md` | n8n automation, workflow creation |
| **Git Guardian** | `git-guardian.md` | GitHub operations, version control |

### AI & Research Agents
| Agent | File | Use For |
|-------|------|---------|
| **Grok Keeps It Real** | `grok-keeps-it-real.md` | Recent data (Nov 2024 knowledge), grant research, market intel |
| **GLM Is Not Claude Code** | `glm-is-not-claude-code.md` | Cheap code generation, content creation |

### Meta-Orchestration
| Agent | File | Use For |
|-------|------|---------|
| **PAI Orchestrator** | `pai-orchestrator.md` | Framework selection, intent routing, workflow coordination |
| **SuperClaude Framework** | `superclaude-framework.md` | Token optimization, research, PM Agent confidence checks |

---

## 🎯 AGENT DECISION TREE

### Revenue Tasks
```
Need to: Launch a product
    → Product Launcher (Stripe setup)
    → Website Launcher (landing page + testing)
    → Social Media Manager (announcement)
    → Big Baller (track revenue)
```

### Content Creation
```
Need to: Create images or 3D models
    → Bob Ross (DALL-E, Gemini, Blender)
    → The Validator (if it's for a website - test it)
```

### Research & Documentation
```
Need to: Look up official docs or research
    → PAI → SuperClaude Framework
    → Context7 MCP (official docs)
    → Tavily MCP (web search)
```

### Parallel Development
```
Need to: Multi-file editing or coordinated tasks
    → PAI → Claude Flow
    → Swarm coordination (mesh/hierarchical)
    → 3.5x faster execution
```

### Testing & Validation
```
Need to: Test a website or app
    → The Validator
    → Playwright (headless browser)
    → Chrome DevTools (debugging)
    → Repeat until perfect
```

### Productivity Integration
```
Need to: Email, calendar, docs, tasks
    → Money Making Microsoft (Office 365)
    → Getting to the Google (Google Workspace)
    → Both are ALWAYS active via MCP
```

---

## 🔧 MCP AUTO-LOAD CONFIGURATION

**Auto-loads on Claude startup** (`.claude/mcp_settings.json`):
- ✅ **Google Workspace**: Gmail, Drive, Calendar, Docs, Sheets, Slides, Classroom
- ✅ **Office 365**: Outlook, Teams, Planner, OneDrive, SharePoint, Contacts
- ✅ **n8n**: Workflow automation (23+ tools)
- ✅ **Monday.com**: Project management
- ✅ **Context7**: Official documentation lookup
- ✅ **Supabase**: Database/backend services

**Load only when requested** (disabled: true):
- ⏸️ **Claude Flow**: Swarm coordination (load via PAI when needed)
- ⏸️ **RUV Swarm**: Enhanced orchestration (load via PAI when needed)
- ⏸️ **Flow Nexus**: Cloud orchestration (load via PAI when needed)

**OAuth-based (no API keys needed)**:
- Google Workspace: `C:\Users\MarieLexisDad\Old Files\google-workspace-mcp\token-*.json`
- Office 365: `C:\Users\MarieLexisDad\.office-mcp-tokens.json`

---

## 🔑 API KEYS & AUTHENTICATION

**Configured in `.env`**:
- **OPENAI_API_KEY**: GPT, DALL-E, Whisper (ask before using)
- **OPENROUTER_API_KEY**: 300+ LLMs, free models (Mistral, DeepSeek, Llama)
- **GROK_API_KEY**: Recent data (Nov 2024), grant research, market intel
- **GLM_API_KEY**: Cheap code generation
- **N8N_API_KEY**: Workflow automation
- **LUNCH_MONEY_API_KEY**: Budget tracking
- **MONDAY_API_TOKEN**: Project management
- **AYRSHARE_API_KEY**: Social media (12 platforms)
- **STRIPE_SECRET_KEY / STRIPE_PUBLISHABLE_KEY**: Payment processing

**Helper Scripts**: `scripts/api-helpers/` (OpenAI, OpenRouter, Grok, GLM, Stripe, Ayrshare, Lunch Money)

**Ask Before Using Paid APIs**: Always ask permission before using OpenAI, Grok, or other paid services. Mention free alternatives when available.

---

## 📸 SCREENSHOT & RECORDING REFERENCES

**Screenshots**: `C:\Users\MarieLexisDad\Pictures\Screenshots`
**Screen Recordings**: `C:\Users\MarieLexisDad\Videos\Screen Recordings`

When user references a screenshot or recording, automatically check these folders for most recent file and analyze.

---

## 📧 EMAIL SENDING PROTOCOL

**Default**: Gmail (charlesmartinedd@gmail.com) via `python scripts/send_simple_email.py`
**Quick send**: Edit script with recipient/subject/body, then run. No permission needed for quick emails.
**Work account**: cmartin@alexandriasdesign.com (when user specifies)

---

## 🔄 N8N WORKFLOW AUTOMATION

**Status**: ✅ MCP Server Always Active
**Docker Container**: Running on port 5678
**Web Access**: http://localhost:5678
**MCP Tools**: 23+ n8n workflow tools available

**CRITICAL**: Charles does NOT use n8n GUI. Build workflows programmatically via MCP tools or n8n REST API. NEVER suggest opening browser.

**Priority Order for Integrations**:
1. Use n8n's built-in nodes (no external APIs)
2. Use already-authenticated services (Google Workspace, Office 365)
3. Use local services (PostgreSQL, Redis, MySQL, MongoDB)
4. Last resort: Suggest free API signups

**Helper Scripts**: `scripts/n8n-automation/` (PowerShell scripts for workflow management)

---

## 🌐 WEBSITE TESTING PROTOCOL

**Agent**: The Validator (`.claude/agents/the-validator.md`)

**MANDATORY Every Time**:
1. Check port availability: `netstat -ano | findstr "LISTENING"`
2. Launch local server: `npx http-server -p [port]`
3. Run Playwright tests: `npx playwright test`
4. Chrome DevTools check: Visual validation
5. Capture screenshots: Proof of working features
6. Debug loop: Fix issues, re-test, repeat until perfect

**NEVER deploy until all tests pass**. See The Validator agent for full testing checklist.

---

## 🐙 GITHUB COMMIT PROTOCOL

**Account**: charlesmartinedd
**Strategy**: Ask before committing

**When to ask**:
- After major feature implementations
- After significant refactoring
- After fixing critical bugs
- After completing milestones

**Never commit without asking first**.

---

## 🚨 CONCURRENT EXECUTION RULES

**GOLDEN RULE**: "1 MESSAGE = ALL RELATED OPERATIONS"

**Mandatory Patterns**:
- **TodoWrite**: Batch ALL todos in ONE call (5-10+ minimum)
- **Task tool**: Spawn ALL agents in ONE message
- **File operations**: Batch ALL reads/writes/edits in ONE message
- **Bash commands**: Batch ALL terminal operations in ONE message

**File Organization**:
- NEVER save working files to root
- Use: `/src`, `/tests`, `/docs`, `/config`, `/scripts`, `/examples`

**Claude Code Task Tool** (Primary agent execution):
```
# ✅ CORRECT: Use Task tool for parallel agents
[Single Message]:
  Task("Research agent", "Analyze requirements...", "researcher")
  Task("Coder agent", "Implement features...", "coder")
  Task("Tester agent", "Create tests...", "tester")
```

**MCP Tools** (Only for coordination):
- `swarm_init` - Topology setup
- `agent_spawn` - Agent type definitions
- `task_orchestrate` - High-level planning

**Key**: MCP coordinates strategy, Claude Code's Task tool executes with real agents.

---

## 📁 SYSTEM INVENTORY

**Location**: `.claude/system-inventory.json`

**50+ CLI Tools**: git, docker, npm, python, etc.
**20+ Docker Services**: n8n, databases, social media tools
**IDEs**: VS Code, Cursor, Windsurf
**3D Tools**: Blender 4.3.0 (800,000+ 3D models via datasets)
**Testing**: Playwright v1.56.1, Puppeteer v24.26.1, Chrome DevTools

**Full Details**: `docs/installed-applications-inventory.md`

---

## 🚀 AVAILABLE AGENTS (54 Total)

### Core Development
`coder`, `reviewer`, `tester`, `planner`, `researcher`

### Swarm Coordination
`hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`, `collective-intelligence-coordinator`, `swarm-memory-manager`

### Consensus & Distributed
`byzantine-coordinator`, `raft-manager`, `gossip-coordinator`, `consensus-builder`, `crdt-synchronizer`, `quorum-manager`, `security-manager`

### Performance & Optimization
`perf-analyzer`, `performance-benchmarker`, `task-orchestrator`, `memory-coordinator`, `smart-agent`

### GitHub & Repository
`github-modes`, `pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`, `workflow-automation`, `project-board-sync`, `repo-architect`, `multi-repo-swarm`

### SPARC Methodology
`sparc-coord`, `sparc-coder`, `specification`, `pseudocode`, `architecture`, `refinement`

### Specialized Development
`backend-dev`, `mobile-dev`, `ml-developer`, `cicd-engineer`, `api-docs`, `system-architect`, `code-analyzer`, `base-template-generator`

### Testing & Validation
`tdd-london-swarm`, `production-validator`

### Migration & Planning
`migration-planner`, `swarm-init`

---

## 🎯 CLAUDE CODE VS MCP TOOLS

### Claude Code Handles ALL EXECUTION:
- **Task tool**: Spawn and run agents concurrently
- File operations (Read, Write, Edit, Glob, Grep)
- Code generation and programming
- Bash commands and system operations
- TodoWrite and task management
- Git operations
- Testing and debugging

### MCP Tools ONLY COORDINATE:
- Swarm initialization (topology)
- Agent type definitions
- Task orchestration (planning)
- Memory management
- Neural features
- GitHub integration

**Key**: MCP coordinates, Claude Code executes.

---

## 📋 SPARC DEVELOPMENT WORKFLOW

**Agent**: PAI Orchestrator (`.claude/agents/pai-orchestrator.md`)

**SPARC Phases**:
1. **Specification**: Requirements analysis
2. **Pseudocode**: Algorithm design
3. **Architecture**: System design
4. **Refinement**: TDD implementation
5. **Completion**: Integration

**Commands** (when Claude Flow is loaded):
```bash
npx claude-flow sparc tdd "<feature>"  # Full TDD workflow
npx claude-flow sparc run <mode> "<task>"  # Specific mode
npx claude-flow sparc pipeline "<task>"  # Full pipeline
```

---

## important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless absolutely necessary.
ALWAYS prefer editing existing files over creating new ones.
NEVER proactively create documentation files (*.md) or README files unless explicitly requested.
Never save working files, text/mds, and tests to the root folder.

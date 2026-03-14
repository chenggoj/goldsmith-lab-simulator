# Goldsmith Lab Simulator

An interactive 3D simulation of the [Goldsmith Research Group](https://goldsmith.engin.umich.edu/) lab environment at the University of Michigan Department of Chemical Engineering. Walk through the lab, interact with NPCs, and ask them questions powered by AI.

![Three.js](https://img.shields.io/badge/Three.js-0.160.0-black)
![License](https://img.shields.io/badge/license-MIT-blue)

## Live Demo

**[Launch Online Version](https://chenggoj.github.io/goldsmith-lab-simulator/goldsmith-lab-simulator-online.html)**

No installation required. Runs entirely in the browser via OpenRouter's free LLM API.

---

## Versions

### Online Version (`goldsmith-lab-simulator-online.html`)

Powered by [OpenRouter](https://openrouter.ai/) free-tier models. No local setup needed.

- Open the link above, or clone the repo and open the file in a browser
- Walk up to any NPC and press **E** to start a conversation
- AI responses stream in real time

### Local Version (`goldsmith-lab-simulator.html`)

Powered by a local [Ollama](https://ollama.ai/) instance. Requires Ollama running with a compatible model.

**macOS quick start:**
```bash
# Install Ollama, pull a model, then:
open start.command
```

Or open `goldsmith-lab-simulator.html` directly in a browser with Ollama running on `http://localhost:11434`.

---

## Controls

| Key / Action | Description |
|---|---|
| `W A S D` | Move |
| Mouse drag | Look around |
| `E` | Interact with nearby NPC |
| `Enter` | Send chat message |
| `Escape` | Close chat |

---

## Architecture

```
goldsmith-lab-simulator/
├── goldsmith-lab-simulator.html        # Local Ollama version
├── goldsmith-lab-simulator-online.html # OpenRouter online version
├── start.command                       # macOS launcher for local version
├── cloudflare-worker.js                # Optional: CF Worker API proxy
└── vercel-proxy/                       # Optional: Vercel Edge Function proxy
    ├── api/chat.js
    └── vercel.json
```

### Rendering

- **Engine**: Three.js r0.160.0
- **Geometry batching**: `InstancedMesh` for workstations, chairs, and plants
- **Material caching**: Memoized `MeshStandardMaterial` via hash key
- **Floor**: Single canvas-generated checker texture (replaces 676 individual tiles)
- **Animation loop**: Pre-allocated `Vector3` / `Euler` objects to eliminate per-frame GC pressure

### AI Integration

| Version | Backend | Protocol |
|---|---|---|
| Local | Ollama (`/api/chat`) | NDJSON streaming |
| Online | OpenRouter (`/v1/chat/completions`) | SSE streaming |

---

## Secure Deployment (GitHub Pages + Vercel Proxy)

To deploy without exposing your API key:

1. Deploy `vercel-proxy/` to Vercel and set `OPENROUTER_API_KEY` as an environment variable
2. In `goldsmith-lab-simulator-online.html`, replace `OR_ENDPOINT` with your Vercel function URL
3. Push to GitHub and enable Pages on the `main` branch

---

## Tech Stack

- [Three.js](https://threejs.org/) — 3D rendering
- [OpenRouter](https://openrouter.ai/) — LLM routing (online version)
- [Ollama](https://ollama.ai/) — local LLM inference (local version)

---

## About

The Goldsmith Research Group focuses on computational catalysis and surface science at the University of Michigan. This simulator was built as an interactive introduction to the lab environment.

**Lab website**: [goldsmith.engin.umich.edu](https://goldsmith.engin.umich.edu/)

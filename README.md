# Goldsmith Lab Simulator

An interactive 3D simulation of the [Goldsmith Research Group](https://goldsmithlab.engin.umich.edu/) at the University of Michigan Department of Chemical Engineering. Walk through the lab, interact with NPC lab members, and ask them questions — powered by an AI language model.

---

## About the Lab

**PI: Prof. Bryan R. Goldsmith** — Associate Professor of Chemical Engineering, University of Michigan

The Goldsmith Lab focuses on *Modeling Catalysts and Materials for a Sustainable Future*. Research combines first-principles computational modeling (DFT, ab initio MD) with data science and machine learning to design catalysts and materials for energy and environmental applications.

**Research areas:**
- Thermo- and electrocatalysis for CO2 reduction and water pollution remediation
- Machine learning for accelerated catalyst discovery
- Single-atom and nanocluster catalysis
- Electrocatalytic nitrate reduction from wastewater
- Redox chemistry for energy storage (flow batteries)
- Bio-oil conversion to fuels and chemicals

**Lab website:** [goldsmithlab.engin.umich.edu](https://goldsmithlab.engin.umich.edu/)

---

## Demo

**[Launch Online Simulator](https://chenggoj.github.io/goldsmith-lab-simulator/goldsmith-lab-simulator-online.html)**

Runs entirely in the browser. No installation required.

---

## Versions

### Online Version

**[goldsmith-lab-simulator-online.html](https://chenggoj.github.io/goldsmith-lab-simulator/goldsmith-lab-simulator-online.html)**

Powered by [OpenRouter](https://openrouter.ai/) free-tier models. Walk up to any NPC and press **E** to start a conversation — AI responses stream in real time.

### Local Version

`goldsmith-lab-simulator.html` — powered by a local [Ollama](https://ollama.ai/) instance.

```bash
# macOS: requires Ollama running with a compatible model
open start.command
```

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
├── cloudflare-worker.js                # CF Worker API proxy (optional)
└── vercel-proxy/                       # Vercel Edge Function proxy (optional)
    ├── api/chat.js
    └── vercel.json
```

### Rendering

- **Engine**: Three.js r0.160.0
- **Geometry batching**: `InstancedMesh` for workstations, chairs, and plants
- **Material caching**: Memoized `MeshStandardMaterial` via hash key
- **Floor**: Single canvas-generated checker texture (replaces 676 individual tile meshes)
- **Animation loop**: Pre-allocated `Vector3` / `Euler` objects to eliminate per-frame GC pressure

### AI Integration

| Version | Backend | Protocol |
|---|---|---|
| Local | Ollama (`/api/chat`) | NDJSON streaming |
| Online | OpenRouter (`/v1/chat/completions`) | SSE streaming |

---

## Tech Stack

- [Three.js](https://threejs.org/) — 3D rendering
- [OpenRouter](https://openrouter.ai/) — LLM routing (online version)
- [Ollama](https://ollama.ai/) — local LLM inference (local version)

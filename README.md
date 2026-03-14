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

**Funding:** NSF, DOE, Army Research Laboratory, ONR, ACS, Microsoft Climate Research Initiative

**Lab website:** [goldsmithlab.engin.umich.edu](https://goldsmithlab.engin.umich.edu/)

---

## Live Demo

> Repository is currently private. Enable GitHub Pages after making public.

---

## Versions

### Online Version (`goldsmith-lab-simulator-online.html`)

Powered by [OpenRouter](https://openrouter.ai/) free-tier models. Runs entirely in the browser — no local setup needed.

### Local Version (`goldsmith-lab-simulator.html`)

Powered by a local [Ollama](https://ollama.ai/) instance.

**macOS quick start:**
```bash
# Requires Ollama running with a compatible model
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

## Secure Deployment (GitHub Pages + Vercel Proxy)

To deploy without exposing your API key in the HTML source:

1. Deploy `vercel-proxy/` to Vercel; set `OPENROUTER_API_KEY` as an environment variable
2. In `goldsmith-lab-simulator-online.html`, replace `OR_ENDPOINT` with your Vercel function URL
3. Push to GitHub and enable Pages on the `main` branch

---

## Current Lab Members (2025)

**Principal Investigator**
- Bryan R. Goldsmith — Associate Professor

**Postdoctoral Fellows**
- Yan Ying Tan (2025–)
- Weichi Yao (2023–)
- Anthony Pembere (2025–)

**PhD Students**
- Cameron Gruich (2021–)
- Ankit Mathanker (2021–)
- Oluwatosin Ohiro (2021–)
- Chenggong Jiang (2022–)
- Dean Sweeney (2023–)
- Roshini Dantuluri (2023–)
- Maurycy Krzyzanowski (2023–)
- Aeva Silverman (2024–)
- Sila Donmez (2025–)
- Varun Madhavan (2025–)
- Maxim Balitskiy (2025–)
- Diego Cabello (2025–)

**Undergraduate Students**
- Yifei Liu (2023–)
- Therresa Sharlene Budihardjo (2024–)
- Jessica Jia (2025–)

---

## Tech Stack

- [Three.js](https://threejs.org/) — 3D rendering
- [OpenRouter](https://openrouter.ai/) — LLM routing (online version)
- [Ollama](https://ollama.ai/) — local LLM inference (local version)

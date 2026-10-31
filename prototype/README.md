# Racing Genesis — Assignment 4: MVP 2.0 (Alpha Build)

**Course**: CS 549 (AI for Visual Computing) — Rutgers University  
**Project**: Racing Genesis: Physics-Driven Procedural F1 Simulation & Autonomous AI Driving  
**Build Version**: Alpha 2.0 (Full Game Loop Edition)  

---

## 🎮 MVP 2.0 Architecture & The Full "Game Loop"

While Assignment 3 demonstrated technical depth (90 FPS WebGL rendering, Catmull-Rom spline synthesis, open-cockpit view, and Pacejka lateral slip physics), **Assignment 4 delivers breadth: transforming the tech demo into a cohesive, interactive software product with a complete state machine.**

### 1. The Three-State Game Loop
```
┌─────────────────────────┐
│       START STATE       │ ➔ 5 Circuit Presets (Monza, Silverstone, Spa, Monaco, Suzuka)
│    (Pre-Race Config)    │ ➔ Format: 2-Lap Sprint / 3-Lap / 5-Lap Enduro
└────────────┬────────────┘ ➔ Driving Mode: Autonomous AI vs. Manual WASD Control
             │ [Launch Alpha Race]
             ▼
┌─────────────────────────┐
│       ACTIVE STATE      │ ➔ 90 FPS WebGL 3D simulation with delta-time capping
│  (The Full Experience)  │ ➔ Integrated Procedural Audio Engine (V6 Turbo Harmonics & Tire Squeal)
└────────────┬────────────┘ ➔ Dynamic HUD, In-Car Steering Wheel Dashboard, Lookahead Braking Zones
             │ [Race Completed / Laps Reached]   (or [Esc] Pause Menu ➔ Resume / Menu)
             ▼
┌─────────────────────────┐
│        END STATE        │ ➔ Checkered Flag Celebration
│   (Session Summary)     │ ➔ Best Lap Time, Total Time, Top Speed, Max Lateral Gs
└─────────────────────────┘ ➔ Official Lap-by-Lap Comparison Table & "Race Again" / "Menu" actions
```

### 2. Secondary Pillars Integration
- **Secondary Pillar 1 — Procedural Web Audio Engine**: Real-time synthesized multi-oscillator engine tone (triangle, sawtooth, sine) passed through a bandpass filter and dynamic waveshaping distortion. Modulates pitch dynamically across 8 gear ratios from 4,500 to 13,200 RPM, with tire screech triggered by lateral slip angle and turbo blow-off hisses on throttle lift.
- **Secondary Pillar 2 — Explainable Autonomous Pathfinding & Lookahead Braking**: Dynamic lookahead horizon previews upcoming curvature $\kappa(s)$ 1.4 seconds ahead, computing critical deceleration $a_{req} = \frac{v^2 - v_{target}^2}{2 \cdot d_{brake}}$ and projecting amber braking decals onto the tarmac.

### 3. Stability & Performance
- Zero garbage collection memory spikes in the active loop through pre-allocated Three.js Vector3 scratch buffers.
- Fixed 90 FPS target update rate with high-refresh sub-frame scheduling.

---

## 🚀 How to Run Locally

1. Open PowerShell or a terminal in this directory:
   ```powershell
   cd "d:\My files\Rutgers\7-AI for Visual Computing\All assignments\Assignment-4\prototype"
   python serve.py 8081
   ```
2. Open your web browser to:
   👉 **[http://localhost:8081](http://localhost:8081)**

---

## 🕹️ Controls Guide

| Action | Control | Notes |
| :--- | :--- | :--- |
| **Accelerate / Brake** | `W` / `S` or `Up` / `Down` | In Manual mode or to override AI |
| **Steer Left / Right** | `A` / `D` or `Left` / `Right` | Progressive Ackermann steering with centering |
| **Toggle Camera** | `C` | Cycles **Cockpit 3D POV** &harr; **3rd Person Chase** |
| **Pause / Resume** | `Escape` or `⏸ Pause` | Opens In-Race Pause Modal |
| **Toggle Audio** | `M` or `🔊 Audio` | Enables Web Audio synthesizer |
| **3D Track Sculpting** | `Toggle 3D Edit Handles` | Click & drag cyan anchors to morph track in real time |
| **Reset Simulation** | `Space` or `🔄 Reset` | Re-aligns car to starting grid |

---

## 🔗 Project Links
- **Live Interactive Web Build:** [https://vshaunak.github.io/RacingGenesis/](https://vshaunak.github.io/RacingGenesis/)
- **Source Code Repository:** [https://github.com/VShaunak/RacingGenesis](https://github.com/VShaunak/RacingGenesis)
- **Demo Video Walkthrough:** [https://youtu.be/GLIEs-A5Xi0](https://youtu.be/GLIEs-A5Xi0)

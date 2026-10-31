https://vshaunak.github.io/RacingGenesis-2.0/prototype/index.html
Live website

[Racing_Genesis_Assignment_4_Alpha_Report.md](https://github.com/user-attachments/files/34208905/Racing_Genesis_Assignment_4_Alpha_Report.md)
# Racing Genesis: Production Planning & MVP 2.0 (Alpha Build)
**Assignment 4 Technical Report • Rutgers University • CS 549 (AI for Visual Computing)**

- **Team Members:** Shaunak M Vidwans (Lead), Pavan Sai Komara, Sridevi Mudiyanur Ramamurthy, Zeba Afreen  
- **Date:** October 2026  
- **Playable Alpha Build:** [https://vshaunak.github.io/RacingGenesis/](https://vshaunak.github.io/RacingGenesis/)  
- **Source Code Repository:** [https://github.com/VShaunak/RacingGenesis](https://github.com/VShaunak/RacingGenesis)  
- **Demo Video Walkthrough:** [https://youtu.be/GLIEs-A5Xi0](https://youtu.be/GLIEs-A5Xi0)  

---

## 1. Executive Summary: Transforming Tech Demo to Cohesive Software Product

While Assignment 3 proved core technical depth (90 FPS WebGL rendering, Catmull-Rom spline circuits, and Pacejka lateral slip dynamics), **Assignment 4 achieves technical breadth**. We have structured Racing Genesis into a complete, interactive, three-state architectural game loop:

1. **Start State (Main Menu):** Interactive configuration modal allowing circuit selection across 5 distinct F1 circuits (Monza, Silverstone, Spa, Monaco, Suzuka), race distance formatting (2-lap sprint to 5-lap enduro), and driving mode toggles (Autonomous AI vs. Manual WASD Control).
2. **Active State (The Experience):** 90 FPS high-refresh simulation with sub-frame delta clamping, dynamic in-car steering wheel telemetry, lookahead braking horizon decals, and real-time procedural Web Audio. Includes an in-race Pause Modal (`Esc`) with controls guide.
3. **End State (Session Summary):** Checkered flag celebration screen aggregating total session time, best lap, peak lateral G-load, and lap-by-lap comparison table with instantaneous restart, menu return, and sandbox track sculpting actions.

---

## 2. Phase 1: Production Schedule & Weekly Development Plan (Weeks 9–14)

To guarantee delivery by the final semester deadline, engineering and asset tasks are scheduled across a strict week-by-week roadmap, culminating in an uncompromised **Buffer Week** dedicated solely to bug fixing, cross-browser validation, and polish:

| Week | Milestone & Focus | Engineering Tasks | Asset & Shader Tasks | Integration Target |
| :--- | :--- | :--- | :--- | :--- |
| **W9 (Current)** | **MVP 2.0 (Alpha)**<br>Full Game Loop | Complete 3-state loop (Start &rarr; Active &rarr; End); In-Race Pause Modal; Web Audio engine; 90 FPS delta cap. | Glassmorphic Fluent UI modals; F1 steering wheel digital dash; 5 F1 track presets. | Playable Alpha Build hosted on GitHub Pages; 90 FPS locked. |
| **W10** | Visual Shaders & Particles | Tire smoke particle GPU instancing; dynamic skidmark decal projection; brake disc thermal incandescence shader. | Procedural skybox cubemap; dynamic asphalt normal map and rubber accumulation line. | Visual FX subsystem merged into core rendering pipeline. |
| **W11** | Rigid Collisions & Limits | Curvilinear boundary collision impulse response; curb rumble vibration forces; off-track deceleration penalties. | 3D Tecpro barrier geometry, gravel trap particle displacement, distance marker boards. | Physics collision subsystem fully integrated with chassis inertia. |
| **W12** | Multi-Agent AI Racing | Multi-car traffic simulation; behavior-tree overtaking & defensive lane blocking; DRS slipstream drag reduction. | Distinct team liveries for opponent vehicles; mini-map opponent dot visualizer. | Full AI race grid functioning autonomously without collisions. |
| **W13** | Full Beta & Telemetry | Live telemetry graph visualizer (Canvas speed/G-force trace); CSV/JSON session log export; WebGL 2.0 optimizations. | Final audio mix balancing engine harmonics, wind noise, and tire screech. | Beta Release Candidate locked and distributed for user feedback. |
| **W14 (BUFFER)** | **MANDATORY BUFFER WEEK**<br>Zero Feature Freeze | **Zero new features.** Profiling garbage collection; memory leak audits; cross-browser bug fixes (Chrome/Edge/Safari/Firefox). | Final high-resolution 4K render captures, presentation deck, and comprehensive final project report. | **Final Golden Master Release** & Live Final Presentation. |

---

## 3. Phase 2: MVP 2.0 (Alpha Build) Release Notes (Changes Since Midterm MVP 1)

### 3.1 New Features Implemented in Alpha
- **Three-State Game Loop:** Start Menu modal with 5 F1 circuit selectors, race format (2–5 laps), and AI/manual toggles; in-race Pause Modal (`Esc`); and End-State Checkered Flag results summary.
- **Procedural Web Audio Engine:** Integrated real-time additive synthesizers (triangle, sawtooth, sine) modulating through an 8-speed gearbox (4,500–13,200 RPM) with dynamic tire squeal on slip and turbo blow-off hiss.
- **Cockpit 3D Driver POV & Digital Wheel:** Open-cockpit aerodynamic view with physical steering wheel-mounted LED shift bar, live gear/speed display, and uncluttered road sightlines.
- **Interactive 3D Track Sculpting:** Direct raycast anchor manipulation to reshape continuous 3D Catmull-Rom circuits in real-time.

### 3.2 Bug Fixes & Stability Refinements
- **Smooth Turn Transition:** Replaced instant steering snap with exponential chassis yaw inertia dampening (`1.0 - exp(-8.5 * dt)`), eliminating high-sensitivity turning jerks and camera shaking.
- **HUD Occlusion Elimination:** Removed floating central 2D dashboards in cockpit mode; repositioned driver camera to ensure 100% visible asphalt apexes.
- **Delta-Time Clamping:** Enforced `dt = min(dtWall, 0.04)` to prevent physics tunneling or spiraling after browser tab switches.

### 3.3 Known Issues & Active Limitations (To be resolved in Beta W10–W11)
- *Soft Boundary Restitution:* Track edge collisions currently use proportional soft pushback rather than rigid impulse physics with damage/wheel deflection.
- *Planar Tire Model on Banking:* Dynamic tire friction assumes a horizontal ground projection, resulting in minor slip underestimation on extreme 15° vertical banking curves.

---

## 4. Secondary Computer Graphics Pillars Status

- **Procedural Audio:** Real-time browser synthesis using Web Audio API nodes without external audio files. Multi-oscillator harmonic generator tied to engine RPM and Pacejka tire slip angle.
- **AI Pathfinding & Deceleration Horizon:** Continuous lookahead horizon (1.4s preview) dynamically calculating required deceleration $a_{req} = \frac{v^2 - v_{target}^2}{2 \cdot d_{brake}}$ and projecting amber braking decals on the circuit.

---

## 5. Assignment 4 Compliance Checklist & Deliverable Links

| Deliverable | Details & Status |
| :--- | :--- |
| **Weekly Schedule:** | Complete week-by-week roadmap (Weeks 9–14) detailed above, including **Week 14 Buffer Week** (Zero feature freeze). |
| **Playable Alpha Build:** | Live Hosted URL: [https://vshaunak.github.io/RacingGenesis/](https://vshaunak.github.io/RacingGenesis/)<br>Local Execution: `python serve.py 8081` &rarr; **http://localhost:8081** |
| **Source Code Repository:** | GitHub Repo: [https://github.com/VShaunak/RacingGenesis](https://github.com/VShaunak/RacingGenesis)<br>*(Includes source, release notes, and run instructions)* |
| **Demo Video Walkthrough:** | YouTube Video URL: [https://youtu.be/GLIEs-A5Xi0](https://youtu.be/GLIEs-A5Xi0)<br>*(Covers MVP features, audio, and stress testing)* |

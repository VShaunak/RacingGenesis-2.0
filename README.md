# Published Link : https://vshaunak.github.io/RacingGenesis-2.0/prototype/index.html
# Racing Genesis — Assignment 5: Beta Build & Advanced Feature Integration

**Course:** CS 549 (AI for Visual Computing) — Rutgers University  
**Project:** Racing Genesis: Physics-Driven Procedural F1 Simulation & Autonomous AI Driving  
**Build Version:** Beta Build v7.0  
**Team Members:** Shaunak M Vidwans (Lead), Pavan Sai Komara, Sridevi Mudiyanur Ramamurthy, Zeba Afreen  
**Date:** November 2026  

- **GitHub Repository:** [https://github.com/VShaunak/RacingGenesis-2.0](https://github.com/VShaunak/RacingGenesis-2.0)  
- **Local Playable Server:** `http://localhost:8081` (via `python serve.py 8081` inside `prototype/`)

---

## 🏎️ Beta Build Overview

Building on our Assignment 4 Alpha Build (which established the procedural Catmull-Rom track extrusion with Bishop Parallel Transport Frames and the complete 3-state game loop), **Assignment 5 transitions Racing Genesis into a visually cohesive Beta Build** by directly integrating secondary technical pillars into the core driving simulation:

1. **Hardware-Instanced GPU Particle Smoke & Skidmarks (`TireSmokeAndSkidSystem`)**:
   - Single draw-call `THREE.InstancedMesh` managing a 120-particle pool with soft camera-facing alpha sprites.
   - Emits dynamic tire smoke from rear tire contact patches when threshold braking (`> 38 m/s²`) or high lateral tire slip (`> 2.2G`) occurs.
   - Deposits dynamic dark rubber skidmark line segments along tire cornering and lockup paths.

2. **Brake Disc Thermal Incandescence Shader (`RaceCar3D`)**:
   - Real-time kinetic friction thermal simulation ($E_k = \frac{1}{2}mv^2$) heating brake rotors up to 800°C during heavy deceleration.
   - Dynamically shifts carbon-ceramic brake discs from dark steel into molten glowing crimson/amber (`emissive: #ff3300`), cooled naturally by convective airflow down straightaways.

3. **Multi-Car AI Racing Simulation (`OpponentCarAgent`)**:
   - Concurrent secondary Formula 1 sparring opponent rendered in Scarlet Red & Gold livery.
   - Executes real-time spline lookahead pacing, anticipating corner radii, calculating apex speeds, holding an overtaking lane offset, and reporting live gap deltas (`P2 GAP`) in the top HUD bar.

4. **Curvilinear Boundary Collision & Curb Rumble Haptics**:
   - Detects curb contact (`|d_lat| > roadHalfWidth - 0.7m`), triggering chassis micro-oscillations, camera screen shake, and synthesized 48 Hz Web Audio rumble buzzing.
   - Enforces realistic off-track grass/gravel deceleration drag (`-34 m/s²`) with kicking dust particles.

5. **Live 90 Hz Telemetry Canvas Oscillogram (`LiveTelemetryGraph`)**:
   - Rolling 75-sample circular waveform trace embedded directly in the Telemetry drawer, plotting live curves for **Speed**, **Throttle %**, **Brake %**, and **Lateral G-Force**.

6. **Procedural Atmospheric Sky & In-Drawer Toggles**:
   - Multi-stop daylight sky dome gradient (`createSkyGradientTexture`) replacing flat color fills with horizon haze to deep alpine zenith blue.
   - Toggle switches in the Track Editor drawer for **AI Sparring Car** and **Smoke & FX**.

---

## 📁 Folder & Submission Structure

```text
Assignment-5/
├── README.md                                              # GitHub repository overview (this file)
├── Assignment 5_ Beta Build.pdf                           # Course assignment specification
├── prototype/                                             # Playable Beta Build v7.0 Simulator
│   ├── index.html                                         # HUD, Track Editor, Telemetry Drawer, Modals
│   ├── app.js                                             # 90 FPS physics, shaders, multi-car AI, audio engine
│   ├── style.css                                          # Windows 11 Fluent dark glassmorphism styling
│   ├── serve.py                                           # Zero-cache local HTTP server
│   ├── three.module.js                                    # Bundled Three.js ES module & core files
│   ├── test_beta_simulation.mjs                           # Automated headless simulation verification suite
│   ├── scratch_test.mjs                                   # ES module syntax & smoke check
│   └── README.md                                          # Prototype architecture & controls reference
├── report/                                                # Assignment 5 Documentation Deliverables
│   ├── Racing_Genesis_Assignment_5_Beta_Report.pdf        # Strict 2-page PDF Report (Schedule + Release Notes)
│   ├── Racing_Genesis_Assignment_5_Beta_Report.docx       # Word Document version
│   └── Racing_Genesis_Assignment_5_Beta_Report.md         # Markdown version
├── checklist/                                             # Submission Verification Checklist Artifacts
│   ├── pt1_beta_production_schedule_and_roadmap.txt       # Detailed Week 9–14 production roadmap
│   ├── pt2_github_published_playable_link.txt             # Repository & local launch links
│   └── pt3_beta_release_notes.docx                        # Release notes & known issues Word document
└── submissionAssignment5/                                 # Self-contained submission package
    ├── README.md                                          # Submission overview & index
    ├── assignment_document/                               # Original Assignment 5 PDF brief
    ├── checklist/                                         # Checklist artifacts (pt1, pt2, pt3)
    ├── prototype/                                         # Complete playable Beta Build prototype
    └── report/                                            # Strict 2-page PDF, DOCX, and MD reports
```

---

## 📋 Assignment 5 Checklist Compliance Matrix

| Requirement | Status | Artifact Location | Summary |
| :--- | :---: | :--- | :--- |
| **Source Code Repository** | ✅ Ready | [RacingGenesis-2.0](https://github.com/VShaunak/RacingGenesis-2.0) | Full source code for Beta Build v7.0. |
| **Beta Build Prototype** | ✅ Ready | [`prototype/`](./prototype/) | Secondary pillars integrated into 90 FPS core loop (Start / Active / End). |
| **2-Page PDF Report** | ✅ Verified (2 Pages) | [`report/Racing_Genesis_Assignment_5_Beta_Report.pdf`](./report/Racing_Genesis_Assignment_5_Beta_Report.pdf) | Quick review, secondary pillar integration, new features, known issues, schedule. |
| **Checklist Deliverables** | ✅ Ready | [`checklist/`](./checklist/) | Production plan, repository link, and Beta release notes Word doc. |
| **Submission Archive** | ✅ Synced | [`submissionAssignment5/`](./submissionAssignment5/) | Self-contained folder packaging assignment brief, prototype, report, and checklist. |

---

## 🚀 How to Run Locally

1. Open a terminal or PowerShell window in `Assignment-5/prototype/`:
   ```powershell
   cd "Assignment-5\prototype"
   python serve.py 8081
   ```
2. Open Google Chrome, Microsoft Edge, or Mozilla Firefox and visit:
   👉 **[http://localhost:8081](http://localhost:8081)**

3. *(Optional)* Run the automated Beta simulation test suite with Node.js:
   ```powershell
   node test_beta_simulation.mjs
   ```

---

## 🕹️ Controls & Hotkeys

| Action | Input | Description |
| :--- | :--- | :--- |
| **Accelerate** | `W` or `↑` | Progressive throttle acceleration (up to 228 mph) |
| **Brake / Reverse** | `S` or `↓` | Threshold carbon braking (heats rotors glowing red) and reverse gear |
| **Steer Left / Right** | `A` / `D` or `←` / `→` | Progressive Ackermann steering with inertia smoothing |
| **Switch Camera** | `C` or Header Switcher | Cycle between 3rd-Person Chase, Cockpit 3D, and Orbit |
| **Track Editor Drawer** | `[` | Toggle left panel (circuit presets, length 1,000m–10,000m, Beta FX toggles) |
| **Telemetry Drawer** | `]` | Toggle right panel (live speed, lateral G, 90 Hz waveform canvas, lap history) |

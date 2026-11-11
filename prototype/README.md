# Racing Genesis — Assignment 5: Beta Build & Advanced Feature Integration

**Course**: CS 549 (AI for Visual Computing) — Rutgers University  
**Project**: Racing Genesis: Physics-Driven Procedural F1 Simulation & Autonomous AI Driving  
**Build Version**: Beta Build v7.0 (Secondary Technical Pillars & Multi-Car Racing)  
**Playable Prototype**: [http://localhost:8081](http://localhost:8081)  
**GitHub Repository**: [https://github.com/VShaunak/RacingGenesis-2.0](https://github.com/VShaunak/RacingGenesis-2.0)  

---

## 🏎️ Beta Build Overview: Secondary Pillar Integration & Visual Cohesion

Following the Assignment 4 Alpha milestone, **Assignment 5 transitions our project into a fully cohesive Beta Build.** We expanded our vertical slice by directly connecting secondary technical pillars into the active driving loop, elevating visual fidelity from developer prototypes into an authentic Formula 1 simulator.

### 🌟 Key Secondary Technical Pillars Integrated in Beta

1. **Hardware-Instanced GPU Tire Smoke & Asphalt Skidmarks**:
   - Single draw-call `THREE.InstancedMesh` managing a 120-particle pool with billboarded camera-facing soft alpha sprites.
   - Dynamic particle emission from front and rear tire contact patches when threshold braking (`isBraking`) or lateral sliding occurs (`lateral slip > 2.2G`).
   - Dynamic asphalt skidmark ribbon segments deposited on the road bed along tire trajectories, fading over time.

2. **Brake Disc Thermal Incandescence (Molten Glow Shader)**:
   - Dynamic thermal model accumulating kinetic friction heat up to 800°C under heavy braking (`brakeHeat = 1.0`).
   - Modulates carbon-ceramic rotor material into glowing incandescent crimson/amber (`emissive: 0xff3300`, `emissiveIntensity: 2.8`).
   - Realistic convective cooling airflow dissipating thermal load as vehicle speed climbs down straightaways.

3. **Multi-Car AI Racing Agent (Sparring Opponent)**:
   - Concurrent secondary Formula 1 car entity with distinctive Scarlet Red & Gold livery.
   - Follows procedural track splines with dynamic lookahead pacing, lane offsets, and overtaking/defending behavior.
   - Real-time time delta calculation displayed directly on the HUD (`P2 GAP: +1.45s`).

4. **Curvilinear Boundary Collision & Curb Rumble Haptics**:
   - High-frequency curb contact detection (`dist > roadHalf - 0.7m`) triggering chassis micro-vibrations and screen shake.
   - Web Audio curb rumble synthesizer generating 48 Hz low-frequency square wave harmonics.
   - Off-track grass/gravel trap drag penalties (`-34 m/s²`) and kicking dust particles.

5. **Live Telemetry Waveform Oscillogram (90 Hz Canvas)**:
   - Rolling 75-sample circular buffer rendering multi-channel live traces for Speed, Throttle %, Brake %, and Lateral G-Force in the HUD Telemetry drawer.

6. **Atmospheric Environment & Visual Cohesion**:
   - Atmospheric sky gradient texture blending warm horizon haze with alpine zenith blue.
   - Dynamic grandstands, pine forest stands, and cheering trackside spectators automatically positioned relative to procedural track geometry.

---

## 🎮 The Full Beta Game Loop

```
┌─────────────────────────┐
│       START STATE       │ ➔ 5 Real Grand Prix Circuits (Monza, Silverstone, Spa, Monaco, Suzuka)
│    (Pre-Race Config)    │ ➔ Custom Track Length Scaling: 1,000m to 10,000m
└────────────┬────────────┘ ➔ Driving Mode: Autonomous AI vs. Manual WASD Control
             │
             ▼
┌─────────────────────────┐
│       ACTIVE STATE      │ ➔ Locked 90 FPS WebGL rendering with zero memory leaks
│   (Beta Racing Loop)    │ ➔ Multi-Car Sparring Opponent & Live Gap Delta
└────────────┬────────────┘ ➔ Tire Smoke, Skidmarks & Glowing Brake Rotors
             │              ➔ Curb Rumble Audio & Haptic Feedback
             │ [Laps Completed]
             ▼
┌─────────────────────────┐
│        END STATE        │ ➔ Waving Checkered Flag & Trackside Podium Celebration
│   (Session Summary)     │ ➔ Lap-by-Lap Timing Table, Top Speed, Max Lateral G
└─────────────────────────┘ ➔ Instant "Race Again" & "Track Sculptor Sandbox" Actions
```

---

## 🚀 How to Run Locally

1. Open PowerShell or Terminal in this directory:
   ```powershell
   cd "D:\My files\Rutgers\7-AI for Visual Computing\All assignments\Assignment-5\prototype"
   python serve.py 8081
   ```
2. Open your web browser to:
   👉 **[http://localhost:8081](http://localhost:8081)**

---

## 🕹️ Controls & Hotkeys Guide

| Action | Input | Description |
| :--- | :--- | :--- |
| **Accelerate** | `W` or `Up Arrow` | Applies progressive throttle (up to 228 mph) |
| **Brake / Reverse** | `S` or `Down Arrow` | Threshold carbon braking down to halt; reverse gear |
| **Steer Left / Right** | `A` / `D` or `Left` / `Right` | Progressive Ackermann steering with centering inertia |
| **Switch Camera** | `C` or Top Bar | Cycle between 3rd-Person Chase, Cockpit 3D, and Orbit |
| **Toggle Track Editor** | `[` | Slide open / close left Track Editor drawer |
| **Toggle Telemetry** | `]` | Slide open / close right Live Telemetry drawer |
| **Engine Audio** | Top Icon | Toggle real-time procedural Web Audio V6 engine sound |
| **AI Opponent Car** | Left Drawer Toggle | Turn secondary sparring car on or off |
| **Smoke & Skidmarks**| Left Drawer Toggle | Toggle particle smoke and tire skidmark decals |

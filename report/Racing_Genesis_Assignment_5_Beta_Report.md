# Racing Genesis — Assignment 5: Beta Build Report & Production Roadmap

**Course**: CS 549 (AI for Visual Computing) — Rutgers University  
**Project**: Racing Genesis: Physics-Driven Procedural F1 Simulation & Autonomous AI Driving  
**Date**: November 9, 2026  
**Team Members**: Shaunak Vidwans, Pavan Sai Komara, Sridevi Mudiyanur Ramamurthy, Zeba Afreen  
**Lead Presenter**: Shaunak M Vidwans  

- **Public GitHub Repository**: [https://github.com/VShaunak/RacingGenesis-2.0](https://github.com/VShaunak/RacingGenesis-2.0)  
- **Playable Local WebGL Build**: [http://localhost:8081](http://localhost:8081)  

---

## 1. Quick Review (1st Technical Pillar & Alpha Achievements)

Our foundational primary pillar is **Procedural 3D Modeling & Continuous Track Ribbon Extrusion**. In Assignment 4 (Alpha Build), we resolved the classical differential geometry Frenet-Serret singularity on straightaways (where vanishing curvature $\kappa \to 0$ flips surface normals by 180°) by developing a custom **Parallel Transport Frame (Bishop Frame)** system anchored to a constant world-up vector. To enforce seamless closed-circuit continuity across the start/finish gantry, we implemented periodic phantom control points ensuring position and second-derivative $C^2$ continuity.

These procedural algorithms dynamically extrude the asphalt roadbed, multi-tier curbing, run-off gravel traps, tire barriers, safety fences, and trackside grandstands across 5 authentic Grand Prix circuits (Monza, Silverstone, Spa, Monaco, Suzuka) and user-sculpted tracks spanning 1,000m to 10,000m, running locked at 90 FPS on standard desktop browsers.

---

## 2. Secondary Pillar Integration into the Core Driving Loop

For Assignment 5 (Beta Build), our core objective was expanding our vertical slice by directly connecting our secondary technical pillars into the active driving loop, ensuring every feature provides meaningful gameplay interaction rather than functioning as an isolated tech demo:

1. **Hardware-Instanced GPU Particle Shaders (Tire Smoke & Skidmark Trails)**:
   - Pre-allocated 120-particle GPU instanced mesh (`THREE.InstancedMesh`) executing in a single WebGL draw call.
   - Dynamic emission coupled directly to vehicle dynamics: activates whenever threshold braking occurs ($a_{decel} > 38\text{ m/s}^2$) or lateral tire slip angle exceeds limits (lateral acceleration $> 2.2G$).
   - Soft alpha-blended radial particles expand and rise with thermal buoyancy while dynamic line segments deposit persistent skidmark decals along tire paths.

2. **Brake Disc Thermal Incandescence (Molten Rotor Glow)**:
   - Dynamic kinetic energy dissipation model ($E_k = \frac{1}{2}mv^2$) calculating real-time brake rotor temperature up to 800°C.
   - When threshold braking is applied, the carbon-ceramic disc material dynamically shifts from matte dark steel into glowing molten crimson/amber (`emissive: #ff3300`, `emissiveIntensity = 2.8`).
   - During acceleration down straightaways, convective cooling airflow ($q_{conv} \propto v$) dissipates heat naturally back to baseline.

3. **Multi-Car AI Racing Simulation (Sparring Opponent)**:
   - Instantiated a concurrent secondary Formula 1 car entity with distinctive Scarlet Red & Gold livery.
   - Executes dynamic spline lookahead pacing, anticipating upcoming corner radii and calculating competitive apex speeds while holding an overtaking lateral lane offset.
   - Real-time time delta calculation displayed directly on the HUD (`P2 GAP: +1.45s`).

4. **Curvilinear Boundary Collision & Haptic Curb Vibration**:
   - High-frequency curb contact detection ($|d_{lat}| > \frac{w_{road}}{2} - 0.7\text{m}$) triggering chassis micro-oscillations and camera rumble.
   - Web Audio curb rumble synthesizer generating 48 Hz low-frequency square wave harmonics.
   - Off-track grass/gravel trap drag penalties ($-34\text{ m/s}^2$) with kicking dust particles.

5. **Live Telemetry Canvas Oscillogram (90 Hz Multi-Channel Waveforms)**:
   - Real-time 75-sample rolling circular buffer in the HUD Telemetry drawer.
   - Displays synchronized live traces for Speed (cyan), Throttle (green), Brake (red), and Lateral G-Force (amber).

6. **Atmospheric Environment & Visual Cohesion**:
   - Multi-stop daylight sky dome gradient texture replacing flat solid shading with warm atmospheric horizon haze and alpine blue zenith.

---

## 3. Beta New Features (Summary of Additions Since Alpha)

| Feature | Subsystem | Description & Gameplay Impact |
| :--- | :--- | :--- |
| **GPU Tire Smoke** | Visual Particles | Single draw-call instanced smoke quads emitted under threshold braking or high lateral slip. |
| **Asphalt Skidmarks** | Visual Shaders | Dynamic tarmac decal ribbons deposited along front and rear tire contact paths. |
| **Brake Incandescence** | Shader Dynamics | Molten orange-red rotor glow proportional to accumulated brake heat, cooled by airspeed. |
| **AI Sparring Opponent** | Multi-Car Agent | Concurrent AI car with Scarlet livery, dynamic pacing, and live HUD gap time tracking. |
| **Curb Rumble Haptics** | Audio & Haptics | Chassis vertical shudder, camera shake, and 48 Hz audio vibration when clipping apex curbs. |
| **Off-Track Drag Penalty**| Boundary Physics | Realistic grass/gravel deceleration penalty ($-34\text{ m/s}^2$) preventing off-track corner cutting. |
| **Live Telemetry Graph** | HUD & Pipeline | Real-time 90 Hz rolling waveform canvas plotting speed, throttle, brake, and lateral Gs. |
| **Atmospheric Sky Dome** | Environment | Procedural horizon-to-zenith color gradient enhancing overall visual cohesion. |
| **Simulation Controls** | UI & Settings | In-drawer toggle buttons for AI Sparring Car and Smoke/Skid FX modules. |

---

## 4. Known Issues & Unoptimized Areas (Heading into Final Buffer Week)

1. **Multi-Car Elastic Impulse Response**: While the AI opponent dynamically yields and holds lateral lane clearance, physical car-to-car collision currently relies on kinematic separation rather than dynamic mesh deformation or elastic rebound impulses.
2. **Web Audio Browser Gesture Gate**: Strict modern browser security policies suspend the AudioContext until the player's initial mouse click on the canvas or UI drawer.
3. **Complex Track Self-Intersection**: Extreme user-dragged track handle configurations (e.g. tight overlapping figure-8 knots) can create co-planar road intersections without vertical bridge overpasses.
4. **Mobile Touch Sensitivity**: While responsive on touchscreens, fine handle manipulation is calibrated primarily for high-precision desktop mouse drag.

---

## 5. Production Schedule & Milestone Status

- **Week 9: Alpha Build (MVP 2.0)** — *COMPLETED*: Full 3-state game loop, 5 Grand Prix layouts, manual WASD + AI autopilot, 90 FPS rendering.
- **Week 10: Visual Shaders & Particles** — *COMPLETED*: GPU instanced tire smoke, asphalt skidmarks, brake disc incandescence.
- **Week 11: Boundaries & Curb Haptics** — *COMPLETED*: Curb vibration, camera rumble, off-track drag penalties, audio harmonics.
- **Week 12: Multi-Car Simulation** — *COMPLETED*: Sparring opponent AI, overtaking lane offset, dynamic pacing, live gap delta.
- **Week 13: Live Telemetry Pipeline** — *COMPLETED*: 90 Hz rolling canvas waveform oscillogram, in-drawer module toggles.
- **Week 14: Dedicated Buffer Week (Feature Freeze)** — *UPCOMING*: Strict feature freeze, cross-browser memory profiling (Chrome, Edge, Firefox), WebGL draw-call optimization, final video capture, and project documentation polish.

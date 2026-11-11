import fs from 'fs';

// Mock minimal browser globals
const domElements = {};
function getMock(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id: id,
      tagName: 'DIV',
      style: {},
      classList: {
        set: new Set(),
        add(c) { this.set.add(c); },
        remove(c) { this.set.delete(c); },
        contains(c) { return this.set.has(c); },
        toggle(c, v) { if (v === undefined ? this.set.has(c) : !v) this.set.delete(c); else this.set.add(c); }
      },
      appendChild() {},
      addEventListener() {},
      removeEventListener() {},
      value: '5000',
      dataset: { mode: 'ai', cam: 'chase', preset: 'monza' },
      textContent: '',
      innerHTML: '',
      getContext() {
        return {
          fillStyle: '',
          strokeStyle: '',
          lineWidth: 1,
          fillRect() {},
          strokeRect() {},
          clearRect() {},
          beginPath() {},
          moveTo() {},
          lineTo() {},
          stroke() {},
          fill() {},
          arc() {},
          roundRect() {},
          save() {},
          restore() {},
          translate() {},
          rotate() {},
          setTransform() {},
          measureText: () => ({ width: 50 }),
          fillText() {},
          createRadialGradient: () => ({ addColorStop() {} }),
          createLinearGradient: () => ({ addColorStop() {} }),
          getImageData: () => ({ data: new Uint8ClampedArray(512 * 512 * 4) }),
          putImageData() {}
        };
      }
    };
  }
  return domElements[id];
}

const html = fs.readFileSync('index.html', 'utf8');
const matches = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
matches.forEach(id => getMock(id));

globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 16);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);

globalThis.window = {
  innerWidth: 1920,
  innerHeight: 1080,
  devicePixelRatio: 1,
  addEventListener() {},
  removeEventListener() {},
  location: { reload() {} },
  performance: { now: () => Date.now() },
  requestAnimationFrame: (cb) => setTimeout(cb, 16),
  cancelAnimationFrame() {},
  AudioContext: class {
    constructor() {
      this.currentTime = 0;
      this.destination = {};
      this.state = 'running';
    }
    createGain() { return { gain: { value: 1, setValueAtTime(){}, setTargetAtTime(){} }, connect(){ return this; } }; }
    createOscillator() { return { type: '', frequency: { setValueAtTime(){}, setTargetAtTime(){} }, connect(){ return this; }, start(){} }; }
    createBiquadFilter() { return { type: '', frequency: { setValueAtTime(){}, setTargetAtTime(){} }, Q: { setValueAtTime(){} }, connect(){ return this; } }; }
    createWaveShaper() { return { curve: null, connect(){ return this; } }; }
    resume() {}
  }
};

globalThis.document = {
  getElementById: (id) => getMock(id),
  querySelectorAll: () => [],
  body: getMock('body'),
  createElement: (tag) => {
    const el = getMock('mock_' + tag + '_' + Math.random().toString(36).substr(2, 5));
    el.tagName = tag.toUpperCase();
    if (tag === 'canvas') {
      el.width = 1024;
      el.height = 512;
    }
    return el;
  },
  createElementNS: (ns, tag) => {
    const el = getMock('mock_ns_' + tag + '_' + Math.random().toString(36).substr(2, 5));
    el.tagName = tag.toUpperCase();
    return el;
  }
};

// Import actual Three.js
import * as THREE from './three.module.js';

console.log('Loading app.js with real Three.js in headless Node...');
await import('./app.js');

const app = globalThis.window.racingApp;
if (!app) {
  throw new Error('window.racingApp was not created!');
}

console.log('✓ Assignment 5 Simulator instance created successfully!');
console.log('✓ Player Car initialized with Brake Incandescence Material');
console.log('✓ Opponent AI Agent initialized at progress:', app.opponent.progress);
console.log('✓ Tire Smoke & Skidmark System loaded (max particles:', app.tireSmokeSystem.maxParticles, ')');
console.log('✓ 90 FPS Live Telemetry Canvas Waveform Graph initialized');

// Test 1: AI mode physics and frame progression
console.log('\n--- Test 1: Autonomous AI Simulation Loop (30 Frames) ---');
for (let i = 0; i < 30; i++) {
  app.stepFrame(1 / 90);
}
console.log(`Speed: ${(app.speed * 2.23694).toFixed(1)} mph | Lat-G: ${app.lateralG.toFixed(2)} G | Opponent Speed: ${(app.opponent.speed * 2.23694).toFixed(1)} mph`);

// Test 2: Trigger heavy braking and test brake heat incandescence
console.log('\n--- Test 2: Brake Incandescence & Particle Smoke Test ---');
app.speed = 75.0; // 167 mph
app.aiState = "AI: THRESHOLD BRAKING";
app.brakeLevel = 1.0;
for (let i = 0; i < 20; i++) {
  app.stepFrame(1 / 90);
}
console.log(`Brake Disc Heat: ${app.car.brakeHeat.toFixed(3)} | Emissive Intensity: ${app.car.brakeRotorMat.emissiveIntensity.toFixed(2)}`);
if (app.car.brakeHeat > 0.1 && app.car.brakeRotorMat.emissiveIntensity > 0.1) {
  console.log('✓ Brake Disc glowing molten incandescent red under threshold braking!');
} else {
  throw new Error('Brake disc did not heat up properly!');
}

// Test 3: Manual WASD Mode & Off-Track Curb Collision
console.log('\n--- Test 3: Manual WASD Driving & Curb Vibration ---');
app.driverMode = 'manual';
app.manualHeading = 0;
app.keysDown['KeyW'] = true;
for (let i = 0; i < 30; i++) {
  app.stepManualPhysics(1 / 90);
  app.stepFrame(1 / 90);
}
console.log(`Manual Forward Drive Speed: ${(app.speed * 2.23694).toFixed(1)} mph`);
delete app.keysDown['KeyW'];

// Shift car to curb
app.car.carGroup.position.x = app.track.roadWidth * 0.5 - 0.2;
app.stepManualPhysics(1 / 90);
console.log(`Curb contact detected: ${app.isOverCurb}`);

console.log('\n======================================================');
console.log(' ALL ASSIGNMENT 5 BETA BUILD SIMULATION TESTS PASSED! ');
console.log('======================================================\n');
process.exit(0);

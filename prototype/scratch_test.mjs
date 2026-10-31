import fs from "fs";

// Mock minimal browser globals for testing app.js initialization
globalThis.window = {
  innerWidth: 1920,
  innerHeight: 1080,
  addEventListener: () => {},
  removeEventListener: () => {},
  location: { reload: () => {} },
  performance: { now: () => Date.now() },
  requestAnimationFrame: (cb) => setTimeout(cb, 11),
};
globalThis.document = {
  getElementById: (id) => ({
    textContent: "",
    innerHTML: "",
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    style: {},
    addEventListener: () => {},
    setAttribute: () => {},
    querySelectorAll: () => [],
    appendChild: () => {},
  }),
  createElement: (tag) => {
    if (tag === "canvas") {
      return {
        width: 1024,
        height: 512,
        getContext: () => ({
          fillStyle: "",
          fillRect: () => {},
          beginPath: () => {},
          roundRect: () => {},
          fill: () => {},
          stroke: () => {},
          fillText: () => {},
          createLinearGradient: () => ({ addColorStop: () => {} }),
          clearRect: () => {},
        }),
      };
    }
    return {
      style: {},
      addEventListener: () => {},
      appendChild: () => {},
    };
  },
  body: { appendChild: () => {}, clientWidth: 1920, clientHeight: 1080 },
  querySelectorAll: () => [],
};
globalThis.performance = globalThis.window.performance;
globalThis.requestAnimationFrame = globalThis.window.requestAnimationFrame;

// Import three.js
import * as THREE from "./three.module.js";
globalThis.THREE = THREE;

console.log("Mock DOM ready, importing app.js...");
try {
  const appModule = await import("./app.js");
  console.log("app.js imported successfully without runtime syntax or initialization errors!");
} catch (err) {
  console.error("RUNTIME ERROR IN APP.JS:", err);
}

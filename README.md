# MiniScad

> A lightweight, browser-based CAD playground inspired by OpenSCAD.  
> Write code → see 3D shapes → export STL. No install required.

---

## Features
- Code editor + live 3D viewer (WebGL powered with JSCAD renderer).
- Based on **JSCAD modeling primitives** (cube, sphere, cylinder, etc).
- Upload your own `.js` design files into the editor.
- Export models as **ASCII STL** (works in slicers and 3D printers).
- Example scripts included (`/examples`).

---

## 📂 Folder Structure
```
miniscad/
├── index.html          # Main app (UI entry point)
├── /src
│   ├── app.js          # Main app logic (editor + viewer + UI hooks)
│   └── /lib
│       └── stl-exporter.js   # ASCII STL export function
├── /examples           # Example design scripts
│   ├── dice.js
│   ├── wheel.js
│   ├── keytag.js
│   └── bitbeam.js
├── /docs               # Documentation & guides
│   ├── README.md       # (this file)
│   ├── getting-started.md
│   └── examples.md
└── /assets             # Optional static assets (icons, css, logos)
```

---

## Getting Started
1. Clone or download this repository.  
2. Open `index.html` in your browser (no server required).  
3. Start coding in the left editor panel.  
4. Hit **▶ Run** to render in 3D.  
5. Use **Export STL** to download your model.

---

## Example

**Code:**
```js
function main() {
  const { cube, cylinder } = jscadModeling.primitives
  const { subtract } = jscadModeling.booleans
  const { translate } = jscadModeling.transforms

  const body = cube({ size: 40 })
  const hole = translate([20,20,-10], cylinder({ height: 60, radius: 10 }))
  return subtract(body, hole)
}
```

**Result:**  
A cube with a cylindrical hole through it.

---

## 📘 Documentation
- [Getting Started](docs/getting-started.md)  
- [Examples](docs/examples.md)  
- [Architecture](docs/architecture.md) *(optional if you add one)*

---

## 📜 License
MIT — free to use, share, and modify.



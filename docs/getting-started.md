# Getting Started with MiniScad

MiniScad is a lightweight, browser-based CAD playground that lets you create 3D models using JavaScript code. This guide will help you get up and running quickly.

## Quick Start

1. **Open MiniScad**: Simply open `index.html` in your web browser - no installation required!
2. **Write Code**: Use the left panel to write your 3D modeling code
3. **Run & View**: Click the "▶ Run" button to see your 3D model
4. **Export**: Use "Export STL" to download your model for 3D printing

## Basic Concepts

### The main() Function

Every MiniScad script must have a `main()` function that returns one or more 3D objects:

```javascript
function main() {
  const { cube } = jscadModeling.primitives;
  return cube({ size: 20 });
}
```

### Available Libraries

MiniScad uses the JSCAD modeling library, which provides:

- **Primitives**: `cube`, `sphere`, `cylinder`, `cuboid`, etc.
- **Booleans**: `union`, `subtract`, `intersect`
- **Transforms**: `translate`, `rotate`, `scale`

### Basic Example

```javascript
function main() {
  const { cube, cylinder } = jscadModeling.primitives;
  const { subtract } = jscadModeling.booleans;
  const { translate } = jscadModeling.transforms;

  // Create a cube
  const body = cube({ size: 40 });
  
  // Create a cylinder for the hole
  const hole = translate([20, 20, -10], cylinder({ height: 60, radius: 10 }));
  
  // Subtract the hole from the cube
  return subtract(body, hole);
}
```

## Controls

### 3D Viewer Controls

- **Rotate**: Click and drag to rotate the view
- **Pan**: Hold Shift + click and drag to pan
- **Zoom**: Use mouse wheel to zoom in/out

### Editor Features

- **Upload**: Load `.js` files from your computer
- **Export STL**: Download your model as an STL file for 3D printing
- **Console**: View output and error messages

## Tips

1. **Start Simple**: Begin with basic shapes and gradually add complexity
2. **Use the Console**: Check the console panel for error messages and debug output
3. **Save Your Work**: Use the upload/download features to save your designs
4. **Experiment**: Try different combinations of primitives and operations

## Next Steps

- Check out the [examples](../examples/) folder for inspiration
- Read the [JSCAD documentation](https://openjscad.xyz/) for advanced features
- Experiment with different shapes and operations

Happy modeling! 🎯
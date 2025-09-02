# MiniScad Examples

This document explains the example scripts included with MiniScad. Each example demonstrates different modeling techniques and JSCAD features.

## Available Examples

### 1. Dice (`examples/dice.js`)

Creates a 6-sided die with proper dot patterns on each face.

**Features Demonstrated:**
- Basic cube primitive
- Sphere primitives for dots
- Boolean subtraction to create indentations
- Precise positioning with `translate()`
- Complex geometry with multiple operations

**Key Concepts:**
- Using loops to create repeated elements
- Proper face numbering (opposite faces sum to 7)
- Creating indented features rather than raised ones

### 2. Wheel (`examples/wheel.js`)

Generates a spoked wheel suitable for mechanical applications.

**Features Demonstrated:**
- Cylinder primitives for wheel body and hub
- Cube primitives for spokes
- Rotation transformations (`rotateZ`)
- Loop-based pattern creation
- Boolean union to combine multiple parts
- Center hole for axle

**Key Concepts:**
- Parametric design (easily adjustable spoke count)
- Polar coordinate positioning
- Combining multiple geometric operations

### 3. Bitbeam (`examples/bitbeam.js`)

Creates a construction beam with regularly spaced holes, similar to Technic beams.

**Features Demonstrated:**
- Rectangular beam creation
- Multiple hole orientations
- Systematic hole placement
- Complex boolean operations
- Rotation around different axes (`rotateX`, `rotateY`)

**Key Concepts:**
- Modular construction principles
- Grid-based hole patterns
- Multi-directional features

## Using the Examples

### Loading Examples

1. **Copy and Paste**: Open an example file and copy the code into the MiniScad editor
2. **Upload**: Use the "Upload" button to load example files directly
3. **Modify**: Use examples as starting points for your own designs

### Customizing Examples

All examples are designed to be easily customizable:

```javascript
// In dice.js - change the size
const body = cube({ size: 30 }); // Larger die

// In wheel.js - change spoke count
const numSpokes = 8; // More spokes

// In bitbeam.js - change beam length
const beamLength = 120; // Longer beam
```

## Learning Path

### Beginner
1. Start with the **dice** example to understand basic shapes and boolean operations
2. Modify the dice size and dot patterns

### Intermediate
3. Try the **wheel** example to learn about rotations and patterns
4. Experiment with different spoke counts and wheel sizes

### Advanced
5. Study the **bitbeam** example for complex multi-directional features
6. Create your own construction system components

## Tips for Creating Your Own Examples

1. **Start Simple**: Begin with basic shapes and add complexity gradually
2. **Use Parameters**: Define variables for dimensions to make designs adjustable
3. **Comment Your Code**: Explain what each section does
4. **Test Incrementally**: Build up complex models step by step
5. **Think Modular**: Create reusable components

## Common Patterns

### Creating Arrays of Objects
```javascript
let holes = [];
for (let i = 0; i < count; i++) {
  const hole = translate([i * spacing, 0, 0], cylinder({ radius: 2, height: 10 }));
  holes.push(hole);
}
const allHoles = union(...holes);
```

### Polar Positioning
```javascript
for (let i = 0; i < count; i++) {
  const angle = (i * 360) / count;
  const x = radius * Math.cos(angle * Math.PI / 180);
  const y = radius * Math.sin(angle * Math.PI / 180);
  // Position object at (x, y)
}
```

### Parametric Design
```javascript
function createWheel(radius, spokeCount, thickness) {
  // Use parameters throughout the function
  const wheelDisc = cylinder({ radius: radius, height: thickness });
  // ... rest of wheel creation
}
```

Happy modeling! 🔧
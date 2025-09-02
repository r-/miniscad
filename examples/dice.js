// Dice Example - A 6-sided die with dots
function main() {
  const { cube, cylinder, sphere } = jscadModeling.primitives;
  const { subtract, union } = jscadModeling.booleans;
  const { translate } = jscadModeling.transforms;

  // Create the main cube body
  const body = cube({ size: 20 });

  // Create dots (small spheres)
  const dotRadius = 1.5;
  const dotDepth = 1;
  
  // Face 1 (front) - 1 dot in center
  const dot1 = translate([0, 10.1, 0], sphere({ radius: dotRadius }));
  
  // Face 2 (right) - 2 dots diagonal
  const dot2a = translate([10.1, 0, -5], sphere({ radius: dotRadius }));
  const dot2b = translate([10.1, 0, 5], sphere({ radius: dotRadius }));
  
  // Face 3 (top) - 3 dots diagonal
  const dot3a = translate([-5, 0, 10.1], sphere({ radius: dotRadius }));
  const dot3b = translate([0, 0, 10.1], sphere({ radius: dotRadius }));
  const dot3c = translate([5, 0, 10.1], sphere({ radius: dotRadius }));
  
  // Face 4 (left) - 4 dots in corners
  const dot4a = translate([-10.1, -5, -5], sphere({ radius: dotRadius }));
  const dot4b = translate([-10.1, -5, 5], sphere({ radius: dotRadius }));
  const dot4c = translate([-10.1, 5, -5], sphere({ radius: dotRadius }));
  const dot4d = translate([-10.1, 5, 5], sphere({ radius: dotRadius }));
  
  // Face 5 (back) - 5 dots (4 corners + center)
  const dot5a = translate([0, -10.1, 0], sphere({ radius: dotRadius }));
  const dot5b = translate([-5, -10.1, -5], sphere({ radius: dotRadius }));
  const dot5c = translate([5, -10.1, -5], sphere({ radius: dotRadius }));
  const dot5d = translate([-5, -10.1, 5], sphere({ radius: dotRadius }));
  const dot5e = translate([5, -10.1, 5], sphere({ radius: dotRadius }));
  
  // Face 6 (bottom) - 6 dots in two rows
  const dot6a = translate([-5, -5, -10.1], sphere({ radius: dotRadius }));
  const dot6b = translate([0, -5, -10.1], sphere({ radius: dotRadius }));
  const dot6c = translate([5, -5, -10.1], sphere({ radius: dotRadius }));
  const dot6d = translate([-5, 5, -10.1], sphere({ radius: dotRadius }));
  const dot6e = translate([0, 5, -10.1], sphere({ radius: dotRadius }));
  const dot6f = translate([5, 5, -10.1], sphere({ radius: dotRadius }));

  // Combine all dots
  const allDots = union(
    dot1,
    dot2a, dot2b,
    dot3a, dot3b, dot3c,
    dot4a, dot4b, dot4c, dot4d,
    dot5a, dot5b, dot5c, dot5d, dot5e,
    dot6a, dot6b, dot6c, dot6d, dot6e, dot6f
  );

  // Subtract dots from the cube to create indentations
  return subtract(body, allDots);
}
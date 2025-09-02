// examples/keytag.js
//
// Simple key tag with a hole for keychain

function main() {
  const { circle, cylinder } = jscadModeling.primitives
  const { extrudeLinear } = jscadModeling.extrusions
  const { translate } = jscadModeling.transforms
  const { subtract, union } = jscadModeling.booleans

  // Parameters
  const tagRadius = 20
  const tagThickness = 3
  const holeRadius = 3
  const keyHoleOffset = tagRadius - holeRadius - 2 // from center to edge

  // Base tag - extrudeLinear creates from z=0 to z=height
  let tag = extrudeLinear({ height: tagThickness },
    circle({ radius: tagRadius, segments: 64 })
  )

  // Keychain hole at top - make sure it goes from below to above the tag
  const keyHole = translate([0, keyHoleOffset, tagThickness/2],
    cylinder({ height: tagThickness + 2, radius: holeRadius })
  )
  tag = subtract(tag, keyHole)

  // Create vector-based "R-" text
  const rDashText = createVectorRDash(tagThickness)
  tag = subtract(tag, rDashText)

  return tag
}

// Helper function to create "R-" using vector paths
function createVectorRDash(depth) {
  const { polygon } = jscadModeling.primitives
  const { extrudeLinear } = jscadModeling.extrusions
  const { translate } = jscadModeling.transforms
  const { union } = jscadModeling.booleans

  // Scale factor for the letter size
  const scale = 1.3
  
  // Letter R components
  // Main vertical stroke
  const verticalStroke = polygon({
    points: [
      [-3 * scale, -6 * scale],
      [-1 * scale, -6 * scale],
      [-1 * scale, 6 * scale],
      [-3 * scale, 6 * scale]
    ]
  })

  // Top horizontal stroke
  const topStroke = polygon({
    points: [
      [-1 * scale, 4 * scale],
      [3 * scale, 4 * scale],
      [3 * scale, 6 * scale],
      [-1 * scale, 6 * scale]
    ]
  })

  // Middle horizontal stroke
  const middleStroke = polygon({
    points: [
      [-1 * scale, 0 * scale],
      [2 * scale, 0 * scale],
      [2 * scale, 2 * scale],
      [-1 * scale, 2 * scale]
    ]
  })

  // Top right vertical stroke
  const topRightStroke = polygon({
    points: [
      [1 * scale, 2 * scale],
      [3 * scale, 2 * scale],
      [3 * scale, 4 * scale],
      [1 * scale, 4 * scale]
    ]
  })

  // Diagonal stroke (leg of R)
  const diagonalStroke = polygon({
    points: [
      [0 * scale, -2 * scale],
      [2 * scale, -6 * scale],
      [4 * scale, -6 * scale],
      [1 * scale, 0 * scale]
    ]
  })

  // Dash (hyphen) - positioned to the right of R
  const dashStroke = polygon({
    points: [
      [5 * scale, 0 * scale],
      [8 * scale, 0 * scale],
      [8 * scale, 2 * scale],
      [5 * scale, 2 * scale]
    ]
  })

  // Combine all strokes into 2D shape
  const rDash2D = union(
    verticalStroke,
    topStroke,
    middleStroke,
    topRightStroke,
    diagonalStroke,
    dashStroke
  )

  // Extrude to 3D and position
  const rDash3D = translate([0, 0, depth/2],
    extrudeLinear({ height: depth + 1 }, rDash2D)
  )

  return rDash3D
}

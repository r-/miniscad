// Bitbeam-style parametric beam
// Ported to MiniScad (JSCAD modeling)
// examples/bitbeam.js
function main() {
  const { cuboid, cylinder } = jscadModeling.primitives
  const { subtract, union } = jscadModeling.booleans
  const { translate, rotateX } = jscadModeling.transforms

  const n = 7          // number of beam segments
  const w = 8          // width of each cube section
  const pitch = 8      // distance between hole centers
  const hole_d = 4.9   // hole diameter
  const len = n * pitch

  // Base beam - use cuboid instead of cube for rectangular shapes
  let beam = cuboid({ size: [len, w, w] })

  // Z holes (top-down)
  let holesZ = []
  for (let i = 0; i < n; i++) {
    holesZ.push(
      translate([i * pitch + pitch / 2 - len/2, 0, 0],
        cylinder({ height: w + 0.6, radius: hole_d / 2 })
      )
    )
  }

  // Y holes (sideways) - use rotateX instead of rotate
  let holesY = []
  for (let i = 0; i < n; i++) {
    holesY.push(
      translate([i * pitch + pitch / 2 - len/2, 0, 0],
        rotateX(Math.PI/2,
          cylinder({ height: w + 0.6, radius: hole_d / 2 })
        )
      )
    )
  }

  // Final beam
  return subtract(beam, union(...holesZ, ...holesY))
}

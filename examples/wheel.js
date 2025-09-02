function main () {
  const { circle, rectangle } = jscadModeling.primitives
  const { extrudeLinear } = jscadModeling.extrusions
  const { rotate, translate } = jscadModeling.transforms
  const { subtract, union } = jscadModeling.booleans

  const numSpokes    = 8
  const outerRadius  = 40   // rim outside
  const rimThickness = 6    // rim ring width
  const hubOuter     = 10   // outer radius of hub ring
  const hubInner     = 4    // inner hole radius of hub
  const thickness    = 8    // extrusion thickness
  const spokeWidth   = 4    // thickness of each spoke

  // Outer rim ring
  const outerDisc = extrudeLinear({ height: thickness },
    circle({ radius: outerRadius, segments: 128 })
  )
  const innerDisc = extrudeLinear({ height: thickness+2 },
    circle({ radius: outerRadius - rimThickness, segments: 128 })
  )
  const rim = subtract(outerDisc, innerDisc)

  // Hub ring (outer hub minus inner hole)
  const hubOuterDisc = extrudeLinear({ height: thickness },
    circle({ radius: hubOuter, segments: 64 })
  )
  const hubInnerDisc = extrudeLinear({ height: thickness+2 },
    circle({ radius: hubInner, segments: 64 })
  )
  const hub = subtract(hubOuterDisc, hubInnerDisc)

  // Spokes
  const spokeLen = (outerRadius - rimThickness) - hubOuter
  const spoke2d = rectangle({ size: [spokeWidth, spokeLen] })
  const spokeBase = extrudeLinear({ height: thickness },
    translate([0, hubOuter + spokeLen/2], spoke2d)
  )

  let spokes = []
  for (let i = 0; i < numSpokes; i++) {
    const angle = (i * 2 * Math.PI) / numSpokes
    spokes.push(rotate([0, 0, angle], spokeBase))
  }

  // Final assembly
  return union([rim, hub, ...spokes])
}

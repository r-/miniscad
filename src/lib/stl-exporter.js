/**
 * ASCII STL Exporter for MiniScad
 * Converts JSCAD solids to ASCII STL format
 */

// Make exportAsciiSTL available globally
window.MiniScadSTL = {
  /**
   * Export solids to ASCII STL format
   * @param {Array} solids - Array of JSCAD solid objects
   * @returns {string} ASCII STL content
   */
  exportAsciiSTL: function(solids) {
    let stl = 'solid model\n';
    
    for (const solid of solids) {
      const polys = solid.polygons || [];
      
      for (const poly of polys) {
        if (poly.vertices && poly.vertices.length >= 3) {
          const normal = poly.plane && poly.plane.normal ? poly.plane.normal : [0, 0, 0];
          
          // Triangulate polygon by creating triangles from first vertex
          for (let i = 2; i < poly.vertices.length; i++) {
            const v0 = poly.vertices[0];
            const v1 = poly.vertices[i - 1];
            const v2 = poly.vertices[i];
            
            // Ensure vertices are valid arrays with 3 components
            if (v0 && v0.length >= 3 && v1 && v1.length >= 3 && v2 && v2.length >= 3) {
              stl += ` facet normal ${normal[0] || 0} ${normal[1] || 0} ${normal[2] || 0}\n`;
              stl += `  outer loop\n`;
              stl += `   vertex ${v0[0]} ${v0[1]} ${v0[2]}\n`;
              stl += `   vertex ${v1[0]} ${v1[1]} ${v1[2]}\n`;
              stl += `   vertex ${v2[0]} ${v2[1]} ${v2[2]}\n`;
              stl += `  endloop\n endfacet\n`;
            }
          }
        }
      }
    }
    
    stl += 'endsolid model\n';
    return stl;
  }
};
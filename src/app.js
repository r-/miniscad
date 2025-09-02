/**
 * MiniScad Main Application
 * Handles 3D viewer, code execution, and UI interactions
 */

// Global variables
let entities = [];
let solids = [];
let camera, render;
let distance = 150;
let azimuth = 0;
let elevation = 0;
let target = [0, 0, 0];

/**
 * Initialize the 3D viewer and camera
 */
function initViewer() {
  const { prepareRender, entitiesFromSolids, cameras, drawCommands } = jscadReglRenderer;
  const perspective = cameras.perspective;
  const canvas = document.getElementById('view');
  
  render = prepareRender({ glOptions: { canvas } });
  camera = { ...perspective.defaults };
  
  // Setup resize handler
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    canvas.width = w;
    canvas.height = h;
    perspective.setProjection(camera, camera, { width: w, height: h });
    perspective.update(camera, camera);
  }
  
  window.addEventListener('resize', resize);
  resize();
  
  updateCamera();
  setupMouseControls(canvas);
  startRenderLoop();
}

/**
 * Update camera position based on current angles and distance
 */
function updateCamera() {
  const x = target[0] + distance * Math.cos(elevation) * Math.cos(azimuth);
  const y = target[1] + distance * Math.cos(elevation) * Math.sin(azimuth);
  const z = target[2] + distance * Math.sin(elevation);
  
  camera.position = [x, y, z];
  camera.target = target;
  
  const { cameras } = jscadReglRenderer;
  cameras.perspective.update(camera, camera);
}

/**
 * Setup mouse controls for camera manipulation
 */
function setupMouseControls(canvas) {
  let down = false;
  let last = null;
  
  canvas.onpointerdown = (e) => {
    down = true;
    last = [e.clientX, e.clientY];
    canvas.setPointerCapture(e.pointerId);
  };
  
  canvas.onpointerup = (e) => {
    down = false;
    canvas.releasePointerCapture(e.pointerId);
  };
  
  canvas.onpointermove = (e) => {
    if (!down) return;
    
    const dx = e.clientX - last[0];
    const dy = e.clientY - last[1];
    
    if (e.shiftKey) {
      // Pan mode
      target[0] -= dx * 0.5;
      target[1] += dy * 0.5;
    } else {
      // Rotate mode
      azimuth += dx * 0.01;
      elevation += dy * 0.01;
      elevation = Math.max(-Math.PI/2 + 0.01, Math.min(Math.PI/2 - 0.01, elevation));
    }
    
    updateCamera();
    last = [e.clientX, e.clientY];
  };
  
  // Zoom with mouse wheel
  canvas.addEventListener('wheel', (e) => {
    distance *= (1 + e.deltaY * 0.001);
    distance = Math.max(10, Math.min(1000, distance));
    updateCamera();
    e.preventDefault();
  }, { passive: false });
}

/**
 * Start the render loop
 */
function startRenderLoop() {
  const { drawCommands } = jscadReglRenderer;
  
  function loop() {
    render({
      camera,
      drawCommands: {
        drawAxis: drawCommands.drawAxis,
        drawGrid: drawCommands.drawGrid,
        drawMesh: drawCommands.drawMesh,
        drawLines: drawCommands.drawLines
      },
      entities
    });
    requestAnimationFrame(loop);
  }
  
  loop();
}

/**
 * Setup console panel for logging
 */
function setupConsole() {
  const consoleDiv = document.getElementById('console');
  
  function logToPanel(...args) {
    const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    consoleDiv.textContent += msg + "\n";
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  }
  
  // Override console methods to also log to panel
  const origLog = console.log;
  const origErr = console.error;
  
  console.log = (...args) => {
    origLog(...args);
    logToPanel(...args);
  };
  
  console.error = (...args) => {
    origErr(...args);
    logToPanel("ERROR:", ...args);
  };
}

/**
 * Execute the code in the editor
 */
function runCode() {
  const consoleDiv = document.getElementById('console');
  const { entitiesFromSolids } = jscadReglRenderer;
  
  // Clear console
  consoleDiv.textContent = "";
  
  const src = document.getElementById('code').value;
  
  try {
    // Create a function that has access to jscadModeling and returns the main function
    const mod = new Function('jscadModeling', src + '; return (typeof main === "function" ? main : () => [])');
    const mainFn = mod(jscadModeling);
    
    // Execute the main function and get solids
    solids = [].concat(mainFn());
    console.log("Generated", solids.length, "solids");
    
    // Create entities for rendering
    entities = [
      { visuals: { drawCmd: 'drawGrid', show: true }, size: [400, 400], ticks: [25, 5] },
      { visuals: { drawCmd: 'drawAxis', show: true }, size: 200 },
      ...entitiesFromSolids({}, solids)
    ];
  } catch (err) {
    console.error(err);
  }
}

/**
 * Setup file upload functionality
 */
function setupFileUpload() {
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  
  uploadBtn.onclick = () => fileInput.click();
  
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById('code').value = ev.target.result;
      runCode();
    };
    reader.readAsText(file);
  };
}

/**
 * Setup STL export functionality
 */
function setupSTLExport() {
  const exportBtn = document.getElementById('exportBtn');
  
  exportBtn.onclick = () => {
    if (!solids.length) {
      alert("No solids to export.");
      return;
    }
    
    const stl = MiniScadSTL.exportAsciiSTL(solids);
    const blob = new Blob([stl], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model.stl';
    a.click();
    
    URL.revokeObjectURL(url);
  };
}

/**
 * Initialize the application
 */
function initApp() {
  // Wait for JSCAD libraries to load
  if (typeof jscadReglRenderer === 'undefined' || typeof jscadModeling === 'undefined') {
    setTimeout(initApp, 100);
    return;
  }
  
  initViewer();
  setupConsole();
  setupFileUpload();
  setupSTLExport();
  
  // Setup run button
  document.getElementById('run').onclick = runCode;
  
  // Run initial code
  runCode();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
// The Diamond — Stage 1: the geometric object (Roadmap v3.1, Part IV.1).
//
// Shells 1–4 as translucent spheres, the X / Y / Z reference axes, the
// bipyramid skin built as the convex hull of its six landmarks, and the
// nine Class-H landmarks as labelled points. Orbital camera only, centred
// on BEING (Containment Note §A.3.1). Neutral colour; read-only.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { SHELLS, LANDMARKS, CAMERA, AXIS_EXTENT } from './constants.js';

const stage = document.getElementById('stage');

if (!webglAvailable()) {
  stage.hidden = true;
  document.getElementById('fallback').hidden = false;
} else {
  init();
}

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function init() {
  const BG = 0xf1f1f1;
  const INK = 0x1c1e22;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Renderers ────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(BG, 1);
  stage.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'labels';
  stage.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();

  // ── Camera: Z is vertical (Obliteration and Death above) ─────────────
  const camera = new THREE.PerspectiveCamera(80, 1, 0.002, 50);
  camera.up.set(0, 0, 1);
  setSpherical(camera.position, CAMERA.maxDistance, THREE.MathUtils.degToRad(-58), THREE.MathUtils.degToRad(16));
  scene.add(camera);

  // Light travels with the camera so the shading reads the same from any side.
  scene.add(new THREE.AmbientLight(0xffffff, 1.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-0.5, 0.8, 1);
  camera.add(key);

  const controls = new OrbitControls(camera, stage);
  controls.target.set(0, 0, 0);             // BEING is always screen-centre
  controls.enablePan = false;               // the focal point never moves
  controls.enableDamping = !reducedMotion;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.8;
  controls.minDistance = CAMERA.minDistance; // never inside Zone 1; BEING non-passable
  controls.maxDistance = CAMERA.maxDistance; // never beyond Shell 5
  controls.minPolarAngle = 0.02;
  controls.maxPolarAngle = Math.PI - 0.02;
  controls.update();

  // Draw order for nested translucent surfaces: far halves outer → inner,
  // then the solid interior (hull, axes), then near halves inner → outer.
  const ORDER = { back: (n) => 5 - n, hull: 5, axes: 6, front: (n) => 6 + n };

  // ── Shells 1–4 (Spec §5). Shell 5 is the zoom horizon, not drawn. ────
  for (const { n, radius } of SHELLS.filter((s) => s.n <= 4)) {
    const geometry = new THREE.SphereGeometry(radius, 128, 96);
    const back = new THREE.Mesh(geometry, shellMaterial(THREE.BackSide));
    const front = new THREE.Mesh(geometry, shellMaterial(THREE.FrontSide));
    back.renderOrder = ORDER.back(n);
    front.renderOrder = ORDER.front(n);
    scene.add(back, front);
  }

  // ── Bipyramid skin: convex hull of the six landmarks (Spec §6.22) ────
  const hullPoints = LANDMARKS.filter((l) => l.hull).map((l) => new THREE.Vector3(...l.pos));
  const hullGeometry = new ConvexGeometry(hullPoints);
  const hull = new THREE.Mesh(
    hullGeometry,
    new THREE.MeshLambertMaterial({
      color: 0xa9adb4,
      transparent: true,
      opacity: 0.11,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  hull.renderOrder = ORDER.hull;
  const hullEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(hullGeometry, 1),
    new THREE.LineBasicMaterial({ color: 0x3f4248, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  hullEdges.renderOrder = ORDER.hull;
  scene.add(hull, hullEdges);

  // ── Axes: numerical reference lines, labelled X / Y / Z only ─────────
  const E = AXIS_EXTENT;
  const axes = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-E, 0, 0), new THREE.Vector3(E, 0, 0),
      new THREE.Vector3(0, -E, 0), new THREE.Vector3(0, E, 0),
      new THREE.Vector3(0, 0, -E), new THREE.Vector3(0, 0, E),
    ]),
    new THREE.LineBasicMaterial({ color: 0x6c7077, transparent: true, opacity: 0.5, depthWrite: false }),
  );
  axes.renderOrder = ORDER.axes;
  scene.add(axes);
  for (const [text, dir] of [['X', [1, 0, 0]], ['Y', [0, 1, 0]], ['Z', [0, 0, 1]]]) {
    // Axis letters sit left of the axis end; landmark names sit right of
    // their points, so "Z" and "Death" never collide.
    const label = makeLabel(text, 'label label--axis');
    label.center.set(1, 0.5);
    label.position.set(...dir).multiplyScalar(E);
    scene.add(label);
  }

  // ── The nine Class-H landmarks (Spec §3.1–§3.2) ──────────────────────
  const markerGeometry = new THREE.SphereGeometry(1, 32, 16);
  const inkMaterial = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.55, metalness: 0 });
  // Stage 1 is colour-neutral (Roadmap IV.1). BEING is set apart by a
  // larger marker and a heavier label, not by colour.
  const landmarks = LANDMARKS.map((l) => {
    const isBeing = l.slug === 'being';
    const marker = new THREE.Mesh(markerGeometry, inkMaterial);
    marker.position.set(...l.pos);
    const label = makeLabel(l.name, isBeing ? 'label label--being' : 'label');
    label.position.copy(marker.position);
    scene.add(marker, label);
    return { marker, label, isBeing, px: isBeing ? 5.5 : 4, width: 0, flipped: false };
  });
  // Label widths are measured lazily, once each element is in the page,
  // and re-measured after a resize or once the web font has loaded.
  const remeasureLabels = () => landmarks.forEach((l) => { l.width = 0; });
  document.fonts?.ready.then(remeasureLabels);

  // ── Keyboard: arrows orbit, + / − zoom ───────────────────────────────
  stage.tabIndex = 0;
  stage.addEventListener('keydown', (event) => {
    const step = THREE.MathUtils.degToRad(5);
    const r = camera.position.length();
    let azimuth = Math.atan2(camera.position.y, camera.position.x);
    let elevation = Math.asin(camera.position.z / r);
    let radius = r;
    switch (event.key) {
      case 'ArrowLeft': azimuth -= step; break;
      case 'ArrowRight': azimuth += step; break;
      case 'ArrowUp': elevation += step; break;
      case 'ArrowDown': elevation -= step; break;
      case '+': case '=': radius *= 0.9; break;
      case '-': case '_': radius *= 1.1; break;
      default: return;
    }
    event.preventDefault();
    const limit = Math.PI / 2 - controls.minPolarAngle;
    elevation = THREE.MathUtils.clamp(elevation, -limit, limit);
    radius = THREE.MathUtils.clamp(radius, controls.minDistance, controls.maxDistance);
    setSpherical(camera.position, radius, azimuth, elevation);
    controls.update();
  });

  // ── Layout ───────────────────────────────────────────────────────────
  // The shorter side of the viewport spans 80°, so Shell 4 fits in full at
  // the outer zoom limit. On narrow portrait screens the vertical angle is
  // capped at 100° to avoid strong distortion at the top and bottom.
  const BASE_FOV = 80;
  const MAX_FOV = 100;
  function resize() {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const aspect = width / height;
    camera.aspect = aspect;
    camera.fov = aspect >= 1
      ? BASE_FOV
      : Math.min(MAX_FOV, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2)) / aspect)));
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
    remeasureLabels();
  }
  window.addEventListener('resize', resize);
  resize();

  // ── Frame loop ───────────────────────────────────────────────────────
  const toCamera = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  renderer.setAnimationLoop(() => {
    controls.update();

    // Markers keep a constant on-screen size; labels on the far side of
    // BEING dim so front and back stay distinguishable.
    const pxToWorld = (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / stage.clientHeight;
    toCamera.copy(camera.position).normalize();
    const width = stage.clientWidth;
    for (const entry of landmarks) {
      const { marker, label, isBeing, px } = entry;
      marker.scale.setScalar(camera.position.distanceTo(marker.position) * pxToWorld * px);
      // "Behind" = more than ~110° from the view direction as seen from BEING.
      const far = !isBeing && marker.position.dot(toCamera) < -0.35 * marker.position.length();
      label.element.style.opacity = far ? '0.42' : '1';
      // A label that would run off the right edge moves to the left of its point.
      if (!entry.width && label.element.isConnected) entry.width = label.element.offsetWidth;
      ndc.copy(marker.position).project(camera);
      const flip = ((ndc.x + 1) / 2) * width + entry.width > width - 4;
      if (flip !== entry.flipped) {
        entry.flipped = flip;
        label.center.set(flip ? 1 : 0, 0.5);
        label.element.classList.toggle('label--flipped', flip);
      }
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  });
}

// Translucent shell: faint body, stronger rim, gentle lighting.
function shellMaterial(side) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0x5c6068) },
      uBase: { value: 0.004 },
      uRim: { value: 0.17 },
      uLight: { value: new THREE.Vector3(-0.5, 0.8, 1).normalize() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uBase;
      uniform float uRim;
      uniform vec3 uLight;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec3 n = normalize(vNormal);
        if (!gl_FrontFacing) n = -n;
        float rim = pow(1.0 - abs(dot(n, normalize(vView))), 3.4);
        float lit = 0.78 + 0.22 * max(dot(n, uLight), 0.0);
        gl_FragColor = vec4(uColor * lit, uBase + uRim * rim);
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    side,
  });
}

function makeLabel(text, className) {
  const element = document.createElement('div');
  element.className = className;
  element.textContent = text;
  const label = new CSS2DObject(element);
  label.center.set(0, 0.5); // label starts just right of its point
  return label;
}

// Spherical position about BEING with Z as the vertical axis.
function setSpherical(target, radius, azimuth, elevation) {
  const c = Math.cos(elevation);
  return target.set(radius * c * Math.cos(azimuth), radius * c * Math.sin(azimuth), radius * Math.sin(elevation));
}

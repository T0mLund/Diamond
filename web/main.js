// The Diamond — the geometric object and its two perspectives.
//
// Roadmap v3.1 Part IV (Stages 1 and 2) and Containment Note Appendix A:
// Shells 1–3 as translucent spheres, the X / Y / Z reference axes, the
// bipyramid skin built as the convex hull of its six landmarks, and the
// nine Class-H landmarks. One navigation, two perspectives keyed to
// Shell 1: outside it the camera orbits BEING (§A.3.1); inside it the
// viewer looks through BEING as an aperture (§A.3.2). The model opens as
// the prototype's horn torus, which opens into the diamond on the first
// click (torus.js). Faint dots on the shells show them turning with it.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { SHELLS, DRAWN_SHELLS, LANDMARKS, AXIS_EXTENT, CAMERA, APERTURE } from './constants.js';
import { buildOpening } from './torus.js';

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
  const { degToRad, radToDeg, clamp, smoothstep, lerp } = THREE.MathUtils;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const porthole = document.getElementById('porthole');
  const rim = document.getElementById('rim');
  const caption = document.getElementById('caption');
  const hint = document.getElementById('hint');
  // A read-only state line for testing, shown only with #debug in the URL.
  // #debug&p=0.4 holds the opening at that progress, for screenshots.
  const params = new URLSearchParams(location.hash.slice(1));
  const debug = params.has('debug') ? document.body.appendChild(document.createElement('pre')) : null;
  if (debug) debug.className = 'debug';
  const hold = debug && params.has('p') ? clamp(Number(params.get('p')) || 0, 0, 1) : null;

  // ── Renderers ────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xf1f1f1, 1);
  stage.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'labels';
  stage.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();

  // ── Camera: Z is vertical (Obliteration and Death above) ─────────────
  // From any point on Shell 5, Birth and Death are 90° apart (they are the
  // ends of its diameter). A fixed 104° vertical field keeps both in view
  // at the outer zoom limit whenever the camera is near the equator.
  const ORBIT_FOV = 104;
  const MAX_FOV = 150;
  const REST = { azimuth: degToRad(-42), elevation: degToRad(8), distance: CAMERA.maxDistance };
  const camera = new THREE.PerspectiveCamera(ORBIT_FOV, 1, 0.001, 50);
  camera.up.set(0, 0, 1);
  setSpherical(camera.position, REST.distance, REST.azimuth, REST.elevation);
  scene.add(camera);

  const controls = new OrbitControls(camera, stage);
  controls.target.set(0, 0, 0);             // BEING is always screen-centre
  controls.enablePan = false;               // the focal point never moves
  controls.enableDamping = !reducedMotion;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 2.4;
  controls.minDistance = CAMERA.minDistance; // BEING is approached, never passed
  controls.maxDistance = CAMERA.maxDistance; // never beyond Shell 5
  controls.minPolarAngle = 0.2;             // never on Death or Birth
  controls.maxPolarAngle = Math.PI - 0.2;
  controls.enabled = false;                 // until the torus has unfolded
  controls.update();

  // Draw order for nested translucent surfaces: far halves outer → inner,
  // then the solid interior, then near halves inner → outer.
  const ORDER = { back: (n) => 4 - n, hull: 4, lines: 5, front: (n) => 5 + n };

  // ── Shells 1–3 (Spec §5) ─────────────────────────────────────────────
  const shells = SHELLS.filter((s) => DRAWN_SHELLS.includes(s.n)).map(({ n, radius }) => {
    const geometry = new THREE.SphereGeometry(radius, 128, 96);
    const back = new THREE.Mesh(geometry, shellMaterial(THREE.BackSide));
    const front = new THREE.Mesh(geometry, shellMaterial(THREE.FrontSide));
    back.renderOrder = ORDER.back(n);
    front.renderOrder = ORDER.front(n);
    // A faint, even scatter of dots fixed to the surface, so the sphere is
    // seen to turn with the diamond (user request 2026-10-14). About 64 dots
    // per unit area on every shell.
    const dots = new THREE.Points(dotGeometry(radius, Math.round(64 * 4 * Math.PI * radius * radius)), dotMaterial());
    dots.renderOrder = ORDER.lines;
    scene.add(back, front, dots);
    return { n, materials: [back.material, front.material], dots };
  });

  // ── Bipyramid skin: convex hull of the six landmarks (Spec §6.22) ────
  const hullLandmarks = LANDMARKS.filter((l) => l.hull);
  const hullGeometry = new ConvexGeometry(hullLandmarks.map((l) => new THREE.Vector3(...l.pos)));
  const hullMaterial = new THREE.MeshLambertMaterial({
    color: 0xa9adb4, transparent: true, opacity: 0.11, side: THREE.DoubleSide, depthWrite: false,
  });
  const hull = new THREE.Mesh(hullGeometry, hullMaterial);
  hull.renderOrder = ORDER.hull;
  const hullEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(hullGeometry, 1),
    new THREE.LineBasicMaterial({ color: 0x3f4248, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  hullEdges.renderOrder = ORDER.lines;
  scene.add(hull, hullEdges);

  scene.add(new THREE.AmbientLight(0xffffff, 1.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-0.5, 0.8, 1);
  camera.add(key);

  // ── The opening: the torus opens into the diamond ────────────────────
  // Its twelve edges coincide with the hull's edges once it has opened, so
  // the hull edges are shown at rest and the moving edges only before.
  const equator = hullLandmarks.filter((l) => l.pos[2] === 0);
  const apexHeight = Math.max(...hullLandmarks.map((l) => l.pos[2]));
  const GOLD = new THREE.Color(0xc8951a);
  const INK = new THREE.Color(0x383c44);
  const morph = buildOpening({
    equatorRadius: Math.hypot(equator[0].pos[0], equator[0].pos[1]),
    apexHeight,
    equatorAzimuths: equator.map((l) => Math.atan2(l.pos[1], l.pos[0])),
  });
  morph.edges.renderOrder = ORDER.lines;
  morph.grid.renderOrder = ORDER.lines;
  scene.add(morph.edges, morph.grid);

  // ── Axes: X and Y end at their landmarks; Z runs to Birth and Death ──
  // The Z axis is drawn on its own: in the opening it is the line the
  // torus's hole fuses into, and it grows out to Birth and Death.
  const axesMaterial = new THREE.LineBasicMaterial({ color: 0x6c7077, transparent: true, opacity: 0.5, depthWrite: false });
  const axes = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-AXIS_EXTENT.x, 0, 0), new THREE.Vector3(AXIS_EXTENT.x, 0, 0),
      new THREE.Vector3(0, -AXIS_EXTENT.y, 0), new THREE.Vector3(0, AXIS_EXTENT.y, 0),
    ]),
    axesMaterial,
  );
  const zMaterial = axesMaterial.clone();
  const zAxis = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -AXIS_EXTENT.z), new THREE.Vector3(0, 0, AXIS_EXTENT.z)]),
    zMaterial,
  );
  zAxis.frustumCulled = false;
  axes.renderOrder = ORDER.lines;
  zAxis.renderOrder = ORDER.lines;
  scene.add(axes, zAxis);
  const setZExtent = (L) => {
    const p = zAxis.geometry.attributes.position;
    p.setZ(0, -L);
    p.setZ(1, L);
    p.needsUpdate = true;
  };

  // ── The nine Class-H landmarks (Spec §3.1–§3.2) ──────────────────────
  // Each marker is a dot inside its label, so it stays round at any angle
  // of view. BEING is the luminous gold point.
  const landmarks = LANDMARKS.map((l) => {
    const isBeing = l.slug === 'being';
    const element = document.createElement('div');
    element.className = isBeing ? 'lm lm--being' : 'lm';
    const dot = document.createElement('span');
    dot.className = 'lm__dot';
    const name = document.createElement('span');
    name.className = 'lm__name';
    name.textContent = l.name;
    element.append(dot, name);
    const label = new CSS2DObject(element);
    label.center.set(0, 0.5);               // the dot sits on the point; the name runs right
    label.position.set(...l.pos);
    scene.add(label);
    return { slug: l.slug, label, element, isBeing, position: label.position, width: 0, flipped: false, opacity: -1 };
  });
  // Label widths are measured lazily and re-measured after a resize or
  // once the web font has loaded.
  const remeasureLabels = () => landmarks.forEach((l) => { l.width = 0; });
  document.fonts?.ready.then(remeasureLabels);

  // ── Opening: the torus opens into the diamond ───────────────────────
  // The tumble keeps the prototype's timings: yaw 0.18 rad/s and a slower
  // pitch swing of ±0.55 rad. Opening progress p runs 0 → 1 over 3.6 s in
  // two overlapping stages: closing (a) and stretching (b).
  const OPEN_SECONDS = reducedMotion ? 0.6 : 3.6;
  const stagesOf = (p) => ({
    a: smoothstep(p, 0, 0.4),
    b: smoothstep(p, 0.33, 1),
  });
  let phase = 'intro';                      // intro → unfolding → live
  let progress = 0;
  let introTime = 0;
  let unfold = null;
  morph.set(0, 0);

  function introPose(t) {
    const azimuth = REST.azimuth + 0.18 * t;
    const elevation = REST.elevation + 0.55 * Math.sin(0.07 * t);
    return { azimuth, elevation };
  }

  function beginUnfold() {
    if (phase !== 'intro') return;
    phase = 'unfolding';
    hint.classList.remove('is-visible');
    const r = camera.position.length();
    const from = {
      azimuth: Math.atan2(camera.position.y, camera.position.x),
      elevation: Math.asin(camera.position.z / r),
    };
    // Shortest way round to the rest azimuth.
    let delta = (REST.azimuth - from.azimuth) % (2 * Math.PI);
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    unfold = { t: 0, duration: OPEN_SECONDS, from, delta };
  }
  if (hold !== null) beginUnfold();

  stage.addEventListener('click', beginUnfold);
  stage.addEventListener('keydown', (event) => {
    if (phase === 'intro' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      beginUnfold();
    }
  });
  setTimeout(() => { if (phase === 'intro') hint.classList.add('is-visible'); }, 900);

  // ── Keyboard: arrows orbit, + / − zoom ───────────────────────────────
  stage.tabIndex = 0;
  stage.addEventListener('keydown', (event) => {
    if (phase !== 'live') return;
    const step = degToRad(5);
    const r = camera.position.length();
    let azimuth = Math.atan2(camera.position.y, camera.position.x);
    let elevation = Math.asin(camera.position.z / r);
    let radius = r;
    switch (event.key) {
      case 'ArrowLeft': azimuth -= step; break;
      case 'ArrowRight': azimuth += step; break;
      case 'ArrowUp': elevation += step; break;
      case 'ArrowDown': elevation -= step; break;
      case '+': case '=': radius *= 0.85; break;
      case '-': case '_': radius /= 0.85; break;
      default: return;
    }
    event.preventDefault();
    const limit = Math.PI / 2 - controls.minPolarAngle;
    elevation = clamp(elevation, -limit, limit);
    radius = clamp(radius, controls.minDistance, controls.maxDistance);
    setSpherical(camera.position, radius, azimuth, elevation);
    controls.update();
  });

  // Safari reports trackpad pinches as gesture events, not wheel events.
  // Touch pinches are left to the orbit controls.
  let touches = 0;
  let gestureFrom = 0;
  stage.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') touches++; });
  const release = (e) => { if (e.pointerType === 'touch') touches = Math.max(0, touches - 1); };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('gesturestart', (e) => { e.preventDefault(); gestureFrom = camera.position.length(); });
  stage.addEventListener('gesturechange', (e) => {
    e.preventDefault();
    if (touches > 0 || phase !== 'live' || !e.scale) return;
    camera.position.setLength(clamp(gestureFrom / e.scale, controls.minDistance, controls.maxDistance));
    controls.update();
  });

  // First interaction after the unfold hides the orbit hint.
  const dismissHint = () => { if (phase === 'live') hint.classList.remove('is-visible'); };
  stage.addEventListener('pointerdown', dismissHint);
  stage.addEventListener('wheel', dismissHint, { passive: true });

  // ── Layout ───────────────────────────────────────────────────────────
  let width = 1;
  let height = 1;
  function resize() {
    width = stage.clientWidth;
    height = stage.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
    remeasureLabels();
  }
  window.addEventListener('resize', resize);
  resize();

  // Vertical field of view whose shorter side spans 2·half.
  const fovForShortSide = (half) => {
    const aspect = width / height;
    const t = Math.tan(half);
    return radToDeg(2 * Math.atan(aspect >= 1 ? t : t / aspect));
  };

  // ── Frame loop ───────────────────────────────────────────────────────
  let last = performance.now();
  const toCamera = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  let inside = false;      // inside Shell 1: looking through BEING
  let coneMix = 0;         // 0 = orbit, 1 = cone; eased across the threshold
  let lastRim = -1;

  renderer.setAnimationLoop(() => {
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    if (phase === 'intro') {
      if (!reducedMotion) introTime += dt;
      const pose = introPose(introTime);
      setSpherical(camera.position, REST.distance, pose.azimuth, pose.elevation);
      camera.lookAt(controls.target);
    } else if (phase === 'unfolding') {
      unfold.t = hold !== null ? hold * unfold.duration : unfold.t + dt;
      const k = Math.min(1, unfold.t / unfold.duration);
      const e = k * k * (3 - 2 * k);
      progress = k;
      setSpherical(
        camera.position,
        REST.distance,
        unfold.from.azimuth + unfold.delta * e,
        lerp(unfold.from.elevation, REST.elevation, e),
      );
      camera.lookAt(controls.target);
      if (k >= 1 && hold === null) {
        phase = 'live';
        progress = 1;
        controls.enabled = true;
        controls.update();
        stage.classList.add('is-live');
        hint.textContent = 'Drag to turn. Scroll or pinch to zoom in through BEING.';
        hint.classList.add('is-visible');
        setTimeout(() => hint.classList.remove('is-visible'), 7000);
      }
    } else {
      controls.update();
    }
    const { a, b } = stagesOf(progress);
    morph.set(a, b);

    // The fused line grows from the torus's height out to Birth and Death,
    // ahead of the apices it draws out (torus.js).
    const lineEnd = lerp(morph.torusHeight, AXIS_EXTENT.z, b);
    const apexEnd = lerp(morph.torusHeight, apexHeight, b);
    setZExtent(lineEnd);

    // §A.3.3 — the regime flips when the camera is inside Shell 1 and flips
    // back once it is outside again. The camera pose is continuous across
    // the flip; the porthole and the field of view ease in over 0.9 s.
    const d = camera.position.length();
    if (!inside && d < CAMERA.threshold * 0.985) inside = true;
    else if (inside && d > CAMERA.threshold) inside = false;
    coneMix = clamp(coneMix + (inside ? 1 : -1) * dt / (reducedMotion ? 0.15 : 0.9), 0, 1);
    const cone = coneMix * coneMix * (3 - 2 * coneMix);

    // §A.3.2 — cone half-angle through an aperture of radius APERTURE at
    // depth d: wide when close, narrow when far. The field of view widens
    // with it, up to a cap, so the whole cone stays on screen.
    const theta = Math.atan(APERTURE / d);
    const coneFov = clamp(fovForShortSide(Math.min(theta + degToRad(5), degToRad(68))), ORBIT_FOV, MAX_FOV);
    // The torus is wider than the diamond; narrow screens widen the view
    // to fit it, then ease back as it unfolds.
    const introFov = clamp(fovForShortSide(degToRad(43)), ORBIT_FOV, MAX_FOV);
    const baseFov = phase === 'intro' ? introFov : phase === 'unfolding' ? lerp(introFov, ORBIT_FOV, b) : ORBIT_FOV;
    const fov = lerp(baseFov, coneFov, cone);
    if (Math.abs(fov - camera.fov) > 1e-3) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    const focal = (height / 2) / Math.tan(degToRad(fov / 2));
    const offscreen = Math.hypot(width, height) / 2 + 24;
    const rimRadius = lerp(offscreen, focal * Math.tan(theta), cone);
    if (Math.abs(rimRadius - lastRim) > 0.25) {
      lastRim = rimRadius;
      porthole.style.setProperty('--r', `${rimRadius.toFixed(1)}px`);
      rim.style.setProperty('--r', `${rimRadius.toFixed(1)}px`);
    }
    porthole.style.opacity = cone > 0.001 ? '1' : '0';
    rim.style.opacity = String(cone);
    caption.classList.toggle('is-visible', inside && cone > 0.5);
    stage.classList.toggle('is-inside', inside);

    // The opening's fades. The gold leaves the torus as it closes and
    // gathers in BEING at the middle of the fused line; Birth and Death
    // appear as the line starts to grow; the rest arrives as it settles.
    const shellsIn = smoothstep(b, 0.75, 1);
    const appear = {
      being: smoothstep(a, 0.6, 1),
      birth: smoothstep(b, 0, 0.15),
      death: smoothstep(b, 0, 0.15),
      obliteration: smoothstep(b, 0.6, 0.9),
      awakening: smoothstep(b, 0.6, 0.9),
    };
    const equatorIn = smoothstep(b, 0.8, 1);
    const gridOpacity = 0.65 * (1 - smoothstep(b, 0.5, 1));
    morph.grid.visible = gridOpacity > 0.003;
    morph.gridMaterial.opacity = gridOpacity;
    morph.gridMaterial.color.lerpColors(GOLD, INK, smoothstep(b, 0, 0.7));
    zMaterial.opacity = 0.5 * smoothstep(a, 0.5, 1);
    axesMaterial.opacity = 0.5 * equatorIn;
    hullMaterial.opacity = 0.11 * smoothstep(b, 0.7, 1);
    hullEdges.visible = b >= 1;
    morph.edges.visible = b < 1;
    morph.edgeMaterial.opacity = 0.55 * smoothstep(b, 0.4, 0.9);

    // Shells read stronger from afar and lighter close up. Their dots are
    // dimmer on the far side, except from inside, where all are far.
    const nearness = smoothstep(d, CAMERA.threshold, CAMERA.maxDistance);
    for (const shell of shells) {
      const rimStrength = 0.17 * (0.6 + 0.4 * nearness) * shellsIn;
      for (const m of shell.materials) m.uniforms.uRim.value = rimStrength;
      const u = shell.dots.material.uniforms;
      u.uOpacity.value = 0.22 * shellsIn;
      u.uInside.value = cone;
      u.uSize.value = 2 * renderer.getPixelRatio();
      shell.dots.visible = shellsIn > 0.003;
    }

    // Labels: far side dims; a label that would run past the right edge (or
    // the rim, inside) moves to the left of its point; BEING becomes the
    // aperture inside.
    toCamera.copy(camera.position).normalize();
    for (const entry of landmarks) {
      const { slug, label, element, isBeing, position } = entry;
      if (slug === 'death' || slug === 'obliteration') position.z = slug === 'death' ? lineEnd : apexEnd;
      if (slug === 'birth' || slug === 'awakening') position.z = slug === 'birth' ? -lineEnd : -apexEnd;
      const shown = appear[slug] ?? equatorIn;
      ndc.copy(position).project(camera);
      const px = ((ndc.x + 1) / 2) * width;
      const py = ((1 - ndc.y) / 2) * height;
      const outsideView = cone > 0.5 && Math.hypot(px - width / 2, py - height / 2) > rimRadius - 2;
      let opacity;
      if (isBeing) {
        opacity = shown * (1 - cone);
      } else {
        const far = position.dot(toCamera) < -0.35 * position.length();
        opacity = outsideView ? 0 : shown * (far && cone < 0.5 ? 0.42 : 1);
      }
      opacity = Math.round(opacity * 100) / 100;
      if (opacity !== entry.opacity) {
        entry.opacity = opacity;
        element.style.opacity = String(opacity);
        element.style.visibility = opacity > 0 ? 'visible' : 'hidden';
      }
      if (!entry.width && element.isConnected) entry.width = element.offsetWidth;
      // The name must end before the screen edge, or inside the view, before the rim.
      let right = width - 4;
      if (cone > 0.5) right = Math.min(right, width / 2 + Math.sqrt(Math.max(0, rimRadius ** 2 - (py - height / 2) ** 2)) - 6);
      const flip = px + entry.width > right;
      if (flip !== entry.flipped) {
        entry.flipped = flip;
        label.center.set(flip ? 1 : 0, 0.5);
        element.classList.toggle('lm--flipped', flip);
      }
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    if (debug) debug.textContent = JSON.stringify({ phase, p: +progress.toFixed(3), d: +d.toFixed(4), fov: +fov.toFixed(1), inside, cone: +cone.toFixed(2) });
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

// An even scatter of n points on a sphere (a Fibonacci lattice).
function dotGeometry(radius, n) {
  const positions = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const z = 1 - (2 * (i + 0.5)) / n;
    const rho = Math.sqrt(1 - z * z);
    const lon = i * golden;
    positions.set([radius * rho * Math.cos(lon), radius * rho * Math.sin(lon), radius * z], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

// Small round dots of constant screen size. Dots on the far half of a
// sphere are dimmer, which lets its turning read as rotation; from inside
// (uInside = 1) every dot is on the far half, so the dimming is lifted.
function dotMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0x3f4248) },
      uOpacity: { value: 0 },
      uSize: { value: 2 },
      uInside: { value: 0 },
    },
    vertexShader: /* glsl */ `
      uniform float uSize;
      varying float vFacing;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vFacing = dot(normalize(normalMatrix * position), normalize(-mv.xyz));
        gl_PointSize = uSize;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uInside;
      varying float vFacing;
      void main() {
        float r = length(gl_PointCoord - 0.5);
        if (r > 0.5) discard;
        float side = mix(0.45, 1.0, smoothstep(-0.15, 0.15, vFacing));
        float a = uOpacity * mix(side, 1.0, uInside) * smoothstep(0.5, 0.25, r);
        gl_FragColor = vec4(uColor, a);
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
  });
}

// Spherical position about BEING with Z as the vertical axis.
function setSpherical(target, radius, azimuth, elevation) {
  const c = Math.cos(elevation);
  return target.set(radius * c * Math.cos(azimuth), radius * c * Math.sin(azimuth), radius * Math.sin(elevation));
}

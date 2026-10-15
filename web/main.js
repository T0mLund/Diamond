// The Diamond — the geometric object and its two perspectives.
//
// Roadmap v3.3 Part IV (Stages 1 and 2) and Containment Note Appendix A:
// Shells 1–3 as translucent spheres, the X / Y / Z reference axes, the
// bipyramid skin built as the convex hull of its six landmarks, the seven
// Class-H landmarks and the two limits, Birth and Death. One navigation,
// two perspectives keyed to Shell 1: outside it the camera orbits BEING
// (§A.3.1); zooming in past Shell 1 carries the eye into BEING, from
// where it looks out as a light cone that fills the screen (cone.js;
// Containment Note §A.3.2–§A.3.3 as revised in v3.2 and v3.3; the limits
// are not seen from there). The model opens as the
// prototype's horn torus, which opens into the diamond on the first click
// (torus.js); dragging tilts and turns the torus. Zooming out stops at
// level 0; a second zoom-out folds the diamond back into the torus, level
// −1, and zooming in unfolds it again (v3.4). Dots on the shells show them
// turning. Outside, the axis points are named by zoom level and dim behind
// the spheres, and at level 0 Indra's net surrounds the model; from BEING,
// the name of the region in view replaces them (label-rules.js,
// focus-labels.js; Containment Note §A.3.1–§A.3.2 as revised in v3.4).

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { SHELLS, DRAWN_SHELLS, LANDMARKS, AXIS_EXTENT, CAMERA, CONE, shellRadius } from './constants.js';
import { ZONE_NAMES, labelReveal, opaqueWeight, netWeight, shellTransmission, LEVEL_DISTANCE } from './label-rules.js';
import { buildFocusLabels } from './focus-labels.js';
import { buildOpening } from './torus.js';
import { buildCone } from './cone.js';

const stage = document.getElementById('stage');

// Dots on the shells: a little darker and larger than in v3.3, and drawn
// larger the nearer they are, so the turning reads clearly (user request
// 2026-10-15).
const DOT_OPACITY = 0.4;
const DOT_SIZE = 2.4;                       // pixels at three units away

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
  const caption = document.getElementById('caption');
  const hint = document.getElementById('hint');
  const angleReadout = document.getElementById('cone-angle');
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
  renderer.autoClear = false;
  stage.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'labels';
  stage.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();

  // ── Camera: Z is vertical (Obliteration and Death above) ─────────────
  // A fixed 104° vertical field keeps Birth and Death in view, with room
  // above and below, at zoom level 0 whenever the camera is near the
  // equator.
  const ORBIT_FOV = 104;
  const MAX_FOV = 150;          // for the opening torus on narrow screens
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
  controls.minDistance = CAMERA.minDistance; // just past Shell 1, where the eye enters BEING
  controls.maxDistance = CAMERA.maxDistance; // zoom level 0, a stop (see the gestures below)
  controls.minPolarAngle = 0.2;             // never on Death or Birth
  controls.maxPolarAngle = Math.PI - 0.2;
  controls.enabled = false;                 // until the torus has unfolded
  controls.update();

  // Draw order for nested translucent surfaces: far halves outer → inner,
  // then the solid interior, then near halves inner → outer.
  const ORDER = { back: (n) => 4 - n, hull: 4, lines: 5, front: (n) => 5 + n };
  const DRAWN_RADII = DRAWN_SHELLS.map(shellRadius);

  // ── Shells 1–3 (Spec §5) ─────────────────────────────────────────────
  const shells = SHELLS.filter((s) => DRAWN_SHELLS.includes(s.n)).map(({ n, radius }) => {
    const geometry = new THREE.SphereGeometry(radius, 128, 96);
    const back = new THREE.Mesh(geometry, shellMaterial(THREE.BackSide));
    const front = new THREE.Mesh(geometry, shellMaterial(THREE.FrontSide));
    back.renderOrder = ORDER.back(n);
    front.renderOrder = ORDER.front(n);
    // An even scatter of dots fixed to the surface, so the sphere is seen
    // to turn with the diamond (user request 2026-10-14; made clearer in
    // v3.4, above all from inside). About 64 dots per unit area on every
    // shell; nearer dots are drawn larger.
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

  // ── The view from BEING (cone.js) ────────────────────────────────────
  const cone = buildCone({ hullGeometry, shellDots: shells.map((s) => s.dots.geometry) });
  const focus = buildFocusLabels(stage);

  // ── Zoom level 0: an opaque diamond in a slightly translucent sphere ──
  // User decision 2026-10-15 (revised the same day). It is drawn in its own
  // pass and blended over the translucent model, so the change at level 1
  // is a plain crossfade. The sphere lets 18% through, so the diamond's
  // middle shows faintly inside it.
  const solid = new THREE.Scene();
  const solidSphere = new THREE.Mesh(
    new THREE.SphereGeometry(shellRadius(3), 128, 96),
    new THREE.MeshLambertMaterial({ color: 0xd3d5d9, transparent: true, opacity: 0.82, depthWrite: false }),
  );
  solidSphere.renderOrder = 2;
  const solidHull = new THREE.Mesh(
    hullGeometry,
    new THREE.MeshLambertMaterial({ color: 0xbfc2c8, flatShading: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }),
  );
  const solidEdges = new THREE.LineSegments(new THREE.EdgesGeometry(hullGeometry, 1), new THREE.LineBasicMaterial({ color: 0x3f4248, transparent: true, opacity: 0.55 }));
  const solidAxis = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -AXIS_EXTENT.z), new THREE.Vector3(0, 0, AXIS_EXTENT.z)]),
    new THREE.LineBasicMaterial({ color: 0x6c7077, transparent: true, opacity: 0.5 }),
  );
  solidEdges.renderOrder = 1;
  solidAxis.renderOrder = 1;
  const solidDots = new THREE.Points(shells[shells.length - 1].dots.geometry, dotMaterial());
  solidDots.scale.setScalar(1.004);
  solidDots.renderOrder = 3;
  const solidKey = new THREE.DirectionalLight(0xffffff, 1.5);
  solid.add(solidSphere, solidHull, solidEdges, solidAxis, solidDots, new THREE.AmbientLight(0xffffff, 1.55), solidKey, solidKey.target);
  const solidTarget = new THREE.WebGLRenderTarget(1, 1, { samples: 4 });
  // The target is cleared to transparent, so the background is never
  // drawn twice; the body is composited with premultiplied alpha.
  const solidQuad = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: { map: { value: solidTarget.texture }, uOpacity: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
      fragmentShader: `uniform sampler2D map; uniform float uOpacity; varying vec2 vUv;
        void main() {
          vec4 t = texture2D(map, vUv);
          gl_FragColor = vec4(t.a > 0.0 ? t.rgb / t.a : vec3(0.0), 1.0);
          #include <colorspace_fragment>
          gl_FragColor = vec4(gl_FragColor.rgb * t.a, t.a) * uOpacity;
        }`,
      transparent: true, depthTest: false, depthWrite: false,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    }),
  );
  solidQuad.frustumCulled = false;
  const solidScreen = new THREE.Scene();
  solidScreen.add(solidQuad);
  const keyLocal = new THREE.Vector3(-0.5, 0.8, 1);

  // ── Indra's net (zoom level 0; user decision 2026-10-15) ─────────────
  // Faint solid copies of the bipyramid on a spacious cube grid, fixed to
  // the model's frame, so they turn with it, and receding until they merge
  // with the background. Copies close to the eye are faded too, so the
  // frame's edges stay quiet. The nearest copies are NET.spacing from BEING:
  // more than twice the farthest camera distance, so none can come between
  // the eye and the diamond. The net has gone by the distance at which
  // BEING begins to appear (label-rules.js). What the copies stand for is
  // left open (user, 2026-10-15).
  const NET = { spacing: 9, reach: 7 };
  const netCells = [];
  for (let i = -NET.reach; i <= NET.reach; i++) {
    for (let j = -NET.reach; j <= NET.reach; j++) {
      for (let k = -NET.reach; k <= NET.reach; k++) {
        if ((i || j || k) && Math.hypot(i, j, k) <= NET.reach + 0.5) netCells.push([i, j, k]);
      }
    }
  }
  const netMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xbfc2c8) },
      uBackground: { value: new THREE.Color(0xf1f1f1) },
      uLight: { value: new THREE.Vector3() },
      uWeight: { value: 0 },
      uReach: { value: NET.spacing * NET.reach },
    },
    vertexShader: /* glsl */ `
      uniform float uReach;
      varying vec3 vNormal;
      varying float vFade;
      void main() {
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vec4 mv = viewMatrix * world;
        vNormal = normal;
        float dist = length(mv.xyz);
        vFade = smoothstep(8.0, 20.0, dist) * exp(-dist / 30.0) * (1.0 - smoothstep(0.7 * uReach, uReach, dist));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform vec3 uBackground;
      uniform vec3 uLight;
      uniform float uWeight;
      varying vec3 vNormal;
      varying float vFade;
      void main() {
        float lit = 0.74 + 0.26 * max(dot(normalize(vNormal), uLight), 0.0);
        gl_FragColor = vec4(mix(uBackground, uColor * lit, 0.4 * vFade * uWeight), 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  const net = new THREE.InstancedMesh(hullGeometry, netMaterial, netCells.length);
  const cell = new THREE.Matrix4();
  netCells.forEach(([i, j, k], n) => net.setMatrixAt(n, cell.makeTranslation(i * NET.spacing, j * NET.spacing, k * NET.spacing)));
  net.frustumCulled = false;
  const netScene = new THREE.Scene();
  netScene.add(net);
  const netCamera = new THREE.PerspectiveCamera(ORBIT_FOV, 1, 1, NET.spacing * (NET.reach + 2) * 1.8);
  netCamera.up.set(0, 0, 1);

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

  // ── The seven Class-H landmarks and the two limits (Spec §3.1–§3.2) ───
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
    return { slug: l.slug, label, element, isBeing, limit: !!l.limit, position: label.position, width: 0, flipped: false, opacity: -1 };
  });
  // The axis points of the X and Z axes, where each axis meets the sphere
  // that bounds its zone (Zone 1 on Shell 1, Zone 2 on Shell 2, Zone 3 on
  // Shell 3; Love and Hate are the landmarks there). User decisions
  // 2026-10-15: visible from the third-person view, which shows axis
  // points only, never the combined region names. They are Class T
  // labels, so they carry an open ring rather than a landmark's dot.
  ZONE_NAMES.forEach((names, i) => {
    const r = shellRadius(i + 1);
    const points = [[names.x[0], [-r, 0, 0]], [names.x[1], [r, 0, 0]], [names.z[0], [0, 0, -r]], [names.z[1], [0, 0, r]]];
    for (const [title, pos] of points) {
      if (i === 2 && pos[2] === 0) continue;   // Hate and Love are landmarks
      const element = document.createElement('div');
      element.className = 'lm lm--point';
      const dot = document.createElement('span');
      dot.className = 'lm__dot';
      const name = document.createElement('span');
      name.className = 'lm__name';
      name.textContent = title;
      element.append(dot, name);
      const label = new CSS2DObject(element);
      label.center.set(0, 0.5);
      label.position.set(...pos);
      scene.add(label);
      landmarks.push({ slug: title.toLowerCase(), label, element, isBeing: false, limit: false, pointLabel: true, position: label.position, width: 0, flipped: false, opacity: -1 });
    }
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
  // intro (the torus, level −1) → unfolding → live. From live, a second
  // zoom-out folds the diamond back (folding) to the torus (intro); zooming
  // in unfolds it again. The fold follows the zoom back and forth, in place
  // of the prototype's τ slider (user decision 2026-10-15).
  let phase = 'intro';
  let progress = 0;
  let introTime = 0;
  let unfold = null;
  morph.set(0, 0);
  const OPEN_HINT = 'Drag to turn. Click, tap or zoom in to open.';
  const TILT = 1.35;                        // the farthest the torus tilts, in radians
  const turn = { azimuth: 0, elevation: 0 }; // the user's own turning of the torus
  const pose = { azimuth: REST.azimuth, elevation: REST.elevation }; // the camera while folding

  function introPose(t) {
    const azimuth = REST.azimuth + 0.18 * t + turn.azimuth;
    const elevation = clamp(REST.elevation + 0.55 * Math.sin(0.07 * t) + turn.elevation, -TILT, TILT);
    return { azimuth, elevation };
  }
  const cameraPose = () => {
    const r = camera.position.length();
    return { azimuth: Math.atan2(camera.position.y, camera.position.x), elevation: Math.asin(camera.position.z / r) };
  };

  // Plays the rest of the opening: from the torus, or from wherever a fold
  // was left, to the diamond at zoom level 0.
  function beginUnfold() {
    if (phase !== 'intro' && phase !== 'folding') return;
    const fromTorus = phase === 'intro';
    phase = 'unfolding';
    hint.classList.remove('is-visible');
    const from = cameraPose();
    // From the torus the camera returns to its rest position, the shortest
    // way round; from a fold it stays where it is.
    let delta = fromTorus ? (REST.azimuth - from.azimuth) % (2 * Math.PI) : 0;
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    const to = fromTorus ? REST.elevation : from.elevation;
    unfold = { t: progress * OPEN_SECONDS, duration: OPEN_SECONDS, from, delta, to, k0: progress };
  }
  if (hold !== null) beginUnfold();

  function showHint(text, ms, top = false) {
    hint.textContent = text;
    hint.classList.toggle('is-top', top);
    hint.classList.add('is-visible');
    clearTimeout(showHint.timer);
    if (ms) showHint.timer = setTimeout(() => hint.classList.remove('is-visible'), ms);
  }

  // At level 0 a zoom-out gesture begins to fold the diamond.
  function beginFold() {
    phase = 'folding';
    controls.enabled = false;
    Object.assign(pose, cameraPose());
    hint.classList.remove('is-visible');
  }
  // The fold follows the zoom: dp < 0 folds toward the torus, dp > 0 opens.
  function scrubFold(dp) {
    if (phase === 'intro') {
      if (dp <= 0) return;
      phase = 'folding';
      Object.assign(pose, cameraPose());
      hint.classList.remove('is-visible');
    }
    if (phase !== 'folding') return;
    progress = clamp(progress + dp, 0, 1);
    if (progress >= 1) {
      // Back at level 0, a stop: the rest of this gesture does nothing.
      phase = 'live';
      controls.update();
      controls.enabled = !gesture.active;
    } else if (progress <= 0) {
      // Level −1: the torus turns and swings again from where it is.
      phase = 'intro';
      const p = pose;
      turn.azimuth = p.azimuth - REST.azimuth - 0.18 * introTime;
      turn.elevation = p.elevation - REST.elevation - 0.55 * Math.sin(0.07 * introTime);
      showHint(OPEN_HINT, 6000);
    }
  }

  // A zoom gesture is one continuous scroll (it ends once 350 ms and at
  // least two frames pass without a wheel event, so a slow device does not
  // split it), one pinch, or one key press. Zooming out stops at level 0; only
  // a gesture that begins there, and begins by zooming out, folds the
  // diamond toward level −1 (user decision 2026-10-15).
  const gesture = { active: false, fromRest: false, kind: '', last: 0, quiet: 0 };
  const atRest = () => phase === 'live' && view === 'orbit' && camera.position.length() >= CAMERA.maxDistance * 0.995;
  function gestureStart() {
    gesture.active = true;
    gesture.fromRest = atRest();
    gesture.kind = '';
  }
  function gestureEnd() {
    gesture.active = false;
    gesture.kind = '';
    if (phase === 'live' && view === 'orbit') controls.enabled = true;
  }
  // out > 0 zooms out; one unit is the whole fold.
  function zoomGesture(out) {
    if (phase === 'live') {
      if (view !== 'orbit') return;
      if (out < 0) { gesture.fromRest = false; return; }
      if (!gesture.fromRest || !atRest()) return;
      beginFold();
    }
    if (phase === 'folding' || phase === 'intro') scrubFold(-out);
  }

  // Dragging turns the torus, and the model while it folds. A drag is not
  // a click, so it does not open the torus.
  const DRAG_SPEED = 0.008;
  let dragged = false;
  let dragFrom = null;
  function turnFolded(dx, dy) {
    if (phase === 'intro') {
      turn.azimuth -= dx * DRAG_SPEED;
      turn.elevation = clamp(turn.elevation + dy * DRAG_SPEED, -TILT - 0.6, TILT + 0.6);
    } else if (phase === 'folding') {
      pose.azimuth -= dx * DRAG_SPEED;
      pose.elevation = clamp(pose.elevation + dy * DRAG_SPEED, -MAX_ELEVATION, MAX_ELEVATION);
    }
  }

  stage.addEventListener('click', () => {
    if (dragged) { dragged = false; return; }
    beginUnfold();
  });
  stage.addEventListener('keydown', (event) => {
    if ((phase === 'intro' || phase === 'folding') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      beginUnfold();
    }
  });
  setTimeout(() => { if (phase === 'intro') showHint(OPEN_HINT); }, 900);

  // ── The view from BEING: entering, looking, leaving ──────────────────
  // orbit → entering → inside → leaving → orbit. Zooming in past Shell 1
  // flies the eye into BEING along its line of sight; it keeps facing the
  // way it was travelling. Widening the cone past its widest flies it back
  // out along the same line.
  let view = 'orbit';
  let flight = null;
  const look = { yaw: 0, pitch: 0 };
  let coneAngle = CONE.maxAngle;
  let excess = 0;                           // zoom-out beyond the widest cone
  let insideHintShown = false;
  const forward = new THREE.Vector3();
  const basis = new THREE.Matrix4();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3();
  const back = new THREE.Vector3();
  const MAX_ELEVATION = Math.PI / 2 - controls.minPolarAngle;

  // Line of sight from yaw and pitch. Right depends on yaw alone, so the
  // view stays upright and well defined when looking straight up or down.
  function setForward(yaw, pitch) {
    return forward.set(Math.cos(pitch) * Math.cos(yaw), Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch));
  }
  function faceAlong(yaw, pitch) {
    setForward(yaw, pitch);
    right.set(Math.sin(yaw), -Math.cos(yaw), 0);
    up.crossVectors(right, forward);
    back.copy(forward).negate();
    basis.makeBasis(right, up, back);
    camera.quaternion.setFromRotationMatrix(basis);
  }

  // The cone on entry matches the outside view's scale at screen centre.
  const entryAngle = () => clamp(
    radToDeg(2 * (Math.max(width, height) / height) * Math.tan(degToRad(ORBIT_FOV / 2))),
    CONE.minAngle, CONE.maxAngle,
  );

  function enterBeing() {
    view = 'entering';
    controls.enabled = false;
    forward.copy(camera.position).negate().normalize();
    look.yaw = Math.atan2(forward.y, forward.x);
    look.pitch = Math.asin(clamp(forward.z, -1, 1));
    flight = { t: 0, from: camera.position.clone() };
    coneAngle = entryAngle();
    excess = 0;
    pointers.clear();
    hint.classList.remove('is-visible');
  }

  function leaveBeing() {
    view = 'leaving';
    flight = { t: 0, pitchFrom: look.pitch, pitchTo: clamp(look.pitch, -MAX_ELEVATION, MAX_ELEVATION) };
    pointers.clear();
    hint.classList.remove('is-visible');
  }

  function zoomCone(factor) {
    if (view !== 'inside') return;
    if (factor > 1 && coneAngle >= CONE.maxAngle - 1e-6) {
      excess += Math.log(factor);
      if (excess > 0.3) leaveBeing();
      return;
    }
    excess = 0;
    coneAngle = clamp(coneAngle * factor, CONE.minAngle, CONE.maxAngle);
  }

  function turnBy(dx, dy) {
    // One pixel of drag moves the view by one pixel's worth of angle, so
    // what is under the pointer stays under it near the centre.
    const perPixel = degToRad(coneAngle) / Math.max(width, height);
    look.yaw += dx * perPixel;
    look.pitch = clamp(look.pitch + dy * perPixel, -Math.PI / 2, Math.PI / 2);
  }

  // Pointer: one finger or the mouse pans and tilts; two fingers pinch.
  // Outside, the orbit controls turn and zoom the model; these handlers
  // only turn the torus and the folding model, and follow pinches so that
  // a pinch out at level 0 can fold the diamond.
  const pointers = new Map();
  let pinchFrom = 0;
  const pinchDistance = () => {
    const [p, q] = [...pointers.values()];
    return Math.hypot(p.x - q.x, p.y - q.y);
  };
  const outside = () => view === 'orbit' && phase !== 'unfolding';
  stage.addEventListener('pointerdown', (e) => {
    if (view !== 'inside' && !outside()) return;
    if (e.pointerType === 'mouse') pointers.clear();
    if (view === 'inside' || phase !== 'live') stage.setPointerCapture?.(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) { dragFrom = { x: e.clientX, y: e.clientY }; dragged = false; }
    if (pointers.size === 2) {
      pinchFrom = pinchDistance();
      dragged = true;
      if (outside()) { gestureStart(); gesture.kind = 'pinch'; }
    }
  });
  stage.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    const prev = pointers.get(e.pointerId);
    const next = { x: e.clientX, y: e.clientY };
    pointers.set(e.pointerId, next);
    if (view === 'inside') {
      if (pointers.size === 1) {
        turnBy(next.x - prev.x, next.y - prev.y);
      } else if (pointers.size === 2) {
        const d = pinchDistance();
        if (pinchFrom > 0 && d > 0) zoomCone(pinchFrom / d);
        pinchFrom = d;
      }
    } else if (outside()) {
      if (pointers.size === 1 && phase !== 'live') {
        if (dragFrom && Math.hypot(next.x - dragFrom.x, next.y - dragFrom.y) > 6) dragged = true;
        turnFolded(next.x - prev.x, next.y - prev.y);
      } else if (pointers.size === 2) {
        const d = pinchDistance();
        if (pinchFrom > 0 && d > 0) zoomGesture(Math.log(pinchFrom / d) * 1.6);
        pinchFrom = d;
      }
    }
  });
  const endPointer = (e) => {
    pointers.delete(e.pointerId);
    pinchFrom = pointers.size === 2 ? pinchDistance() : 0;
    if (pointers.size === 0 && gesture.kind === 'pinch') gestureEnd();
  };
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);

  stage.addEventListener('wheel', (e) => {
    const lines = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? height : 1;
    const delta = clamp(e.deltaY * lines, -200, 200);
    if (view === 'inside') {
      e.preventDefault();
      zoomCone(Math.exp(delta * 0.0012));
      return;
    }
    if (!outside()) return;
    if (phase !== 'live') e.preventDefault();
    if (gesture.kind !== 'wheel') { gestureStart(); gesture.kind = 'wheel'; }
    gesture.last = performance.now();
    gesture.quiet = 0;
    zoomGesture(delta / 600);
  }, { passive: false });

  // ── Keyboard: arrows orbit or look, + / − zoom ───────────────────────
  stage.tabIndex = 0;
  const zoomKey = (key) => (key === '+' || key === '=' ? -1 : key === '-' || key === '_' ? 1 : 0);
  stage.addEventListener('keydown', (event) => {
    const step = degToRad(5);
    const zoom = zoomKey(event.key);              // +1 zooms out
    if (zoom && !event.repeat && outside()) { gestureStart(); gesture.kind = 'key'; }
    if (phase === 'intro' || phase === 'folding') {
      const turnStep = step / DRAG_SPEED;
      switch (event.key) {
        case 'ArrowLeft': turnFolded(turnStep, 0); break;
        case 'ArrowRight': turnFolded(-turnStep, 0); break;
        case 'ArrowUp': turnFolded(0, turnStep); break;
        case 'ArrowDown': turnFolded(0, -turnStep); break;
        default:
          if (!zoom) return;
          zoomGesture(zoom * 0.2);
      }
      event.preventDefault();
      return;
    }
    if (phase !== 'live') return;
    if (view === 'orbit' && zoom) {
      zoomGesture(zoom * 0.2);
      if (phase !== 'live' || !controls.enabled) { event.preventDefault(); return; }
    }
    if (view === 'inside') {
      switch (event.key) {
        case 'ArrowLeft': look.yaw += step; break;
        case 'ArrowRight': look.yaw -= step; break;
        case 'ArrowUp': look.pitch = clamp(look.pitch + step, -Math.PI / 2, Math.PI / 2); break;
        case 'ArrowDown': look.pitch = clamp(look.pitch - step, -Math.PI / 2, Math.PI / 2); break;
        case '+': case '=': zoomCone(0.85); break;
        case '-': case '_': zoomCone(1 / 0.85); break;
        default: return;
      }
      event.preventDefault();
      return;
    }
    if (view !== 'orbit') return;
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
    elevation = clamp(elevation, -MAX_ELEVATION, MAX_ELEVATION);
    radius = clamp(radius, controls.minDistance, controls.maxDistance);
    setSpherical(camera.position, radius, azimuth, elevation);
    controls.update();
  });
  stage.addEventListener('keyup', (event) => {
    if (zoomKey(event.key) && gesture.kind === 'key') gestureEnd();
  });

  // Safari reports trackpad pinches as gesture events, not wheel events.
  // Touch pinches are left to the orbit controls (outside) or the pointer
  // handlers (inside).
  let touches = 0;
  let gestureFrom = 0;
  let gestureScale = 1;
  stage.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') touches++; });
  const release = (e) => { if (e.pointerType === 'touch') touches = Math.max(0, touches - 1); };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('gesturestart', (e) => {
    e.preventDefault();
    gestureFrom = view === 'inside' ? coneAngle : camera.position.length();
    gestureScale = 1;
    if (touches === 0 && outside()) { gestureStart(); gesture.kind = 'safari'; }
  });
  stage.addEventListener('gesturechange', (e) => {
    e.preventDefault();
    if (touches > 0 || !e.scale) return;
    if (outside()) {
      const out = Math.log(gestureScale / e.scale) * 1.6;
      gestureScale = e.scale;
      zoomGesture(out);
      if (phase !== 'live' || !controls.enabled) return;
      camera.position.setLength(clamp(gestureFrom / e.scale, controls.minDistance, controls.maxDistance));
      controls.update();
    } else if (phase === 'live' && view === 'inside') {
      zoomCone((gestureFrom / e.scale) / coneAngle);
    }
  });
  stage.addEventListener('gestureend', () => { if (gesture.kind === 'safari') gestureEnd(); });

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
    solidTarget.setSize(Math.round(width * renderer.getPixelRatio()), Math.round(height * renderer.getPixelRatio()));
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
  let lastAngleText = '';
  const bySlug = Object.fromEntries(landmarks.map((l) => [l.slug, l]));

  const foldHint = { armed: false, shown: false };
  renderer.setAnimationLoop(() => {
    if (gesture.kind === 'wheel' && ++gesture.quiet >= 2 && performance.now() - gesture.last > 350) gestureEnd();
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const ease = (t) => t * t * (3 - 2 * t);

    if (phase === 'intro') {
      if (!reducedMotion) introTime += dt;
      const pose = introPose(introTime);
      setSpherical(camera.position, REST.distance, pose.azimuth, pose.elevation);
      camera.lookAt(controls.target);
    } else if (phase === 'unfolding') {
      unfold.t = hold !== null ? hold * unfold.duration : unfold.t + dt;
      const k = Math.min(1, unfold.t / unfold.duration);
      const e0 = ease(unfold.k0);
      const e = unfold.k0 < 1 ? (ease(k) - e0) / (1 - e0) : 1;
      progress = k;
      setSpherical(
        camera.position,
        REST.distance,
        unfold.from.azimuth + unfold.delta * e,
        lerp(unfold.from.elevation, unfold.to, e),
      );
      camera.lookAt(controls.target);
      if (k >= 1 && hold === null) {
        phase = 'live';
        progress = 1;
        controls.enabled = true;
        controls.update();
        stage.classList.add('is-live');
        showHint('Drag to turn. Scroll or pinch to zoom in through BEING.', 7000);
      }
    } else if (phase === 'folding') {
      setSpherical(camera.position, REST.distance, pose.azimuth, pose.elevation);
      camera.lookAt(controls.target);
    } else if (view === 'orbit') {
      controls.update();
      const r = camera.position.length();
      if (r < CAMERA.threshold) enterBeing();
      // The first time a zoom out comes to rest at level 0, say how to go on.
      if (r < CAMERA.maxDistance * 0.97) foldHint.armed = true;
      if (foldHint.armed && !foldHint.shown && atRest()) {
        foldHint.shown = true;
        showHint('Zoom out again to fold the diamond back into the torus.', 5000);
      }
    }

    // The flights in and out, and looking from BEING.
    let mix = 0;                             // 0 = outside view, 1 = the cone
    if (phase === 'live' && view === 'entering') {
      flight.t = Math.min(1, flight.t + dt / (reducedMotion ? 0.2 : 0.9));
      camera.position.copy(flight.from).multiplyScalar(1 - ease(flight.t));
      faceAlong(look.yaw, look.pitch);
      mix = smoothstep(flight.t, 0.72, 1);
      if (flight.t >= 1) {
        view = 'inside';
        stage.classList.add('is-inside');
        if (!insideHintShown) {
          insideHintShown = true;
          hint.textContent = 'Drag to look around. Scroll or pinch to narrow or widen the cone; widen past its widest to step back out.';
          hint.classList.add('is-visible', 'is-top');
          setTimeout(() => { hint.classList.remove('is-visible'); }, 8000);
        }
      }
    }
    if (phase === 'live' && view === 'inside') {
      camera.position.set(0, 0, 0);
      faceAlong(look.yaw, look.pitch);
      mix = 1;
    }
    if (phase === 'live' && view === 'leaving') {
      flight.t = Math.min(1, flight.t + dt / (reducedMotion ? 0.2 : 0.9));
      look.pitch = lerp(flight.pitchFrom, flight.pitchTo, smoothstep(flight.t, 0, 0.3));
      faceAlong(look.yaw, look.pitch);
      camera.position.copy(forward).multiplyScalar(-CAMERA.exitDistance * ease(smoothstep(flight.t, 0.15, 1)));
      mix = 1 - smoothstep(flight.t, 0, 0.3);
      if (flight.t >= 1) {
        view = 'orbit';
        stage.classList.remove('is-inside');
        hint.classList.remove('is-top');
        controls.enabled = true;
        controls.update();
      }
    }

    const { a, b } = stagesOf(progress);
    morph.set(a, b);

    // The fused line grows from the torus's height out to Birth and Death,
    // ahead of the apices it draws out (torus.js).
    const lineEnd = lerp(morph.torusHeight, AXIS_EXTENT.z, b);
    const apexEnd = lerp(morph.torusHeight, apexHeight, b);
    setZExtent(lineEnd);

    // The outside view's field: the torus is wider than the diamond, so
    // narrow screens widen the view to fit it, then ease back as it opens.
    const introFov = clamp(fovForShortSide(degToRad(43)), ORBIT_FOV, MAX_FOV);
    const fov = phase === 'live' ? ORBIT_FOV : lerp(introFov, ORBIT_FOV, b);
    if (Math.abs(fov - camera.fov) > 1e-3) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    if (mix > 0) cone.setView(camera, coneAngle, width, height, mix, renderer.getPixelRatio());
    caption.classList.toggle('is-visible', mix > 0.5);
    const angleText = String(Math.round(coneAngle));
    if (angleText !== lastAngleText) {
      lastAngleText = angleText;
      angleReadout.textContent = angleText;
    }

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

    // Shells read stronger from afar and lighter close up.
    const d = camera.position.length();
    const nearness = smoothstep(d, CAMERA.threshold, CAMERA.maxDistance);
    const solidWeight = (view === 'orbit' ? opaqueWeight(d) : 0) * shellsIn;
    for (const shell of shells) {
      const rimStrength = 0.17 * (0.6 + 0.4 * nearness) * shellsIn;
      for (const m of shell.materials) m.uniforms.uRim.value = rimStrength;
      const u = shell.dots.material.uniforms;
      u.uOpacity.value = DOT_OPACITY * shellsIn;
      u.uSize.value = DOT_SIZE * renderer.getPixelRatio();
      shell.dots.visible = shellsIn > 0.003;
    }

    for (const entry of landmarks) {
      const { slug, position } = entry;
      if (slug === 'death' || slug === 'obliteration') position.z = slug === 'death' ? lineEnd : apexEnd;
      if (slug === 'birth' || slug === 'awakening') position.z = slug === 'birth' ? -lineEnd : -apexEnd;
    }

    if (mix < 0.5) {
      // Outside: labels follow the perspective camera; the far side dims;
      // a name that would run past the right edge moves to the left.
      // A name whose point is off screen is hidden; where two names would
      // collide, the one farther from the camera gives way.
      // Names appear by zoom level (user decision 2026-10-15) and dim by
      // the number of spheres they have turned behind.
      toCamera.copy(camera.position).normalize();
      const boxes = [];
      for (const entry of landmarks) {
        const { slug, isBeing, position } = entry;
        ndc.copy(position).project(camera);
        const px = ((ndc.x + 1) / 2) * width;
        const py = ((1 - ndc.y) / 2) * height;
        const onScreen = ndc.z < 1 && px > -2 && px < width + 2 && py > -2 && py < height + 2;
        const shown = onScreen ? (appear[slug] ?? equatorIn) * labelReveal(slug, d) : 0;
        let depth = 1;
        if (!isBeing) {
          const glass = shellTransmission(camera.position, position, DRAWN_RADII);
          const body = 1 - shellTransmission(camera.position, position, [shellRadius(3)]).layers;
          depth = lerp(glass.opacity, Math.max(0, body), solidWeight);
          entry.layers = glass.layers;
        }
        const flip = px + entry.width > width - 4;
        const near = position.dot(toCamera);
        boxes.push({ entry, px, py, flip, near, opacity: shown * depth * (1 - 2 * mix) });
      }
      for (const p of boxes) {
        for (const q of boxes) {
          if (p === q || p.opacity <= 0 || q.opacity <= 0 || p.near >= q.near) continue;
          const [p0, p1] = p.flip ? [p.px - p.entry.width, p.px] : [p.px, p.px + p.entry.width];
          const [q0, q1] = q.flip ? [q.px - q.entry.width, q.px] : [q.px, q.px + q.entry.width];
          if (Math.abs(p.py - q.py) < 14 && p0 < q1 + 4 && q0 < p1 + 4) p.opacity = 0;
        }
      }
      for (const box of boxes) setLabel(box.entry, box.opacity, box.flip);
      labelRenderer.render(scene, camera);
    } else {
      // From BEING: the eye is BEING, so its label is gone. Birth and Death
      // are limits and cannot be seen from the first person (user decision
      // 2026-10-15), so only Awakening and Obliteration show on the
      // vertical axis. Each other landmark sits at its direction in the cone.
      // The point labels give way to the focus labels (focus-labels.js):
      // the name of the region in view, and faint the next zone's names.
      for (const entry of landmarks) setLabel(entry, 0, entry.flipped);
    }
    focus.update({ cone, angle: coneAngle, forward: setForward(look.yaw, look.pitch).clone(), width, height, alpha: Math.max(0, 2 * mix - 1), dt, reducedMotion });

    renderer.clear();
    const netShown = view === 'orbit' ? netWeight(d) * shellsIn * (1 - mix) : 0;
    if (netShown > 0.003) {
      netCamera.position.copy(camera.position);
      netCamera.quaternion.copy(camera.quaternion);
      netCamera.fov = camera.fov;
      netCamera.aspect = camera.aspect;
      netCamera.updateProjectionMatrix();
      netMaterial.uniforms.uLight.value.copy(keyLocal).applyQuaternion(camera.quaternion).normalize();
      netMaterial.uniforms.uWeight.value = netShown;
      renderer.render(netScene, netCamera);
      renderer.clearDepth();
    }
    if (mix < 1) renderer.render(scene, camera);
    if (mix < 1 && solidWeight > 0.003) {
      solidKey.position.copy(keyLocal).applyQuaternion(camera.quaternion);
      solidDots.material.uniforms.uOpacity.value = DOT_OPACITY;
      solidDots.material.uniforms.uSize.value = DOT_SIZE * renderer.getPixelRatio();
      renderer.setRenderTarget(solidTarget);
      renderer.setClearColor(0x000000, 0);
      renderer.clear();
      renderer.render(solid, camera);
      renderer.setRenderTarget(null);
      renderer.setClearColor(0xf1f1f1, 1);
      solidQuad.material.uniforms.uOpacity.value = solidWeight * (1 - mix);
      renderer.render(solidScreen, cone.screen);
    }
    if (mix > 0) renderer.render(cone.scene, cone.screen);
    if (debug) {
      debug.textContent = JSON.stringify({
        phase, view, p: +progress.toFixed(3), d: +d.toFixed(4), fov: +fov.toFixed(1),
        cone: +coneAngle.toFixed(1), mix: +mix.toFixed(2), solid: +solidWeight.toFixed(2), net: +netShown.toFixed(2),
        level: phase === 'live' ? LEVEL_DISTANCE.filter((D) => d <= D + 1e-6).length - 1 : -1,
        az: +radToDeg(Math.atan2(camera.position.y, camera.position.x)).toFixed(1), el: +radToDeg(Math.asin(camera.position.z / d)).toFixed(1),
        zone: focus.element.dataset.zone, region: focus.element.dataset.region, name: focus.element.dataset.name,
        labels: Object.fromEntries(landmarks.filter((l) => l.opacity > 0).map((l) => [l.slug, l.opacity])),
        yaw: +radToDeg(look.yaw).toFixed(1), pitch: +radToDeg(look.pitch).toFixed(1),
      });
    }
  });

  function setLabel(entry, opacity, flip) {
    opacity = Math.round(clamp(opacity, 0, 1) * 100) / 100;
    if (opacity !== entry.opacity) {
      entry.opacity = opacity;
      entry.element.style.opacity = String(opacity);
      entry.element.style.visibility = opacity > 0 ? 'visible' : 'hidden';
    }
    if (!entry.width && entry.element.isConnected) entry.width = entry.element.offsetWidth;
    if (flip !== entry.flipped) {
      entry.flipped = flip;
      entry.label.center.set(flip ? 1 : 0, 0.5);
      entry.element.classList.toggle('lm--flipped', flip);
    }
  }
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
// sphere are dimmer, which lets its turning read as rotation.
// Seen from outside a sphere, its far side is dimmed; from inside it,
// every dot is near.
function dotMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0x3f4248) },
      uOpacity: { value: 0 },
      uSize: { value: DOT_SIZE },
    },
    vertexShader: /* glsl */ `
      uniform float uSize;
      varying float vFacing;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 centre = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        bool inside = length(centre) < length(mv.xyz - centre);
        vFacing = inside ? 1.0 : dot(normalize(normalMatrix * position), normalize(-mv.xyz));
        gl_PointSize = clamp(uSize * 3.0 / max(-mv.z, 0.05), uSize * 0.7, uSize * 2.4);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFacing;
      void main() {
        float r = length(gl_PointCoord - 0.5);
        if (r > 0.5) discard;
        float side = mix(0.45, 1.0, smoothstep(-0.15, 0.15, vFacing));
        float a = uOpacity * side * smoothstep(0.5, 0.25, r);
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

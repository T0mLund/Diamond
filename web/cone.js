// The Diamond — the view from BEING: a light cone that fills the screen.
//
// User decision 2026-10-14. Inside Shell 1 the eye is BEING itself, at the
// origin, looking outward. Dragging pans and tilts. Zooming changes only
// the cone's angle: narrowing it magnifies what lies inside, widening it
// takes in more of the model, up to 220° to mimic human vision. The cone
// always fills the screen.
//
// A camera lens cannot show more than 180°, so the cone is drawn with an
// equidistant projection: a direction's distance from the screen centre is
// proportional to its angle from the line of sight, and the screen's longer
// side spans the whole cone. Every vertex is projected from the origin in
// its vertex shader, so lines stay sharp at any magnification.
//
// Seen from the origin, only the bipyramid's faces and edges and the dots
// on the shells have extent: the axes pass through the eye, and every
// point of a shell lies at the same distance.

import * as THREE from 'three';

const PROJECT = /* glsl */ `
  uniform mat3 uView;     // world → view rotation; the line of sight is −Z
  uniform float uHalf;    // half the cone's angle, in radians
  uniform vec2 uScale;    // longer side / width, longer side / height
  varying float vAngle;
  vec4 coneProject(vec3 world) {
    vec3 d = normalize(uView * world);
    float angle = acos(clamp(-d.z, -1.0, 1.0));
    vAngle = angle;
    float r = length(d.xy);
    vec2 dir = r > 1e-6 ? d.xy / r : vec2(0.0);
    return vec4(dir * (angle / uHalf) * uScale, 0.0, 1.0);
  }
`;
const CLIP = /* glsl */ `
  uniform float uLimit;
  uniform float uMix;
  varying float vAngle;
`;

export function buildCone({ hullGeometry, shellDots }) {
  const uniforms = {
    uView: { value: new THREE.Matrix3() },
    uHalf: { value: 1 },
    uScale: { value: new THREE.Vector2(1, 1) },
    uLimit: { value: 2 },
    uMix: { value: 0 },
  };
  const scene = new THREE.Scene();
  const screen = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Background: covers the outside view as the cone fades in.
  const backdrop = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: { uMix: uniforms.uMix, uColor: { value: new THREE.Color(0xf1f1f1) } },
      vertexShader: 'void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }',
      fragmentShader: `uniform float uMix; uniform vec3 uColor;
        void main() { gl_FragColor = vec4(uColor, uMix);
        #include <colorspace_fragment>
        }`,
      transparent: true, depthTest: false, depthWrite: false,
    }),
  );
  backdrop.renderOrder = 0;

  // The bipyramid's faces, finely subdivided so the projection curves them.
  const faces = new THREE.Mesh(subdivideFaces(hullGeometry, 24), new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uColor: { value: new THREE.Color(0xa9adb4) }, uLight: { value: new THREE.Vector3(-0.5, 0.8, 1).normalize() } },
    vertexShader: PROJECT + `
      attribute vec3 faceNormal;
      varying float vLit;
      uniform vec3 uLight;
      void main() { vLit = 0.78 + 0.22 * max(dot(faceNormal, uLight), 0.0); gl_Position = coneProject(position); }`,
    fragmentShader: CLIP + `uniform vec3 uColor; varying float vLit;
      void main() { if (vAngle > uLimit) discard; gl_FragColor = vec4(uColor * vLit, 0.11 * uMix);
      #include <colorspace_fragment>
      }`,
    transparent: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide,
  }));
  faces.renderOrder = 1;

  // The twelve edges as curves.
  const edges = new THREE.LineSegments(subdivideEdges(hullGeometry, 96), new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uColor: { value: new THREE.Color(0x3f4248) } },
    vertexShader: PROJECT + 'void main() { gl_Position = coneProject(position); }',
    fragmentShader: CLIP + `uniform vec3 uColor;
      void main() { if (vAngle > uLimit) discard; gl_FragColor = vec4(uColor, 0.55 * uMix);
      #include <colorspace_fragment>
      }`,
    transparent: true, depthTest: false, depthWrite: false,
  }));
  edges.renderOrder = 2;

  // The shells' dots, the same points as in the outside view.
  const dotUniforms = { ...uniforms, uSize: { value: 2 }, uColor: { value: new THREE.Color(0x3f4248) } };
  const dots = shellDots.map((geometry) => {
    const points = new THREE.Points(geometry, new THREE.ShaderMaterial({
      uniforms: dotUniforms,
      vertexShader: PROJECT + 'uniform float uSize; void main() { gl_PointSize = uSize; gl_Position = coneProject(position); }',
      fragmentShader: CLIP + `uniform vec3 uColor;
        void main() {
          if (vAngle > uLimit) discard;
          float r = length(gl_PointCoord - 0.5);
          if (r > 0.5) discard;
          gl_FragColor = vec4(uColor, 0.22 * uMix * smoothstep(0.5, 0.25, r));
          #include <colorspace_fragment>
        }`,
      transparent: true, depthTest: false, depthWrite: false,
    }));
    points.renderOrder = 3;
    return points;
  });

  for (const object of [backdrop, faces, edges, ...dots]) {
    object.frustumCulled = false;
    scene.add(object);
  }

  // Shared with the label layer: the same projection, in pixels.
  const rotation = new THREE.Matrix4();
  const local = new THREE.Vector3();
  const state = { width: 1, height: 1, span: 1, half: 1 };
  const out = { x: 0, y: 0, angle: 0 };

  function setView(camera, angleDegrees, width, height, mix, pixelRatio) {
    camera.updateMatrixWorld();
    rotation.copy(camera.matrixWorld).invert();
    uniforms.uView.value.setFromMatrix4(rotation);
    state.width = width;
    state.height = height;
    state.span = Math.max(width, height);
    state.half = THREE.MathUtils.degToRad(angleDegrees / 2);
    uniforms.uHalf.value = state.half;
    uniforms.uScale.value.set(state.span / width, state.span / height);
    uniforms.uLimit.value = Math.min(state.half * 1.25 + 0.1, Math.PI - 0.08);
    uniforms.uMix.value = mix;
    dotUniforms.uSize.value = 2 * pixelRatio;
  }

  // Screen position of a direction from BEING, and its angle from the
  // line of sight.
  function project(position) {
    local.copy(position).normalize().applyMatrix3(uniforms.uView.value);
    const angle = Math.acos(THREE.MathUtils.clamp(-local.z, -1, 1));
    const r = Math.hypot(local.x, local.y);
    const k = ((state.span / 2) * angle) / state.half;
    out.x = state.width / 2 + (r > 1e-6 ? (local.x / r) * k : 0);
    out.y = state.height / 2 - (r > 1e-6 ? (local.y / r) * k : 0);
    out.angle = angle;
    return out;
  }

  return { scene, screen, setView, project };
}

// Each triangle split into n² smaller ones, carrying its face normal.
function subdivideFaces(source, n) {
  const geometry = source.index ? source.toNonIndexed() : source;
  const p = geometry.attributes.position;
  const positions = [];
  const normals = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const at = (i, j) => new THREE.Vector3()
    .addScaledVector(a, 1 - (i + j) / n)
    .addScaledVector(b, i / n)
    .addScaledVector(c, j / n);
  for (let t = 0; t < p.count; t += 3) {
    a.fromBufferAttribute(p, t);
    b.fromBufferAttribute(p, t + 1);
    c.fromBufferAttribute(p, t + 2);
    normal.subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a)).normalize();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i; j++) {
        const tri = [[at(i, j), at(i + 1, j), at(i, j + 1)]];
        if (i + j < n - 1) tri.push([at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)]);
        for (const vertices of tri) {
          for (const v of vertices) {
            positions.push(v.x, v.y, v.z);
            normals.push(normal.x, normal.y, normal.z);
          }
        }
      }
    }
  }
  const result = new THREE.BufferGeometry();
  result.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  result.setAttribute('faceNormal', new THREE.Float32BufferAttribute(normals, 3));
  return result;
}

// The hull's edges, each split into n segments.
function subdivideEdges(source, n) {
  const p = new THREE.EdgesGeometry(source, 1).attributes.position;
  const positions = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const u = new THREE.Vector3();
  const v = new THREE.Vector3();
  for (let e = 0; e < p.count; e += 2) {
    a.fromBufferAttribute(p, e);
    b.fromBufferAttribute(p, e + 1);
    for (let k = 0; k < n; k++) {
      u.lerpVectors(a, b, k / n);
      v.lerpVectors(a, b, (k + 1) / n);
      positions.push(u.x, u.y, u.z, v.x, v.y, v.z);
    }
  }
  const result = new THREE.BufferGeometry();
  result.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return result;
}

// The Diamond: orbit, cone-from-BEING and torus in one continuous movement.
// Based on The Diamond v3.4: https://github.com/T0mLund/Diamond
import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { shellRadius, LANDMARKS, AXIS_EXTENT, CAMERA } from './constants.js';
import { DIRECTIONS, closestDirection, compoundName, ZONE_NAMES, SPHERE_NAMES, shellLayerOpacity, labelReveal } from './label-rules.js';
import { buildOpening } from './torus.js';
import { buildCone } from './cone.js';
import { buildBeingLabels } from './being-labels.js';

const $ = (s) => document.querySelector(s);
const stage = $('#stage');
const { clamp, lerp, smoothstep, degToRad } = THREE.MathUtils;
const unit = (x) => clamp(x, 0, 1);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const R = [shellRadius(1), shellRadius(2), shellRadius(3)];
const MID = R.map((r, i) => (r + (R[i - 1] || 0)) / 2);
const CENTRE = 1.25, END = 3;
const BOUNDS = [-1, END];
// Opens as the torus (level −1), as before; #outside starts at the outside view for testing.
const START = location.hash.includes('outside') ? 0 : -1;
const state = { nav: START, target: START, orbitYaw: degToRad(-42), orbitPitch: degToRad(9), yawOffset: 0, pitchOffset: 0, route: null, mode: 'outside', gestures: 0, coneAngle: 220 };
const direction = new THREE.Vector3(), orbit = new THREE.Vector3(), forward = new THREE.Vector3(), v = new THREE.Vector3();
const routeDefault = DIRECTIONS.find((d) => d.id === '-1,-1,-1');
state.route = routeDefault;
const routeSelect = $('#route');
// Put familiar test routes first; all 26 display directions remain available.
const routeOrder = [...DIRECTIONS].sort((a,b) => {
  const priority = ['-1,-1,-1','1,0,0','0,0,-1','-1,0,0','0,0,1'];
  const x=priority.indexOf(a.id), y=priority.indexOf(b.id);
  return (x<0?99:x)-(y<0?99:y) || a.id.localeCompare(b.id);
});
for (const d of routeOrder) {
  const option=document.createElement('option'); option.value=d.id;
  option.textContent=compoundName(0,d.signs); routeSelect.append(option);
}
routeSelect.value=state.route.id;

let renderer;
try { renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'}); }
catch(e) { $('#fallback').hidden=false; throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setClearColor(0xf1f1f1,1);
renderer.sortObjects=true;renderer.autoClear=false;
stage.append(renderer.domElement);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(104,1,.001,120);
camera.up.set(0,0,1);
const labels=new CSS2DRenderer(); labels.domElement.className='labels'; stage.append(labels.domElement);
scene.add(new THREE.AmbientLight(0xffffff,1.7));
const light=new THREE.DirectionalLight(0xffffff,1.5); light.position.set(-.5,.8,1); scene.add(light);
const hullGeometry=new ConvexGeometry(LANDMARKS.filter(l=>l.hull).map(l=>new THREE.Vector3(...l.pos)));
const hullMaterial=new THREE.MeshLambertMaterial({color:0xbfc2c8,transparent:true,opacity:.85,side:THREE.DoubleSide,depthWrite:false,flatShading:true});
const hull=new THREE.Mesh(hullGeometry,hullMaterial); hull.renderOrder=4; scene.add(hull);
const edgeMaterial=new THREE.LineBasicMaterial({color:0x3f4248,transparent:true,opacity:.4,depthWrite:false});
const edges=new THREE.LineSegments(new THREE.EdgesGeometry(hullGeometry),edgeMaterial); edges.renderOrder=7;scene.add(edges);
const axesMaterial=new THREE.LineBasicMaterial({color:0x6c7077,transparent:true,opacity:.3,depthWrite:false});
const axes=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-AXIS_EXTENT.x,0,0),new THREE.Vector3(AXIS_EXTENT.x,0,0),
  new THREE.Vector3(0,-AXIS_EXTENT.y,0),new THREE.Vector3(0,AXIS_EXTENT.y,0),
  new THREE.Vector3(0,0,-AXIS_EXTENT.z),new THREE.Vector3(0,0,AXIS_EXTENT.z)
]),axesMaterial); axes.renderOrder=6;scene.add(axes);

function shellMaterial(side){
  return new THREE.ShaderMaterial({side,transparent:true,depthWrite:false,
    uniforms:{uBody:{value:.004},uRim:{value:.12},uWeight:{value:1},uColor:{value:new THREE.Color(0x5c6068)}},
    vertexShader:`varying vec3 vNormal; varying vec3 vView; void main(){ vec4 p=modelViewMatrix*vec4(position,1.);vNormal=normalize(normalMatrix*normal);vView=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,
    fragmentShader:`uniform vec3 uColor;uniform float uBody,uRim,uWeight;varying vec3 vNormal;varying vec3 vView;void main(){float facing=abs(dot(normalize(vNormal),normalize(vView)));float rim=pow(1.-facing,3.4);gl_FragColor=vec4(uColor,(uBody+uRim*rim)*uWeight);#include <colorspace_fragment>}`.replace(';#include',';\n#include')
  });
}
const shells=R.map((r,i)=>{
  const g=new THREE.SphereGeometry(r,80,56);
  const back=new THREE.Mesh(g,shellMaterial(THREE.BackSide)),front=new THREE.Mesh(g,shellMaterial(THREE.FrontSide));
  back.renderOrder=3-i;front.renderOrder=8+i;scene.add(back,front);
  return {r,back,front};
});

// Spherical small circles, not screen-facing circles or flat tangent discs.
// One batched line object per shell: six directions × three rings × 48 segments.
function rippleGeometry(radius){
  const positions=[], strength=[];
  const normal=new THREE.Vector3(),u=new THREE.Vector3(),w=new THREE.Vector3();
  for(const anchor of DIRECTIONS.filter(d=>d.signs.filter(Boolean).length===1)){
    normal.set(...anchor.vector);
    u.crossVectors(normal,Math.abs(normal.z)<.9?new THREE.Vector3(0,0,1):new THREE.Vector3(0,1,0)).normalize();
    w.crossVectors(normal,u).normalize();
    [.025,.05,.08].forEach((angular,j)=>{
      const a=angular, radial=radius*Math.cos(a), ring=radius*Math.sin(a);
      for(let k=0;k<48;k++)for(const q of [k,k+1]){
        const t=q/48*Math.PI*2;
        v.copy(normal).multiplyScalar(radial).addScaledVector(u,Math.cos(t)*ring).addScaledVector(w,Math.sin(t)*ring);
        positions.push(v.x,v.y,v.z);strength.push([1,.82,.62][j]);
      }
    });
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('strength',new THREE.Float32BufferAttribute(strength,1));return geometry;
}
const ripples=R.map(r=>{
  const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uWeight:{value:1},uInside:{value:0}},
    vertexShader:`attribute float strength;varying float vStrength,vFacing,vNear;void main(){vec4 p=modelViewMatrix*vec4(position,1.);vFacing=dot(normalize(normalMatrix*position),normalize(-p.xyz));vNear=smoothstep(.035,.34,length(p.xyz));vStrength=strength;gl_Position=projectionMatrix*p;}`,
    fragmentShader:`uniform float uWeight,uInside;varying float vStrength,vFacing,vNear;void main(){float face=mix(.40,1.,smoothstep(-.1,.2,vFacing));face=mix(face,1.,uInside);gl_FragColor=vec4(vec3(.25,.26,.28),.64*uWeight*vStrength*face*vNear);}`
  });
  const mesh=new THREE.LineSegments(rippleGeometry(r),material);mesh.renderOrder=12;scene.add(mesh);return {r,mesh};
});
const morph=buildOpening({equatorRadius:1,apexHeight:shellRadius(4),equatorAzimuths:[0,Math.PI/2,Math.PI,Math.PI*1.5]});
morph.edges.renderOrder=13;morph.grid.renderOrder=13;scene.add(morph.edges,morph.grid);
morph.set(0,0);

// Faint orbital context; no replica is between the camera and the central model.
const netCells=[];for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++)for(let z=-2;z<=2;z++)if(x||y||z)netCells.push([x,y,z]);
const netMaterial=new THREE.MeshBasicMaterial({color:0xb0b3b8,transparent:true,opacity:.035,depthWrite:false});
const net=new THREE.InstancedMesh(hullGeometry,netMaterial,netCells.length),matrix=new THREE.Matrix4();
netCells.forEach(([x,y,z],i)=>net.setMatrixAt(i,matrix.makeTranslation(x*9,y*9,z*9)));net.renderOrder=0;scene.add(net);

// Outside labels have no black point markers. Crossings are represented by ripples.
const exterior=[];
function outsideLabel(name,pos,slug,kind='region'){
  const element=document.createElement('div');element.className=`lm lm--${kind}`;element.textContent=name;const leader=document.createElement('span');leader.className='lm-leader';element.append(leader);
  const object=new CSS2DObject(element);object.position.set(...pos);object.center.set(0,.5);scene.add(object);
  const entry={element,object,slug,kind,pos:object.position};exterior.push(entry);return entry;
}
LANDMARKS.forEach(l=>outsideLabel(l.name,l.pos,l.slug,l.slug==='being'?'being':l.limit?'limit':'landmark'));
ZONE_NAMES.forEach((names,i)=>{
  [[names.x[0],[-MID[i],0,0]],[names.x[1],[MID[i],0,0]],[names.y[0],[0,-MID[i],0]],[names.y[1],[0,MID[i],0]],[names.z[0],[0,0,-MID[i]]],[names.z[1],[0,0,MID[i]]]].forEach(([name,p])=>outsideLabel(name,p,name.toLowerCase()));
});

// The eye remains at BEING. The full-screen equidistant cone handles >180°.
const cone=buildCone({hullGeometry,shellRipples:ripples.map(r=>r.mesh.geometry)});
const atlas=buildBeingLabels(stage);
const cameraBasis=new THREE.Matrix4(),screenRight=new THREE.Vector3(),screenUp=new THREE.Vector3(),screenBack=new THREE.Vector3();
await document.fonts.ready;
function faceAlong(yaw,pitch){
  forward.set(Math.cos(pitch)*Math.cos(yaw),Math.cos(pitch)*Math.sin(yaw),Math.sin(pitch));
  screenRight.set(Math.sin(yaw),-Math.cos(yaw),0);screenUp.crossVectors(screenRight,forward);screenBack.copy(forward).negate();
  cameraBasis.makeBasis(screenRight,screenUp,screenBack);camera.quaternion.setFromRotationMatrix(cameraBasis);
}

// One input owner. An uninterrupted scalar carries residual input across every boundary.
// No controls are disabled at zero, no active touches are cleared at mode transitions.
function setTarget(n){state.target=clamp(n,...BOUNDS);}
function move(amount){state.gestures++;setTarget(state.target+amount);}
function setRoute(d){state.route=d;routeSelect.value=d.id;state.yawOffset=0;state.pitchOffset=0;}
function beginTravel(){
  setRoute(DIRECTIONS.find(d=>d.id===routeSelect.value)||routeDefault);
  orbit.copy(direction.set(...state.route.vector)).negate();
  state.orbitYaw=Math.atan2(orbit.y,orbit.x);state.orbitPitch=Math.asin(orbit.z);
  setTarget(CENTRE);
}
$('#within').addEventListener('click',beginTravel);
$('#outside').addEventListener('click',()=>setTarget(0));
$('#origin').addEventListener('click',()=>{setTarget(CENTRE);state.yawOffset=0;state.pitchOffset=0;});
routeSelect.addEventListener('change',()=>{setRoute(DIRECTIONS.find(d=>d.id===routeSelect.value));state.nav=CENTRE;setTarget(CENTRE);});
$('#forward').addEventListener('click',()=>move(.14));
$('#backward').addEventListener('click',()=>move(-.14));
const about=$('.about-panel');
function showAbout(show){about.hidden=!show;$('#about').setAttribute('aria-expanded',String(show));}
$('#about').addEventListener('click',()=>showAbout(about.hidden));$('#close-about').addEventListener('click',()=>showAbout(false));

function turn(dx,dy){
  if(state.nav>1.08){const perPixel=degToRad(state.coneAngle)/Math.max(width,height);state.yawOffset+=dx*perPixel;state.pitchOffset=clamp(state.pitchOffset+dy*perPixel,-Math.PI/2-Math.asin(state.route.vector[2]),Math.PI/2-Math.asin(state.route.vector[2]));}
  else {state.orbitYaw-=dx*.006;state.orbitPitch=clamp(state.orbitPitch+dy*.005,-1.35,1.35);}
}
const pointers=new Map();let oldGap=0,totalDrag=0;
const gap=()=>{const p=[...pointers.values()];return p.length===2?Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y):0;};
stage.addEventListener('pointerdown',e=>{
  if(e.button!==0&&e.pointerType==='mouse')return;
  stage.setPointerCapture?.(e.pointerId);stage.focus({preventScroll:true});
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});oldGap=gap();totalDrag=0;
});
stage.addEventListener('pointermove',e=>{
  const p=pointers.get(e.pointerId);if(!p)return;
  const dx=e.clientX-p.x,dy=e.clientY-p.y;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});totalDrag+=Math.hypot(dx,dy);
  if(pointers.size===2){const g=gap();if(oldGap>0&&g>0)move(Math.log(g/oldGap)*.85);oldGap=g;}
  else if(pointers.size===1)turn(dx,dy);
});
function endPointer(e){pointers.delete(e.pointerId);oldGap=gap();}
stage.addEventListener('pointerup',endPointer);stage.addEventListener('pointercancel',endPointer);stage.addEventListener('lostpointercapture',endPointer);
stage.addEventListener('click',()=>{if(totalDrag<5&&state.target<-.98)setTarget(0);});
stage.addEventListener('wheel',e=>{e.preventDefault();const mode=e.deltaMode===1?16:e.deltaMode===2?innerHeight:1;move(-clamp(e.deltaY*mode,-240,240)*.00095);},{passive:false});
let gestureScale=1;
stage.addEventListener('gesturestart',e=>{e.preventDefault();gestureScale=e.scale||1;});
stage.addEventListener('gesturechange',e=>{e.preventDefault();if(pointers.size>=2||!e.scale)return;move(Math.log(e.scale/gestureScale)*.85);gestureScale=e.scale;});
window.addEventListener('keydown',e=>{
  if(e.target.matches('select,input,textarea'))return;
  if(e.key==='Escape'){showAbout(false);return;}
  if(e.key==='r'||e.key==='R'){setTarget(0);return;}
  if(['+','=','-','_','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))e.preventDefault();
  if(e.key==='+'||e.key==='=')move(.09);
  if(e.key==='-'||e.key==='_')move(-.09);
  if(e.key==='ArrowLeft')turn(18,0);if(e.key==='ArrowRight')turn(-18,0);
  if(e.key==='ArrowUp')turn(0,-18);if(e.key==='ArrowDown')turn(0,18);
  if(e.key==='Home'){setTarget(CENTRE);state.yawOffset=0;state.pitchOffset=0;}
});

let width=1,height=1;
function resize(){width=stage.clientWidth;height=stage.clientHeight;renderer.setSize(width,height);labels.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}
new ResizeObserver(resize).observe(stage);resize();
const projected=new THREE.Vector3(),eyeDirection=new THREE.Vector3(),ray=new THREE.Vector3();
let previousNav=0,lastStatus='',lastTime=performance.now(),elapsed=0;
function entryDirection(){
  orbit.set(Math.cos(state.orbitPitch)*Math.cos(state.orbitYaw),Math.cos(state.orbitPitch)*Math.sin(state.orbitYaw),Math.sin(state.orbitPitch));
  return orbit;
}
function updateCamera(){
  const n=state.nav;
  entryDirection();
  if(previousNav<=.94&&n>.94){
    const incoming=orbit.clone().negate();setRoute(closestDirection(incoming,null));
  }
  if(n<CENTRE){
    const distance=n<=0?CAMERA.maxDistance:n<=1?CAMERA.maxDistance*Math.pow(CAMERA.threshold/CAMERA.maxDistance,n):CAMERA.threshold*(CENTRE-n)/(CENTRE-1);
    const align=smoothstep(n,.94,CENTRE);
    eyeDirection.copy(orbit).lerp(direction.set(...state.route.vector).negate(),align).normalize();
    camera.position.copy(eyeDirection).multiplyScalar(distance);
    forward.copy(eyeDirection).negate();camera.lookAt(camera.position.clone().add(forward));
  } else {
    camera.position.set(0,0,0);
    const yaw=Math.atan2(state.route.vector[1],state.route.vector[0])+state.yawOffset;
    const pitch=clamp(Math.asin(state.route.vector[2])+state.pitchOffset,-Math.PI/2,Math.PI/2);
    faceAlong(yaw,pitch);
  }
  state.coneAngle=220*Math.pow(24/220,unit((n-CENTRE)/(END-CENTRE)));
  const portrait=width<height;
  const p=unit(n+1),b=smoothstep(p,.33,1);
  // Torus fits the short side; no perspective jump while it becomes the diamond.
  const introFov=clamp(THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(degToRad(43))/Math.min(1,width/height))),104,150);
  camera.fov=n<0?lerp(introFov,portrait?118:104,b):portrait?118:104;
  camera.updateProjectionMatrix();camera.updateMatrixWorld();previousNav=n;
}
function outsideTransmission(position){
  const rho=position.length();if(rho<1e-5)return 1;
  // Semantic far-side test: count the near-side shells between the eye and
  // the label, only as the label turns into the far half. Unlike v3.4 it
  // does not skip enclosing shells when labels are moved inward.
  const cameraRadius=camera.position.length();if(cameraRadius<.001)return 1;
  ray.copy(camera.position).normalize();const axial=position.dot(ray);
  const lateral=Math.sqrt(Math.max(0,rho*rho-axial*axial));
  let layers=0;
  for(const r of R){
    if(cameraRadius<=r)continue;
    layers+=smoothstep(-axial/rho,.06,.32)*(1-smoothstep(lateral,r*.96,r*1.015));
  }
  return shellLayerOpacity(layers);
}
function updateOutside(alpha,a,b){
  const boxes=[];const d=camera.position.length();
  const lineEnd=lerp(morph.torusHeight,AXIS_EXTENT.z,b),apexEnd=lerp(morph.torusHeight,shellRadius(4),b);
  const appear={being:smoothstep(a,.6,1),birth:smoothstep(b,0,.15),death:smoothstep(b,0,.15),erasure:smoothstep(b,.6,.9),permanence:smoothstep(b,.6,.9)};
  const regionsIn=smoothstep(b,.82,1);
  for(const e of exterior){if(e.slug==='death')e.pos.z=lineEnd;if(e.slug==='birth')e.pos.z=-lineEnd;if(e.slug==='erasure')e.pos.z=apexEnd;if(e.slug==='permanence')e.pos.z=-apexEnd;}
  for(const entry of exterior){
    const {object,element,slug,kind,pos}=entry;
    projected.copy(pos).project(camera);const x=(projected.x+1)*width/2,y=(1-projected.y)*height/2;
    const inside=projected.z<1&&projected.z>-1&&x>-40&&x<width+40&&y>-12&&y<height+12;
    let reveal=labelReveal(slug,d);
    if(kind==='region')reveal*=smoothstep(state.nav,.18,.5);
    // The four equatorial vertex names remain at their vertices; their regional
    // names take over on close inspection, avoiding identical simultaneous labels.
    const vertexName=slug==='craving'||slug==='hostility'||slug==='inflation'||slug==='abasement';
    if(kind==='landmark'&&vertexName)reveal*=1-smoothstep(state.nav,.35,.55);
    if(kind==='region'&&vertexName)reveal*=smoothstep(state.nav,.35,.55);
    let a=inside?alpha*(appear[slug]??regionsIn)*reveal*outsideTransmission(pos):0;
    if(state.nav<.05&&kind==='being')a=0;
    const textWidth=element.offsetWidth||90;const flip=x+textWidth>width-18;
    object.center.set(kind==='region'?.5:flip?1:0,.5);element.classList.toggle('lm--flipped',flip&&kind!=='region');
    boxes.push({entry,x,y,w:textWidth,flip,a,depth:pos.distanceTo(camera.position)});
  }
  const pinned=(q)=>q.entry.kind==='being'||q.entry.kind==='limit';
  boxes.sort((a,b)=>(pinned(a)?-1e9:a.depth)-(pinned(b)?-1e9:b.depth));const accepted=[];
  for(const b of boxes){
    const left=b.entry.kind==='region'?b.x-b.w/2:b.flip?b.x-b.w:b.x,right=left+b.w;
    // Preserve every revealed name. Resolve collisions with a small screen-space
    // displacement and a leader, rather than deleting the farther label.
    let y=b.y;let tries=0;
    while(b.a>.01&&!pinned(b)&&accepted.some(q=>Math.abs(y-q.y)<19&&left<q.right+5&&right>q.left-5)&&tries++<16)y+=20;
    y=b.a>.01?clamp(y,12,height-12):b.y;
    if(b.a>.01)accepted.push({left,right,y});
    b.entry.element.style.setProperty('--label-shift',`${b.a>.01?y-b.y:0}px`);
    const leader=b.entry.element.querySelector('.lm-leader');
    if(leader){const moved=b.a>.01?Math.max(0,y-b.y):0;leader.style.height=`${moved}px`;leader.style.display=moved>1?'block':'none';}
    b.entry.element.style.opacity=String(b.a);b.entry.element.style.visibility=b.a>.005?'visible':'hidden';
  }
  labels.render(scene,camera);
}
function updateUI(focus,ahead,active){
  const inside=state.nav>1.08;
  state.mode=state.nav<-.99?'torus':state.nav<0?'unfolding':inside?'within':'outside';
  $('.route-panel').hidden=!inside;
  $('#outside').setAttribute('aria-pressed',String(!inside));$('#within').setAttribute('aria-pressed',String(inside));
  stage.dataset.mode=state.mode;
  $('#journey-fill').style.width=`${(state.nav+1)/4*100}%`;
  $('#forward').disabled=state.target>=END-.0001;$('#backward').disabled=state.target<=-1+.0001;
  let name,detail;
  if(state.nav<0){name=state.nav<-.99?'Torus':'Unfolding';detail='One continuous movement. Reverse at any point.';}
  else if(inside){
    name=`From BEING · ${Math.round(state.coneAngle)}° cone`;
    detail=`${compoundName(ahead,active.signs)} · ${SPHERE_NAMES[focus<R[0]?0:focus<R[1]?1:2]}`;
  }else{name='Outside view';detail='Responsiveness, Involvement, Fixation. Ripples mark the crossings.';}
  const key=name+'|'+detail;if(key!==lastStatus){lastStatus=key;$('#view-name').textContent=name;$('#view-detail').textContent=detail;}
  $('#hint').textContent=inside?'Drag to rotate the cone · Pinch or scroll to focus':state.nav<-.99?'Drag to turn · Tap or zoom in to unfold':'Drag to turn · Scroll or pinch to move';
}
function tick(dt){
  elapsed+=dt;
  if(state.nav<-.98&&state.target<-.98&&pointers.size===0&&!reduced)state.orbitYaw-=dt*.18;
  state.nav=lerp(state.nav,state.target,reduced?1:1-Math.exp(-dt*11));if(Math.abs(state.nav-state.target)<.00001)state.nav=state.target;
  updateCamera();
  const p=unit(state.nav+1),a=smoothstep(p,0,.4),b=smoothstep(p,.33,1);
  const inside=smoothstep(state.nav,1.04,CENTRE),open=smoothstep(b,.70,1);
  const opaque=(1-smoothstep(state.nav,.02,.24))*open;
  morph.set(a,b);
  const gold=new THREE.Color(0xc8951a),ink=new THREE.Color(0x555961);
  morph.gridMaterial.color.lerpColors(gold,ink,smoothstep(b,0,.7));
  morph.gridMaterial.opacity=.65*(1-smoothstep(b,.50,1));
  morph.grid.visible=morph.gridMaterial.opacity>.001;
  morph.edges.visible=p<1;morph.edgeMaterial.opacity=.45*smoothstep(b,.40,.98);
  // Morph edges coincide with the finished edges; no black edges at torus rest.
  edges.visible=p>=1;edgeMaterial.opacity=lerp(.45,.18,inside);
  hullMaterial.opacity=open*lerp(.10,.98,opaque);hull.visible=open>.001;
  axesMaterial.opacity=.25*smoothstep(b,.80,1)*(1-inside*.65);
  // All shell radii grow outwards from the same origin while the body stretches.
  const shellsIn=smoothstep(b,.25,1);
  const growth=smoothstep(b,.22,1);
  shells.forEach((shell,i)=>{
    const scale=Math.max(.0001,growth);
    for(const surface of [shell.back,shell.front]){
      surface.scale.setScalar(scale);surface.visible=shellsIn>.001;
      surface.material.uniforms.uWeight.value=shellsIn;
      surface.material.uniforms.uBody.value=.003+(i===2?.16*opaque:0);
      surface.material.uniforms.uRim.value=lerp(.14,.04,inside);
    }
  });
  ripples.forEach(({r,mesh})=>{mesh.scale.setScalar(Math.max(.0001,growth));mesh.visible=shellsIn>.001;mesh.material.uniforms.uWeight.value=shellsIn;mesh.material.uniforms.uInside.value=camera.position.length()<r?1:0;});
  net.visible=state.nav>=0&&state.nav<.2;netMaterial.opacity=.022*(1-smoothstep(state.nav,.01,.2));
  updateOutside(1-inside,a,b);
  cone.setView(camera,state.coneAngle,width,height,inside,renderer.getPixelRatio());
  const info=atlas.update({cone,angle:state.coneAngle,forward,width,height,alpha:inside,dt});
  updateUI(info.focus,info.ahead,info.active);
  renderer.clear();
  if(inside<1)renderer.render(scene,camera);
  if(inside>0)renderer.render(cone.scene,cone.screen);

}
renderer.setAnimationLoop((now)=>{const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;tick(Math.max(0,dt));});
window.render_game_to_text=()=>JSON.stringify({mode:state.mode,nav:+state.nav.toFixed(5),target:+state.target.toFixed(5),camera:camera.position.toArray().map(x=>+x.toFixed(5)),forward:forward.toArray(),coneAngle:state.coneAngle,route:state.route.id,pointers:pointers.size,rings:54,rippleSegments:2592,dots:0,gridColor:morph.gridMaterial.color.getHexString(),gridOpacity:morph.gridMaterial.opacity,morphEdgeOpacity:morph.edgeMaterial.opacity,shellScale:shells[2].front.scale.x,labelCount:atlas.items.length,labels:atlas.items.filter(item=>item.opacity>.005).map(item=>({name:item.name,direction:item.d.id,radius:item.r,size:+item.size.toFixed(2),opacity:+item.opacity.toFixed(3),x:+item.x.toFixed(1),y:+item.y.toFixed(1)})),outsideLabels:exterior.map(e=>({name:e.element.textContent,opacity:+e.element.style.opacity,shift:e.element.style.getPropertyValue('--label-shift')})),renderCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles});
window.advanceTime=(ms)=>{for(let t=0;t<ms;t+=16)tick(Math.min(16,ms-t)/1000);};
window.diamondReady=true;

// Label atlas for the view from BEING. Every angular display direction exists
// simultaneously. Cone rotation, not a selected-route filter, determines visibility.
import * as THREE from 'three';
const lerp=THREE.MathUtils.lerp;
import { DIRECTIONS, compoundName, closestDirection } from './label-rules.js';
const POLAR=['PERMANENCE','ERASURE'];
import { shellRadius } from './constants.js';
const R=[1,2,3].map(shellRadius), MID=R.map((r,i)=>(r+(R[i-1]||0))/2);
const {clamp,smoothstep,degToRad}=THREE.MathUtils;
export function buildBeingLabels(container){
  const NS='http://www.w3.org/2000/svg', svg=document.createElementNS(NS,'svg');
  svg.classList.add('being-labels');svg.setAttribute('aria-hidden','true');container.append(svg);
  const items=[], p=new THREE.Vector3();
  function add(d,i,name,r,h,kind){
    const text=document.createElementNS(NS,'text');
    text.textContent=name;text.setAttribute('text-anchor','middle');text.setAttribute('dominant-baseline','central');
    text.classList.add('being-label',`being-label--${kind}`);svg.append(text);
    items.push({d,i,name,r,h,kind,text,opacity:0,size:0,x:0,y:0});
  }
  // Draw outer layers first: nearer layers mask those behind until they fade.
  for(let i=2;i>=0;i--)for(const d of DIRECTIONS){
    const count=d.signs.filter(Boolean).length;
    const name=compoundName(i,d.signs);
    add(d,i,count===1?name.toUpperCase():name,MID[i],count===1?17:14,count===1?'axis':'region');
  }
  for(const z of [-1,1])add(DIRECTIONS.find(d=>d.id===`0,0,${z}`),3,z<0?POLAR[0]:POLAR[1],shellRadius(4),18,'polar');
  let active=null;
  function update({cone,angle,forward,width,height,alpha,dt}){
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.style.opacity=String(alpha);
    active=closestDirection(forward,active);
    // A radial attention frontier, NOT a translated camera. The apex stays at BEING.
    // Cross Z1/Z2 at 118° and Z2/Z3 at 66°; stop before exiting the model.
    const focus=angle>=118?THREE.MathUtils.mapLinear(angle,220,118,0,R[0]):angle>=66?THREE.MathUtils.mapLinear(angle,118,66,R[0],R[1]):THREE.MathUtils.mapLinear(angle,66,24,R[1],.78);
    let ahead=R.findIndex(r=>r>focus);if(ahead<0)ahead=2;
    const span=Math.max(width,height), screenScale=clamp(span/1280,.85,1.1), magnify=220/angle;
    let leadSize=0;const polarCap=1-smoothstep(angle,24,40);
    for(const item of items){
      const projected={...cone.project(p.set(...item.d.vector))};
      // The text has a fixed angular size in the model, so narrowing the cone
      // magnifies it. Layers farther from BEING recede gently (r^-0.35), not as a
      // true perspective ratio, which would make Zone 3 unreadable.
      item.size=Math.min(item.h*screenScale*Math.pow(MID[1]/Math.min(item.r,1.2),.35)*magnify,width*1.55/Math.max(8,item.name.length*.56));
      if(item.i===ahead&&item.kind==='region')leadSize=Math.max(leadSize,item.size);
      item.x=projected.x;item.y=projected.y;
      const dot=clamp(item.d.vector.reduce((s,x,k)=>s+x*forward.getComponent(k),0),-1,1);
      const angleFrom=Math.acos(dot);
      const attention=.55+.45*smoothstep(dot,.45,1);
      let opacity;
      const rank=Math.max(0,item.i-ahead), tiers=[.94,.22,.12,.08];
      if(item.kind==='polar')opacity=lerp(tiers[Math.min(3,rank)],.96,polarCap);
            else {
        const before=1-smoothstep(focus,R[item.i]-.075,R[item.i]+.012);
        opacity=before*tiers[Math.min(3,rank)]*(item.d.signs[0]===0&&item.d.signs[1]===0?1-polarCap:1);
      }
      // No hard angular neighbour selection: spatial anchors enter/leave the viewport.
      const edge=1-smoothstep(angleFrom,Math.PI-.18,Math.PI-.03);
      item.opacity=alpha*opacity*attention*edge;
      const visible=item.opacity>.003&&item.x>-width*1.5&&item.x<width*2.5&&item.y>-height&&item.y<height*2;
      item.text.style.visibility=visible?'visible':'hidden';
      item.text.style.opacity=String(opacity*attention*edge);
      item.text.setAttribute('font-size',item.size.toFixed(2));
      item.text.setAttribute('x',item.x.toFixed(2));
      // A small, world-angular baseline separation exposes next labels without
      // moving their angular x anchor or stacking a screen-fixed HUD.
      const offset=(item.i-ahead)*1.42*item.size*(item.kind==='polar'?1-polarCap:1);
      item.text.setAttribute('y',(item.y+offset).toFixed(2));
      item.text.setAttribute('stroke-width',Math.max(1.5,item.size*.07).toFixed(2));
    }
    svg.dataset.direction=active.id;svg.dataset.zone=String(ahead+1);
    return {focus,ahead,active};
  }
  return {update,items,element:svg};
}

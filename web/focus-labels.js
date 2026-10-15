// The active region's name replaces the near axial labels. Next-zone
// axial labels stay faint, spatially anchored to their own directions.
import * as THREE from 'three';
import { ZONE_NAMES, closestDirection, compoundName, zoneForAngle, polarWeight } from './label-rules.js';

export function buildFocusLabels(container) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.classList.add('focus-labels');
  svg.setAttribute('aria-hidden', 'true');
  const defs = document.createElementNS(NS, 'defs');
  svg.append(defs);
  container.append(svg);
  const position = new THREE.Vector3();
  const axisVectors = [[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]].map((p) => new THREE.Vector3(...p));
  let selected = null;
  let last = null;
  let transition = 1;
  let zone = 0, lastZone = 0, zoneFade = 1;
  const pool = new Map();
  function textNode(id, curved) {
    if (pool.has(id)) return pool.get(id);
    const text = document.createElementNS(NS, 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.classList.add(curved ? 'focus-labels__current' : 'focus-labels__next');
    let path, content = text;
    if (curved) {
      path = document.createElementNS(NS, 'path');
      path.id = `focus-${id}`;
      defs.append(path);
      content = document.createElementNS(NS, 'textPath');
      content.setAttribute('href', `#${path.id}`);
      content.setAttribute('startOffset', '50%');
      text.append(content);
    }
    svg.append(text);
    const item = { text, content, path };
    pool.set(id, item);
    return item;
  }
  // Three current layers for each of the two crossfading angular regions.
  for (let side = 0; side < 2; side++) for (let zone = 0; zone < 3; zone++) textNode(`c-${side}-${zone}`, true);
  const next = Array.from({ length: 6 }, (_, i) => textNode(`n-${i}`, false));
  const cap = textNode('cap', false);
  cap.text.classList.replace('focus-labels__next', 'focus-labels__current');

  function update({ cone, angle, forward, width, height, alpha, dt, reducedMotion }) {
    svg.style.opacity = String(alpha);
    if (alpha <= 0) return;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const candidate = closestDirection(forward, selected);
    if (candidate !== selected) { last = selected; selected = candidate; transition = last && !reducedMotion ? 0 : 1; }
    transition = Math.min(1, transition + dt / 0.2);
    const nextZoneIndex = zoneForAngle(angle, zone);
    if (nextZoneIndex !== zone) { lastZone = zone; zone = nextZoneIndex; zoneFade = reducedMotion ? 1 : 0; }
    zoneFade = Math.min(1, zoneFade + dt / 0.25);
    const weights = [0, 0, 0];
    weights[lastZone] += 1 - zoneFade;
    weights[zone] += zoneFade;
    const active = zone;
    const baseSize = Math.min(22, 15 * (220 / angle) ** 0.18);
    const selectedIsPolar = selected.signs[0] === 0 && selected.signs[1] === 0;
    const polar = selectedIsPolar ? polarWeight(angle) : 0;
    for (const item of pool.values()) item.text.style.opacity = '0';

    for (const [side, region, angularAlpha] of [[0, last, 1-transition], [1, selected, transition]]) {
      if (!region || angularAlpha <= 0) continue;
      for (let z = 0; z < 3; z++) {
        const opacity = angularAlpha * weights[z] * (1 - polar);
        if (opacity < 0.005) continue;
        const item = textNode(`c-${side}-${z}`, true);
        const name = compoundName(z, region.signs);
        item.content.textContent = name;
        const size = baseSize;
        item.text.setAttribute('font-size', size.toFixed(1));
        const p = { ...cone.project(position.set(...region.vector)) };
        if (p.x < -80 || p.x > width+80 || p.y < 12 || p.y > height-25) continue;
        // A short latitude arc on the shell, centred on the fixed angular
        // anchor. It rotates with the model, rather than becoming a HUD.
        // At a pole the latitude degenerates, so use a straight baseline.
        const world = region.vector;
        const latitudeRadius = Math.hypot(world[0], world[1]);
        const halfPixels = Math.max(55, name.length * size * 0.34);
        const phi = Math.atan2(world[1], world[0]);
        const span = Math.min(0.72, halfPixels / Math.max(width,height) * angle * Math.PI / 180 / Math.max(0.35,latitudeRadius));
        let path = '';
        const samples = [];
        for (let j = 0; j <= 24; j++) {
          const t = (j/24*2-1)*span;
          if (latitudeRadius < 0.01) samples.push({ x: p.x + (j/24*2-1)*halfPixels, y: p.y });
          else samples.push({ ...cone.project(position.set(latitudeRadius*Math.cos(phi+t),latitudeRadius*Math.sin(phi+t),world[2])) });
        }
        if (samples[0].x > samples.at(-1).x) samples.reverse();
        for (let j=0;j<samples.length;j++) path += `${j?'L':'M'}${samples[j].x.toFixed(1)},${samples[j].y.toFixed(1)} `;
        item.path.setAttribute('d', path);
        item.text.style.opacity = String(opacity);
      }
    }
    // Next-zone axial names: the current near names have been replaced
    // by the compound. Past/Future repeat without a zone-specific rename,
    // since the time axis is zoneless.
    const nextZone = Math.min(active+1,2);
    const names = active < 2
      ? [...ZONE_NAMES[nextZone].x, 'Past','Future',...ZONE_NAMES[nextZone].z]
      : ['', '', '', '', 'Awakening', 'Obliteration'];
    for (let i=0;i<6;i++) {
      const item=next[i], name=names[i];
      // Only the axes that bound the region in view, on its own side.
      if (!name || selected.signs[i >> 1] !== (i % 2 ? 1 : -1)) continue;
      const p={...cone.project(axisVectors[i])};
      if(p.x<10 || p.x>width-10 || p.y<15 || p.y>height-30) continue;
      const same = selected.vector.every((v,k)=>Math.abs(v-axisVectors[i].getComponent(k))<1e-5);
      // Straight ahead along an axis, the current name sits atop the next
      // one, which is larger and fainter (Option 2, 2026-10-14).
      const size = same ? baseSize*1.8 : Math.max(13,baseSize*0.9);
      item.content.textContent=name;
      item.text.setAttribute('x', p.x.toFixed(1));
      item.text.setAttribute('y', (p.y + (same ? baseSize*0.62 + size*0.5 : 0)).toFixed(1));
      item.text.setAttribute('font-size', size.toFixed(1));
      item.text.style.opacity=String((same?0.12:0.25)*(1-polar)*zoneFade);
    }
    if (polar > 0.005) {
      const p={...cone.project(position.set(...selected.vector))};
      cap.content.textContent=selected.signs[2]>0?'Obliteration':'Awakening';
      cap.text.setAttribute('x',p.x.toFixed(1));
      cap.text.setAttribute('y',p.y.toFixed(1));
      cap.text.setAttribute('font-size',baseSize.toFixed(1));
      cap.text.style.opacity=String(polar);
    }
    svg.dataset.zone=String(active+1);
    svg.dataset.region=selected.id;
    svg.dataset.name=polar>0.5 ? (selected.signs[2]>0?'Obliteration':'Awakening') : compoundName(active,selected.signs);
  }
  return { update, element: svg };
}

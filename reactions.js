/** Synthetic optical fields for the HemaTrix classroom demonstration.
 * No image is a clinical measurement or a validated detection algorithm.
 */
const PATTERNS = new Set(['negative', 'positive', 'weak', 'bubble', 'illumination', 'blur', 'equivocal']);
const CELL_RADIUS = 0.019;

function seedRandom(seed = 37) {
  let value = seed >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function fieldPoints(pattern) {
  const rand = seedRandom(1871);
  const points = [];
  const add = (x, y, r = CELL_RADIUS) => points.push({ x, y, r, angle: rand() * Math.PI, shape: 0.75 + rand() * 0.19 });
  const positive = pattern === 'positive';
  const partial = pattern === 'weak' || pattern === 'equivocal';
  if (positive || partial) {
    const centres = positive
      ? [[-.24,-.22], [.02,-.28], [.26,-.13], [-.25,.10], [.04,.01], [.24,.23], [-.07,.28]]
      : [[-.21,-.19], [.23,.10], [-.05,.26]];
    for (const [cx, cy] of centres) {
      const count = positive ? 15 : 7;
      for (let i = 0; i < count; i++) {
        const angle = i * 2.3999632;
        const rad = Math.sqrt(i) * (positive ? 0.020 : 0.023);
        add(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad, CELL_RADIUS * (0.88 + rand() * .2));
      }
    }
  }
  const target = positive ? 112 : partial ? 88 : 94;
  let attempts = 0;
  while (points.length < target && attempts++ < 9000) {
    const x = (rand() - .5) * .82;
    const y = (rand() - .5) * .82;
    if (x*x + y*y > .40*.40) continue;
    const separation = positive ? .05 : partial ? .046 : .052;
    if (points.some(p => Math.hypot(p.x - x, p.y - y) < separation)) continue;
    add(x, y, CELL_RADIUS * (.86 + rand() * .25));
  }
  return points;
}

function connectedGroups(points) {
  const visited = new Set();
  const groups = [];
  for (let i = 0; i < points.length; i++) {
    if (visited.has(i)) continue;
    const members = [i];
    visited.add(i);
    for (let n = 0; n < members.length; n++) {
      const a = points[members[n]];
      for (let j = 0; j < points.length; j++) {
        if (visited.has(j)) continue;
        const b = points[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < (a.r + b.r) * 1.18) {
          visited.add(j);
          members.push(j);
        }
      }
    }
    groups.push(members.map(index => points[index]));
  }
  return groups;
}

/** Returns repeatable descriptors of a generated reference field, not sensitivity or specificity. */
export function classifyPattern(pattern = 'negative') {
  if (!PATTERNS.has(pattern)) return {
    classification: 'Unable to interpret', clusterIndex: null, quality: 0,
    detail: 'The image pattern is not recognised. No positive or negative result is assigned.'
  };
  const source = ['bubble', 'illumination', 'blur'].includes(pattern) ? 'negative' : pattern;
  const points = fieldPoints(source);
  const grouped = connectedGroups(points).filter(group => group.length >= 3).reduce((sum, group) => sum + group.length, 0);
  const clusterIndex = Math.round(grouped / points.length * 100) / 100;
  const table = {
    negative: ['No reactivity detected', 98, 'The cells are predominantly dispersed. Interpretation still depends on the assay controls and complete testing record.'],
    positive: ['Reactive pattern', 98, 'Connected cell clusters are visible. In a typing well this can support antigen detection; in a crossmatch it requires investigation.'],
    weak: ['Weak reactivity: review', 91, 'Small clusters occur among dispersed cells. Retain the finding and request qualified review or repeat testing.'],
    equivocal: ['Equivocal: investigate', 72, 'The image is ambiguous. A reliable positive or negative result cannot be assigned.'],
    bubble: ['Invalid optical field', 37, 'An air bubble obscures the reaction area. Correct the fluidic fault and repeat; do not infer a nonreactive result.'],
    illumination: ['Invalid optical field', 42, 'Uneven illumination prevents reliable interpretation. Check the optical calibration and repeat the test.'],
    blur: ['Invalid optical field', 45, 'Loss of focus prevents reliable pattern interpretation. Inspect the optics and repeat the test.']
  };
  const [classification, quality, detail] = table[pattern];
  return { classification, clusterIndex, quality, detail };
}

function reactionPattern(reaction, quality) {
  if (quality && PATTERNS.has(quality)) return quality;
  const grade = String(reaction?.grade ?? '').toLowerCase();
  const finding = String(reaction?.interpretation ?? '').toLowerCase();
  if (grade.includes('invalid') || finding.includes('invalid') || finding.includes('unreadable')) return 'bubble';
  if (grade.includes('weak') || grade === 'w+' || grade === '1+' || finding.includes('weak')) return 'weak';
  if (reaction?.positive === null) return 'equivocal';
  return reaction?.positive ? 'positive' : 'negative';
}

function drawCell(ctx, p, centreX, centreY, scale, processed) {
  const x = centreX + p.x * scale;
  const y = centreY + p.y * scale;
  const radius = p.r * scale;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(p.angle);
  ctx.scale(1, p.shape);
  const fill = ctx.createRadialGradient(-radius*.18, -radius*.18, radius*.08, 0, 0, radius);
  if (processed) {
    fill.addColorStop(0, '#d9b5b9');
    fill.addColorStop(.54, '#a54e5c');
    fill.addColorStop(1, '#782638');
  } else {
    fill.addColorStop(0, '#f6b8a9');
    fill.addColorStop(.3, '#e48c80');
    fill.addColorStop(.56, '#b34243');
    fill.addColorStop(.85, '#8e2a37');
    fill.addColorStop(1, '#a7484b');
  }
  ctx.fillStyle = fill;
  ctx.beginPath(); ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = processed ? 'rgba(89,28,43,.5)' : 'rgba(112,33,43,.24)';
  ctx.lineWidth = Math.max(.5, radius*.06); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-radius*.13,-radius*.15,radius*.48,radius*.32,0,Math.PI*1.04,Math.PI*1.8);
  ctx.strokeStyle='rgba(255,217,207,.45)';ctx.lineWidth=radius*.12;ctx.stroke();
  ctx.restore();
}

export class ReactionViewer {
  constructor(container) {
    if (!container) throw new Error('ReactionViewer requires a container');
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', 'Illustrative reaction image');
    this.canvas.style.cssText = 'width:100%;height:100%;display:block;min-height:180px;';
    container.appendChild(this.canvas);
    this.options = { mode: 'raw', pattern: 'negative' };
    this.resizeObserver = new ResizeObserver(() => this.draw());
    this.resizeObserver.observe(container);
    this.draw();
  }

  update(options = {}) {
    this.options = { ...this.options, ...options };
    // A reaction update without an explicit reference pattern follows its assay result.
    if (options.reaction && !Object.hasOwn(options, 'pattern')) this.options.pattern = null;
    this.draw();
    return classifyPattern(this.options.pattern || reactionPattern(this.options.reaction, this.options.quality));
  }

  draw() {
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(160, rect.width || 360);
    const height = Math.max(180, rect.height || 240);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (this.canvas.width !== Math.round(width*dpr) || this.canvas.height !== Math.round(height*dpr)) {
      this.canvas.width = Math.round(width*dpr); this.canvas.height = Math.round(height*dpr);
    }
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,width,height);
    const processed = this.options.mode === 'processed';
    const pattern = this.options.pattern || reactionPattern(this.options.reaction, this.options.quality);
    const source = ['bubble','illumination','blur'].includes(pattern) ? 'negative' : pattern;
    const points = fieldPoints(PATTERNS.has(source) ? source : 'negative');
    const size = Math.min(width - 34, height - 30);
    const cx = width/2, cy = height/2;
    const radius = size*.49;
    ctx.fillStyle = processed ? '#eeecea' : '#f1eeea'; ctx.fillRect(0,0,width,height);
    ctx.save();
    ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.clip();
    const bg = ctx.createRadialGradient(cx-size*.1,cy-size*.12,0,cx,cy,radius);
    bg.addColorStop(0,processed?'#f6f5f1':'#fff5e8');
    bg.addColorStop(.8,processed?'#eeece8':'#f6e8db');
    bg.addColorStop(1,processed?'#dfdcd8':'#dacebf');
    ctx.fillStyle=bg;ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);
    // All cell motion is a reference illustration, fixed between calls for reproducibility.
    if (pattern === 'blur') ctx.filter = `blur(${Math.max(2.2,size*.009)}px)`;
    for (const p of points) drawCell(ctx,p,cx,cy,size,processed);
    ctx.filter = 'none';
    if (processed && !['bubble','illumination','blur'].includes(pattern)) {
      const groups = connectedGroups(points).filter(group=>group.length>=3);
      ctx.strokeStyle='#306d6b';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);
      for (const group of groups) {
        const minX=Math.min(...group.map(p=>p.x-p.r)) * size+cx-4;
        const maxX=Math.max(...group.map(p=>p.x+p.r)) * size+cx+4;
        const minY=Math.min(...group.map(p=>p.y-p.r)) * size+cy-4;
        const maxY=Math.max(...group.map(p=>p.y+p.r)) * size+cy+4;
        ctx.beginPath();ctx.roundRect(minX,minY,maxX-minX,maxY-minY,8);ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    if (pattern === 'bubble') {
      const bx=cx+size*.12,by=cy-size*.08,br=size*.18;
      const bubble=ctx.createRadialGradient(bx-br*.22,by-br*.25,br*.01,bx,by,br);
      bubble.addColorStop(0,'rgba(255,255,255,.83)');bubble.addColorStop(.7,'rgba(250,245,235,.89)');bubble.addColorStop(.91,'rgba(116,103,91,.25)');bubble.addColorStop(1,'rgba(95,74,60,.55)');
      ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.fillStyle=bubble;ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(bx,by,br*.89,Math.PI*1.05,Math.PI*1.63);ctx.stroke();
      if(processed){ctx.strokeStyle='#ad7027';ctx.lineWidth=2;ctx.setLineDash([5,3]);ctx.beginPath();ctx.arc(bx,by,br+4,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);}
    }
    if (pattern === 'illumination') {
      const shade=ctx.createLinearGradient(cx-radius,cy,cx+radius,cy);
      shade.addColorStop(0,'rgba(29,18,21,.85)');shade.addColorStop(.5,'rgba(41,22,25,.28)');shade.addColorStop(1,'rgba(255,255,230,.27)');
      ctx.fillStyle=shade;ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);
    }
    ctx.restore();
    ctx.strokeStyle='#d3cec7';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,radius+.6,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='#645e59';ctx.font='12px DM Sans, Arial, sans-serif';
    ctx.textAlign='left';ctx.fillText(processed?'Processed reaction image':'Illustrative reaction image',12,17);
    ctx.font='12px DM Sans, Arial, sans-serif';ctx.textAlign='right';ctx.fillText('Reference pattern',width-12,height-10);
    this.canvas.setAttribute('aria-label',`${processed?'Processed':'Raw'} reaction image: ${classifyPattern(pattern).classification}. Illustrative, not a clinical image.`);
  }

  dispose() {
    this.resizeObserver.disconnect();
    this.canvas.remove();
  }
}

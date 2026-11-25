import { svgEl } from './dom.js';
import { tacho as beschriftung } from './inhalt.js';

const SCHWELLE_VORSICHT = 1;
const VOLL_AB_ZWEIFEL = 6;
const BOGEN_GRAD = 180;
const GRAU_GRAD = BOGEN_GRAD / 3;
const GRAU_NADEL_MAX_GRAD = 54;
const FARBIG_NADEL_START_GRAD = 66;
const MITTE = { x: 120, y: 115 };
const RADIUS = 85;
const BREITE = 18;
const FARB_SEGMENTE = 10;

export function nadelwinkel(zweifel) {
  if (zweifel < SCHWELLE_VORSICHT) return zweifel * GRAU_NADEL_MAX_GRAD;
  const anteil = (Math.min(zweifel, VOLL_AB_ZWEIFEL) - SCHWELLE_VORSICHT) / (VOLL_AB_ZWEIFEL - SCHWELLE_VORSICHT);
  return FARBIG_NADEL_START_GRAD + anteil * (BOGEN_GRAD - FARBIG_NADEL_START_GRAD);
}

function punkt(grad, radius) {
  const bogenmass = (grad * Math.PI) / 180;
  return {
    x: MITTE.x - radius * Math.cos(bogenmass),
    y: MITTE.y - radius * Math.sin(bogenmass),
  };
}

function bogen(vonGrad, bisGrad, klasse) {
  const start = punkt(vonGrad, RADIUS);
  const ende = punkt(bisGrad, RADIUS);
  return svgEl('path', {
    class: klasse,
    d: `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${ende.x} ${ende.y}`,
    fill: 'none',
    'stroke-width': BREITE,
  });
}

function farbsegmente() {
  const schritt = (BOGEN_GRAD - GRAU_GRAD) / FARB_SEGMENTE;
  return Array.from({ length: FARB_SEGMENTE }, (_, i) => {
    const segment = bogen(GRAU_GRAD + i * schritt, GRAU_GRAD + (i + 1) * schritt, 'segment');
    const rotanteil = Math.round((i / (FARB_SEGMENTE - 1)) * 100);
    segment.style.stroke = `color-mix(in srgb, var(--tacho-rot) ${rotanteil}%, var(--tacho-orange))`;
    return segment;
  });
}

function text(klasse, x, y, anker, inhalt) {
  return svgEl('text', { class: klasse, x, y, 'text-anchor': anker }, inhalt);
}

function schlageAus(nadel, winkel) {
  nadel.style.transform = 'rotate(0deg)';
  const setzeZiel = () => { nadel.style.transform = `rotate(${winkel}deg)`; };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) setzeZiel();
  else requestAnimationFrame(() => requestAnimationFrame(setzeZiel));
}

export function tacho(zweifel) {
  const nadelspitze = punkt(0, RADIUS - BREITE / 2 - 4);
  const nadel = svgEl('g', { class: 'nadel' },
    svgEl('line', {
      x1: MITTE.x,
      y1: MITTE.y,
      x2: nadelspitze.x,
      y2: nadelspitze.y,
      'stroke-width': 4,
      'stroke-linecap': 'round',
    }),
    svgEl('circle', { cx: MITTE.x, cy: MITTE.y, r: 7 }),
  );
  const zeichnung = svgEl('svg', {
    class: 'tacho',
    viewBox: '0 0 240 150',
    'aria-hidden': 'true',
    focusable: 'false',
  },
    bogen(0, GRAU_GRAD, 'grau'),
    ...farbsegmente(),
    text('zone', 6, 22, 'start', beschriftung.grauZone),
    text('skala', MITTE.x - RADIUS, 138, 'middle', beschriftung.links),
    text('skala', MITTE.x + RADIUS, 138, 'middle', beschriftung.rechts),
    nadel,
  );
  schlageAus(nadel, nadelwinkel(zweifel));
  return zeichnung;
}

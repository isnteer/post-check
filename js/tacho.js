import { el } from './dom.js';
import { SCHWELLE_VORSICHT } from './auswertung.js';
import { tacho as beschriftung } from './inhalt.js';

export const VOLL_AB_ZWEIFEL = 6;
export const BOGEN_GRAD = 180;
export const GRAU_GRAD = BOGEN_GRAD / 3;
const NADEL_ABSTAND_ZUR_GRENZE_GRAD = 6;
const GRAU_NADEL_MAX_GRAD = GRAU_GRAD - NADEL_ABSTAND_ZUR_GRENZE_GRAD;
const FARBIG_NADEL_START_GRAD = GRAU_GRAD + NADEL_ABSTAND_ZUR_GRENZE_GRAD;
const MITTE = { x: 120, y: 115 };
const RADIUS = 85;
const BREITE = 18;
const FARB_SEGMENTE = 10;

export function nadelwinkel(zweifel) {
  if (zweifel < SCHWELLE_VORSICHT) return zweifel * GRAU_NADEL_MAX_GRAD;
  const anteil = (Math.min(zweifel, VOLL_AB_ZWEIFEL) - SCHWELLE_VORSICHT) / (VOLL_AB_ZWEIFEL - SCHWELLE_VORSICHT);
  return FARBIG_NADEL_START_GRAD + anteil * (BOGEN_GRAD - FARBIG_NADEL_START_GRAD);
}

function koordinate(grad, radius) {
  const bogenmass = (grad * Math.PI) / 180;
  return {
    x: MITTE.x - radius * Math.cos(bogenmass),
    y: MITTE.y - radius * Math.sin(bogenmass),
  };
}

function bogen(vonGrad, bisGrad, klasse) {
  const start = koordinate(vonGrad, RADIUS);
  const ende = koordinate(bisGrad, RADIUS);
  return el('path', {
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

function text(klasse, x, y, anker, ...zeilen) {
  return el('text', { class: klasse, x, y, 'text-anchor': anker },
    ...zeilen.map((zeile, i) => el('tspan', { x, dy: i === 0 ? 0 : 12 }, i < zeilen.length - 1 ? `${zeile} ` : zeile)),
  );
}

function schlageAus(nadel, winkel) {
  nadel.style.transform = 'rotate(0deg)';
  const setzeZiel = () => { nadel.style.transform = `rotate(${winkel}deg)`; };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) setzeZiel();
  else requestAnimationFrame(() => requestAnimationFrame(setzeZiel));
}

export function tacho(zweifel) {
  const nadelspitze = koordinate(0, RADIUS - BREITE / 2 - 4);
  const nadel = el('g', { class: 'nadel' },
    el('line', {
      x1: MITTE.x,
      y1: MITTE.y,
      x2: nadelspitze.x,
      y2: nadelspitze.y,
      'stroke-width': 4,
      'stroke-linecap': 'round',
    }),
    el('circle', { cx: MITTE.x, cy: MITTE.y, r: 7 }),
  );
  const zeichnung = el('svg', {
    class: 'tacho',
    viewBox: '0 0 240 150',
    'aria-hidden': 'true',
    focusable: 'false',
  },
    bogen(0, GRAU_GRAD, 'grau'),
    ...farbsegmente(),
    text('zone', 4, 26, 'start', ...beschriftung.grauZone.split(' ')),
    text('skala', MITTE.x - RADIUS, 138, 'middle', beschriftung.links),
    text('skala', MITTE.x + RADIUS, 138, 'middle', beschriftung.rechts),
    nadel,
  );
  schlageAus(nadel, nadelwinkel(zweifel));
  return zeichnung;
}

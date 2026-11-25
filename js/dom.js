const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const SVG_TAGS = new Set(['svg', 'path', 'g', 'line', 'circle', 'text', 'tspan']);

export function el(tag, eigenschaften = {}, ...kinder) {
  const knoten = SVG_TAGS.has(tag)
    ? document.createElementNS(SVG_NAMESPACE, tag)
    : document.createElement(tag);
  for (const [name, wert] of Object.entries(eigenschaften)) {
    if (name.startsWith('on')) knoten.addEventListener(name.slice(2), wert);
    else knoten.setAttribute(name, wert);
  }
  knoten.append(...kinder);
  return knoten;
}

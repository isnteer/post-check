export function el(tag, eigenschaften = {}, ...kinder) {
  const knoten = document.createElement(tag);
  for (const [name, wert] of Object.entries(eigenschaften)) {
    if (name === 'class') knoten.className = wert;
    else if (name.startsWith('on')) knoten.addEventListener(name.slice(2), wert);
    else knoten.setAttribute(name, wert);
  }
  knoten.append(...kinder);
  return knoten;
}

export function svgEl(tag, eigenschaften = {}, ...kinder) {
  const knoten = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [name, wert] of Object.entries(eigenschaften)) knoten.setAttribute(name, wert);
  knoten.append(...kinder);
  return knoten;
}

function getHexFromRGB(r, g, b) {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

function getRandomColor() {
  return getHexFromRGB(
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  );
}

export {getHexFromRGB, getRandomColor};

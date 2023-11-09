declare module 'expo-processing'

interface Sketch {
  setup: () => void
  draw: () => void
}

interface Processing {
  b: number
  blurKernel: null
  blurKernelSize: number
  blurRadius: number
  breakShape: boolean
  childNodes: any
  cLL: number
  cLR: number
  contextId: number
  cUL: number
  cUR: number
  drawingBufferHeight: number
  drawingBufferWidth: number
  externals: any
  fillStyle: any
  focused: boolean
  font: string
  fracU: number
  fracV: number
  frameCount: number
  g: number
  glyphTable: any
  height: number
  id: string
  ifU: number
  ifV: number
  ih1: number
  imageCache: any
  imageData: any
  iw: number
  iw1: number
  key: any
  keyCode: any
  lineCap: Processing
  lineJoin: any
  ll: number
  localName: string
  lr: number
  mouseButton: number
  mouseClicked: any
  mouseDragged: any
  mouseMoved: any
  mouseOut: any
  mouseOver: any
  mousePressed: any
  mouseReleased: any
  mouseScroll: number
  mouseScrolled: any
  mouseX: number
  mouseY: number
  name: string
  options: any
  params: any
  pmouseX: number
  pmouseY: number
  r: number
  shared: any
  sourceCode: any
  srcBuffer: null
  srcXOffset: number
  srcYOffset: number
  strokeStyle: any
  style: any
  supportsWebGL2: boolean
  sX: number
  sY: number
  touchCancel: any
  touchEnd: any
  touchMove: any
  touchStart: any
  transform: any
  u1: number
  u2: number
  ul: number
  ur: number
  use3DContext: boolean
  v1: number
  v2: number
  width: number
  window: any

  Char: () => any
  Character: () => any
  PImage: () => any
  PMatrix2D: () => any
  PMatrix3D: () => any
  PMatrixStack: () => any
  
  abs: () => any
  acos: () => any
  alpha: () => any
  ambient: () => any
  ambientLight: () => any
  append: () => any
  applyMatrix: () => any
  arc: () => any
  arrayCopy: () => any
  asin: () => any
  atan: () => any
  atan2: () => any
  background: (color: number | string, c2?: number, c3?: number) => any
  beginCamera: () => any
  beginDraw: () => any
  beginShape: () => any
  bezier: () => any
  bezierDetail: () => any
  bezierPoint: () => any
  bezierTangent: () => any
  bezierVertex: () => any
  binary: () => any
  blend: () => any
  blendColor: () => any
  blit_resize: () => any
  blue: () => any
  box: () => any
  brightness: () => any
  camera: () => any
  ceil: () => any
  color: () => any
  colorMode: () => any
  concat: () => any
  constrain: () => any
  constructor: () => any
  copy: () => any
  cos: () => any
  createFont: () => any
  createGraphics: () => any
  createImage: () => any
  cursor: () => any
  curve: () => any
  curveDetail: () => any
  curvePoint: () => any
  curveTangent: () => any
  curveTightness: () => any
  curveVertex: () => any
  day: () => any
  degrees: () => any
  directionalLight: () => any
  disableContextMenu: () => any
  dist: () => any
  draw: () => any
  ellipse: () => any
  ellipseMode: () => any
  emissive: () => any
  enableContextMenu: () => any
  endCamera: () => any
  endDraw: () => any
  endShape: () => any
  exit: () => any
  exp: () => any
  expand: () => any
  addEventListener: () => any
  appendChild: () => any
  attachEvent: () => any
  getAttribute: () => any
  getContext: () => any
  hasAttribute: () => any
  onblur: () => any
  onfocus: () => any
  onmousedown: () => any
  removeChild: () => any
  setAttribute: () => any
  toDataURL: () => any
  getAttribLocation: () => any
  getUniformLocation: () => any
  attach: () => any
  attachFunction: () => any
  onExit: () => any
  onFrameEnd: () => any
  onFrameStart: () => any
  onLoad: () => any
  onLoop: () => any
  onPause: () => any
  onSetup: () => any
  toString: () => any
  fill: () => any
  filter: () => any
  floor: () => any
  frameRate: () => any
  frustum: () => any
  get: () => any
  glyphLook: () => any
  green: () => any
  hex: () => any
  hint: () => any
  hour: () => any
  hue: () => any
  image: () => any
  imageMode: () => any
  intersect: () => any
  join: () => any
  keyPressed: () => any
  keyReleased: () => any
  keyTyped: () => any
  lerp: () => any
  lerpColor: () => any
  lightFalloff: () => any
  lightSpecular: () => any
  lights: () => any
  line: (x1: number, y1: number, x2: number, y2: number) => any
  link: () => any
  loadBytes: () => any
  loadFont: () => any
  loadGlyphs: () => any
  loadImage: () => any
  loadPixels: () => any
  loadShape: () => any
  loadStrings: () => any
  loadXML: () => any
  log: () => any
  loop: () => any
  mag: () => any
  map: () => any
  match: () => any
  matchAll: () => any
  max: () => any
  millis: () => any
  min: () => any
  minute: () => any
  mix: () => any
  modelX: () => any
  modelY: () => any
  modelZ: () => any
  add: () => any
  blend: () => any
  burn: () => any
  darkest: () => any
  difference: () => any
  dodge: () => any
  exclusion: () => any
  hard_light: () => any
  lightest: () => any
  multiply: () => any
  overlay: () => any
  replace: () => any
  screen: () => any
  soft_light: () => any
  subtract: () => any
  month: () => any
  nf: () => any
  nfc: () => any
  nfp: () => any
  nfs: () => any
  noCursor: () => any
  noFill: () => any
  noLights: () => any
  noLoop: () => any
  noSmooth: () => any
  noStroke: () => any
  noTint: () => any
  noise: () => any
  noiseDetail: () => any
  noiseSeed: () => any
  norm: () => any
  normal: () => any
  ortho: () => any
  param: () => any
  parseBoolean: () => any
  parseByte: () => any
  parseChar: () => any
  parseFloat: () => any
  parseInt: () => any
  parseXML: () => any
  peg: () => any
  perspective: () => any
  getLength: () => any
  getPixel: () => any
  set: () => any
  setPixel: () => any
  toArray: () => any
  point: () => any
  pointLight: () => any
  popMatrix: () => any
  popStyle: () => any
  pow: () => any
  print: () => any
  printCamera: () => any
  printMatrix: () => any
  printProjection: () => any
  println: () => any
  pushMatrix: () => any
  pushStyle: () => any
  quad: () => any
  radians: () => any
  random: () => any
  randomGaussian: () => any
  randomSeed: () => any
  rect: () => any
  rectMode: () => any
  red: () => any
  redraw: () => any
  requestImage: () => any
  resetMatrix: () => any
  reverse: () => any
  rotate: () => any
  rotateX: () => any
  rotateY: () => any
  rotateZ: () => any
  round: () => any
  saturation: () => any
  save: () => any
  saveFrame: () => any
  saveStrings: () => any
  scale: () => any
  screenX: () => any
  screenY: () => any
  screenZ: () => any
  second: () => any
  set: () => any
  setup: () => any
  shape: () => any
  shapeMode: () => any
  shearX: () => any
  shearY: () => any
  shininess: () => any
  shorten: () => any
  sin: () => any
  size: () => any
  smooth: () => any
  sort: () => any
  specular: () => any
  sphere: () => any
  sphereDetail: () => any
  splice: () => any
  split: () => any
  splitTokens: () => any
  spotLight: () => any
  sq: () => any
  sqrt: () => any
  status: () => any
  str: () => any
  stroke: () => any
  strokeCap: () => any
  strokeJoin: () => any
  strokeWeight: () => any
  subset: () => any
  tan: () => any
  text: () => any
  textAlign: () => any
  textAscent: () => any
  textDescent: () => any
  textFont: () => any
  textLeading: () => any
  textMode: () => any
  textSize: () => any
  textWidth: () => any
  texture: () => any
  textureMode: () => any
  tint: () => any
  toImageData: () => any
  translate: () => any
  triangle: () => any
  trim: () => any
  unbinary: () => any
  unhex: () => any
  updatePixels: () => any
  vertex: () => any
  year: () => any
}
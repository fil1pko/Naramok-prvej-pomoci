window.addEventListener('load', init, false);
function init() {
  createWorld();
  createPrimitive();
  animation();
}

var Theme = {secundary: 2500134}
var Sizew = {sirka: 500 }
var Sizeh = {vyska: 500 }

var scene, camera, renderer;
var _width, _height;
var shapeGroup = new THREE.Group();
var start = Date.now();

function createWorld() {
  _width = Sizew.sirka;
  _height= Sizeh.vyska;
  // _width = window.innerWidth / 5.5;
  // _height = window.innerHeight / 2.5;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(Theme.secundary);
  camera = new THREE.PerspectiveCamera(35, _width/_height, 1, 1000);
  camera.position.set(0,0,16);
  renderer = new THREE.WebGLRenderer({antialias:false, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  document.getElementById("blobox").appendChild(renderer.domElement);
}
var primitiveElement = function() {
  this.mesh = new THREE.Object3D();
  mat = new THREE.ShaderMaterial( {
    side:THREE.DoubleSide,
    uniforms: {
      time: {value: 0.1},
      pointscale: {value: 0.2},
      decay: {value: 0.3},
      size: {value: 0.3},
      displace: {value: 0.3},
      complex: {value: 0.0},
      waves: {value: 0.10},
      eqcolor: {value: 1.0},
      rcolor: {value: 1.0},
      gcolor: {value: 1.0},
      bcolor: {value: 1.0},
      fragment: {value: true},
      redhell: {value: true}},
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });
  var geo = new THREE.IcosahedronBufferGeometry(2, 6);
  var wir = new THREE.IcosahedronBufferGeometry(2.3, 2);
  this.shape = new THREE.Mesh(geo, mat);
  this.point = new THREE.Points(wir, mat);
  shapeGroup.add(this.point);
  shapeGroup.add(this.shape);
  scene.add(shapeGroup);
}
function createPrimitive() {
  _primitive = new primitiveElement();
}
function animation() {
  var performance = Date.now() * 0.003;
  _primitive.point.visible = false;
  mat.uniforms['time'].value = (0.1 / 1000) * (Date.now() - start);
  mat.uniforms['pointscale'].value =    1.0;
  mat.uniforms['decay'].value =         1.20;
  mat.uniforms['size'].value =          0.69;
  mat.uniforms['displace'].value =      0.16;
  mat.uniforms['complex'].value =       0.50;
  mat.uniforms['waves'].value =         3.7;
  mat.uniforms['fragment'].value =      true;
  mat.uniforms['redhell'].value =       true;
  mat.uniforms['eqcolor'].value =       10.0;
  mat.uniforms['rcolor'].value =        2.5;
  mat.uniforms['gcolor'].value =        1.2;
  mat.uniforms['bcolor'].value =        0.2;
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
}

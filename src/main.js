import * as THREE from 'three';
import createPlane from './plane';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
// Crear la camara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear el render
const canvas = document.getElementById('myCanvas')
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);


// Añadir el plano
const plane = createPlane();
scene.add(plane);

// Posición de la camara
camera.position.set(0, 5, 200);

// Configurar los controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
    requestAnimationFrame(animate);
	controls.update();
    renderer.render(scene, camera);
}
animate()
import * as THREE from 'three';
import createPlane from './plane';

// Crear la escena
const scene = new THREE.Scene();

// Crear la camara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear el render
const canvas = document.getElementById('myCanvas')
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

// Añadir el plano
const plane = createPlane();
scene.add(plane);

// Posición de la camara
camera.position.set(0, 10, 30);


function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate()
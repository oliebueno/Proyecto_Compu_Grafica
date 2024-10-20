import * as THREE from 'three';
import createPlane from './plane';
import createTankBody from './tank';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Crear la escena
const scene = new THREE.Scene();

// Cargar la imagen de fondo
const loader = new THREE.TextureLoader();
loader.load('src/texture/cielo.jpg', function(texture) {
    scene.background = texture;
});

// Crear la camara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear el render
const canvas = document.getElementById('myCanvas')
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


// Añadir el plano
const plane = createPlane();
plane.receiveShadow = true;
scene.add(plane);


const tankBody = createTankBody();
tankBody.position.set(0, 10, 0);
tankBody.castShadow = true;
scene.add(tankBody);

// Añadir luz ambiental
const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

// Añadir luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); 
directionalLight.position.set(50, 130, 500);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Visualizar la cámara de sombras
const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(shadowHelper);


// Posición de la camara
camera.position.set(0, 150, 400);
camera.lookAt(new THREE.Vector3(0, 0, 0)); 

// Configurar los controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Captura de eventos del teclado
const keyStates = {};

document.addEventListener('keydown', (event) => {
    keyStates[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keyStates[event.code] = false;
});

function animate() {
    requestAnimationFrame(animate);

    // Movimiento del tanque
    if (keyStates['ArrowUp']) {
        tankBody.translateZ(-1);
    }
    if (keyStates['ArrowDown']) {
        tankBody.translateZ(1);
    }
    if (keyStates['ArrowLeft']) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.05);
        tankBody.applyQuaternion(quaternion);
    }
    if (keyStates['ArrowRight']) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -0.05);
        tankBody.applyQuaternion(quaternion);
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();
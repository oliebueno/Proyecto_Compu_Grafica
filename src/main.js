import * as THREE from 'three';
import createPlane from './plane';
import createTankBody from './tank';
import createObjective1 from './objective1';
import createObjective2 from './objective2';
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
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// Añadir el plano
const plane = createPlane();
plane.receiveShadow = true;
scene.add(plane);

// Añadir el tanque
const tankBody = createTankBody();
tankBody.position.set(0, 8, 0);
tankBody.castShadow = true;
scene.add(tankBody);

// Añadir el objective1

const Objective1Body = createObjective1();
Objective1Body.position.set(45, 8, -70);
Objective1Body.castShadow = true;
scene.add(Objective1Body);

// Añadir el objective2

const Objective2Body = createObjective2();
Objective2Body.position.set(-48,0, 70);
Objective2Body.castShadow = true;
scene.add(Objective2Body);

// Añadir luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Añadir luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-350, 300, 100);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 10;
directionalLight.shadow.camera.far = 1000;
directionalLight.shadow.camera.left = -250;
directionalLight.shadow.camera.right = 250;
directionalLight.shadow.camera.top = 250;
directionalLight.shadow.camera.bottom = -250;
scene.add(directionalLight);

// Visualizar la cámara de sombras (opcional)
const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(shadowHelper);

// Añadir una luz puntual para asegurarse de que las sombras están correctamente configuradas
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(0, 50, 50);
pointLight.castShadow = true;
scene.add(pointLight);

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
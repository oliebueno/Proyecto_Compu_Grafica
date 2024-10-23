import * as THREE from 'three';
import createPlane from './plane';
import createTankBody from './tank';
import createObjective1 from './objective1';
import createObjective2 from './objective2';
import createObjective3 from './objective3';
import { createLinearBullet, createGravityBullet } from './bullets';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const MAX_ROTATION_X = Math.PI / 2; 
const MIN_ROTATION_X = -Math.PI / 2;

const bullets = [];

// Crear la escena
const scene = new THREE.Scene();

// Cargar la imagen de fondo
const loader = new THREE.TextureLoader();
loader.load('src/texture/cielo.jpg', function(texture) {
    scene.background = texture;
});

// Crear la camara
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);

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
const {tankBody, turret, cannon, mountPoint} = createTankBody();
tankBody.position.set(0, 18, 450);
tankBody.castShadow = true;
scene.add(tankBody);

// Añadir el objective1
const Objective1Body = createObjective1();
Objective1Body.position.set(121, 50, -70);
Objective1Body.castShadow = true;
scene.add(Objective1Body);

// Añadir el objective1_2
const Objective1_2Body = createObjective1();
Objective1_2Body.position.set(121, 50, 100);
Objective1_2Body.castShadow = true;
scene.add(Objective1_2Body);

// Añadir el objective1_3
const Objective1_3Body = createObjective1();
Objective1_3Body.position.set(121, 50, 270);
Objective1_3Body.castShadow = true;
scene.add(Objective1_3Body);

// Añadir el objective2
const Objective2Body = createObjective2();
Objective2Body.position.set(-300, 0, -300);
Objective2Body.castShadow = true;
scene.add(Objective2Body);

// Añadir el objective3
const Objective3Body = createObjective3();
Objective3Body.position.set(-121, 50, 100);
Objective3Body.castShadow = true;
scene.add(Objective3Body);

// Añadir el objective3_2
const Objective3_2Body = createObjective3();
Objective3_2Body.position.set(-121, 50, 270);
Objective3_2Body.castShadow = true;
scene.add(Objective3_2Body);



// Añadir luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Añadir luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-350, 300, -50);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 10;
directionalLight.shadow.camera.far = 1000;
directionalLight.shadow.camera.left = -600;
directionalLight.shadow.camera.right = 600;
directionalLight.shadow.camera.top = 600;
directionalLight.shadow.camera.bottom = -600;
scene.add(directionalLight);

// Visualizar la cámara de sombras
const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(shadowHelper);

// Añadir una luz puntual para asegurarse de que las sombras están correctamente configuradas
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(0, 50, 50);
pointLight.castShadow = true;
scene.add(pointLight);

// Posición de la cámara
camera.position.set(0, 300, 1000);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Configurar los controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Función para disparar una bala
function shootBullet(type) {
    let bullet;
    if (type === 'linear') {
        bullet = createLinearBullet(mountPoint);
    } else if (type === 'gravity') {
        bullet = createGravityBullet(mountPoint);
    }
    bullets.push(bullet);
    scene.add(bullet);
}

function updateBullets() {
    bullets.forEach((bullet, index) => {
        if (bullet.type === 'linear') {
            bullet.translateZ(-5);
        } else if (bullet.type === 'gravity') {
            bullet.position.add(bullet.velocity.clone().multiplyScalar(0.1));
            bullet.velocity.add(bullet.gravity.clone().multiplyScalar(0.1));
			// Calcular la dirección del movimiento
			const direction = bullet.velocity.clone().normalize();
			// Calculo de la rotación necesaria  para que la bala apunte  en la dirección del movimiento
            const up = new THREE.Vector3(0, 0, -1);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
            
            // Aplicar la rotación a la pirámide
            bullet.quaternion.copy(quaternion);

        }

        // Eliminar la bala si está demasiado lejos
        if (bullet.position.length() > 1000) {
            scene.remove(bullet);
            bullets.splice(index, 1);
        }
    });
}


// Captura de eventos del teclado
const keyStates = {};
document.addEventListener('keydown', (event) => { keyStates[event.code] = true; });
document.addEventListener('keyup', (event) => { keyStates[event.code] = false; });

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyQ') { // Tecla L para disparar bala lineal
        shootBullet('linear');
    } else if (event.code === 'KeyE') { // Tecla G para disparar bala con gravedad
        shootBullet('gravity');
    }
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
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.05); // Rotación alrededor del eje Y
        tankBody.applyQuaternion(quaternion);
    }
    if (keyStates['ArrowRight']) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -0.05); // Rotación alrededor del eje Y
        tankBody.applyQuaternion(quaternion);
    }

    // Rotar la torreta
    if (keyStates['KeyA']) { // Tecla A para rotar a la izquierda
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.04);
        turret.quaternion.multiplyQuaternions(quaternion, turret.quaternion);
    }
    if (keyStates['KeyD']) { // Tecla D para rotar a la derecha
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -0.04);
        turret.quaternion.multiplyQuaternions(quaternion, turret.quaternion);
    }

	// Rotar y limitar la rotación del cañón
	if (keyStates['KeyW']) { // Tecla W para mover el cañón hacia arriba
		if (cannon.rotation.x + 0.04 <= MAX_ROTATION_X) {
			cannon.rotation.x += 0.04;
		}
	}
	if (keyStates['KeyS']) { // Tecla S para mover el cañón hacia abajo
		if (cannon.rotation.x - 0.04 >= MIN_ROTATION_X) {
			cannon.rotation.x -= 0.04;
		}
	}
	
	updateBullets();
    controls.update();
    renderer.render(scene, camera);
}
animate();
import * as THREE from 'three';
import createPlane from './plane';
import createTankBody from './tank';
import createObjective1 from './objective1';
import createObjective2 from './objective2';
import createObjective3 from './objective3';
import createOval from './ballon';
import { createLinearBullet, createGravityBullet } from './bullets';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


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

// Añadir blanco 1
const ballon_1 = createOval()
ballon_1.position.set(0, 80, 0);
ballon_1.castShadow = true;
ballon_1.box = new THREE.Box3().setFromObject(ballon_1);
scene.add(ballon_1);

// Añadir blanco 2
const ballon_2 = createOval()
ballon_2.position.set(110, 180, -50);
ballon_2.castShadow = true;
ballon_2.box = new THREE.Box3().setFromObject(ballon_2);
scene.add(ballon_2);

// Añadir blanco 3
const ballon_3 = createOval()
ballon_3.position.set(-310, 180, -150);
ballon_3.castShadow = true;
ballon_3.box = new THREE.Box3().setFromObject(ballon_3);
scene.add(ballon_3);

// Añadir blanco
const ballon_4 = createOval()
ballon_4.position.set(410, 380, -200);
ballon_4.castShadow = true;
ballon_4.box = new THREE.Box3().setFromObject(ballon_4);
scene.add(ballon_4);

// Añadir blanco
const ballon_5 = createOval()
ballon_5.position.set(-310, 380, 250);
ballon_5.castShadow = true;
ballon_5.box = new THREE.Box3().setFromObject(ballon_5);
scene.add(ballon_5);

// Arreglo de globlos
const balloons = [];

// Añadir globos
balloons.push(ballon_1);
balloons.push(ballon_2);
balloons.push(ballon_3);
balloons.push(ballon_4);
balloons.push(ballon_5);

// Añadir luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
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

// Función para detectar colisiones
function checkCollisionAABB(box1, box2) {
    // Verificar colisión en el eje X
    const collisionX = box1.max.x >= box2.min.x && box2.max.x >= box1.min.x;
    // Verificar colisión en el eje Y
    const collisionY = box1.max.y >= box2.min.y && box2.max.y >= box1.min.y;
    // Verificar colisión en el eje Z
    const collisionZ = box1.max.z >= box2.min.z && box2.max.z >= box1.min.z;

    return collisionX && collisionY && collisionZ;
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.box = new THREE.Box3().setFromObject(bullet);

        if (bullet.type === 'linear') {
            bullet.position.add(bullet.velocity.clone());
        } else if (bullet.type === 'gravity') {
            bullet.position.add(bullet.velocity.clone().multiplyScalar(0.1));
            bullet.velocity.add(bullet.gravity.clone().multiplyScalar(0.1));
            const direction = bullet.velocity.clone().normalize();
            const up = new THREE.Vector3(0, 0, -1);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
            bullet.quaternion.copy(quaternion);
        }

        // Comprobar colisiones con globos
        for (let j = balloons.length - 1; j >= 0; j--) {
            const balloon = balloons[j];
            balloon.box.setFromObject(balloon);
            if (checkCollisionAABB(bullet.box, balloon.box)) {
                // Manejar la colisión
				balloonSound.currentTime = 0;
				balloonSound.play();
                scene.remove (bullet);
                bullets.splice(i, 1);
                scene.remove(balloon);
                balloons.splice(j, 1);
            }
        }

        // Eliminar la bala si está demasiado lejos
        if (bullet.position.length() > 1000) {
            scene.remove(bullet);
            bullets.splice(i, 1); 
        }
    }
}


// Captura de eventos del teclado
const keyStates = {};
document.addEventListener('keydown', (event) => { keyStates[event.code] = true; });
document.addEventListener('keyup', (event) => { keyStates[event.code] = false; });



function animate() {
    requestAnimationFrame(animate);
    let moveTank = true;
    const tankBox = new THREE.Box3().setFromObject(tankBody); // Actualizar bounding box del tanque

    // Movimiento del tanque
    let isMoving = false;

    if (keyStates['ArrowUp']) {
        tankBody.translateZ(-1);

    }
    if (keyStates['ArrowLeft']) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.03);
        tankBody.applyQuaternion(quaternion);
    }
    if (keyStates['ArrowRight']) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -0.03);
        tankBody.applyQuaternion(quaternion);
    }

    // Reproducir o detener el sonido
    if (isMoving) {
        if (tankSound.paused) {
            tankSound.play();
        }
    } else {
        if (!tankSound.paused) {
            tankSound.pause(); 
            tankSound.currentTime = 0;
        }
    }

    // Rotar la torreta
    if (keyStates['KeyA']) { // Tecla A para rotar a la izquierda
        const quaternion = new THREE.Quaternion();

        turret.quaternion.multiplyQuaternions(quaternion, turret.quaternion);
    }

	// Rotar y limitar la rotación del cañón
	if (keyStates['KeyW']) { // Tecla W para mover el cañón hacia arriba

    controls.update();
    renderer.render(scene, camera);
}
animate();
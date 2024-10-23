import * as THREE from 'three';
import createTurret from './torreta';
import createCannon from './cannon';
import createCaterpillar from './orugas';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

// Cuerpo del tanque

const createTankBody = () => {
	const tankBodyGeometry = new THREE.BufferGeometry();
	const tankBodyVertices = new Float32Array([
 // Vertices del cuerpo del tanque
        // Cara trasera
        -15, -8, 0,   15, -8, 0,  -15, 8, 0,
        15, -8, 0,  -15, 8, 0,   15, 8, 0,
        // Cara delantera
        -15, -8, -40,   15, -8, -40,  -15, 8, -40, 
        15, -8, -40,  -15, 8, -40,   15, 8, -40,
        // Cara inferior
        -15, -8, 0,   15, -8, 0,  -15, -8, -40,
        15, -8, 0,  -15, -8, -40,   15, -8, -40,
        // Cara superior
        -15, 8, 0,   15, 8, 0,  -15, 8, -40,
        15, 8, 0,  -15, 8, -40,   15, 8, -40,
        // Cara izquierda
        -15, -8, 0,  -15, 8, 0,  -15, -8, -40,
        -15, 8, 0,  -15, -8, -40,  -15, 8, -40,
        // Cara derecha
        15, -8, 0,  15, 8, 0,  15, -8, -40,
        15, 8, 0,  15, -8, -40,  15, 8, -40
    ]);

	const tankUVs = new Float32Array([
		// Coordenadas UV para cada triángulo
		// Cara frontal
		0, 0,  0, -1,  -1, 0,
		1, 0,  0, 1,  0, 0,
		// Cara trasera
		0, 0,  0, -1,  -1, 0,
		1, 0,  0, 1,  0, 0,
	
		// Cara inferior
		0, 0,  1, 0,  0, 1,
		1, 0,  0, 1,  1, 1,
	
		// Cara superior
		0, 0,  1, 0,  0, 1,
		1, 0,  0, 1,  1, 1,
	
		// Cara izquierda
		0, 0,  1, 0,  0, 1,
		1, 0,  0, 1,  1, 1,
	
		// Cara derecha
		0, 0,  1, 0,  0, 1,
		1, 0,  0, 1,  1, 1
	]);

	tankBodyGeometry.setAttribute('position', new THREE.BufferAttribute(tankBodyVertices, 3));
	tankBodyGeometry.setAttribute('uv', new THREE.BufferAttribute(tankUVs, 2));

	// Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/tank.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

	// Material del cuerpo del tanque
	const tankBodyMaterial = new THREE.MeshStandardMaterial({ map: texture_1, side: THREE.DoubleSide});
	const tankBody = new THREE.Mesh(tankBodyGeometry, tankBodyMaterial);

    // Añadir caja de colisión
    tankBody.geometry.computeBoundingBox();
    tankBody.boundingBox = new THREE.Box3().setFromObject(tankBody);
	
	// Crear torreta
	const turret = createTurret();
	tankBody.add(turret);
	

	// Crear cañon
	const {cannon, mountPoint} = createCannon();
    turret.add(cannon);

	// Crear orugas
	const {caterpillarD, caterpillarI} = createCaterpillar();
    tankBody.add(caterpillarD);
	tankBody.add(caterpillarI);

	return { tankBody, turret, cannon, mountPoint};
}

export default createTankBody;
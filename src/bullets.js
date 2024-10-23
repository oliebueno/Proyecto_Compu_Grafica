import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createForm = () => {
    const bulletBodyGeometry = new THREE.BufferGeometry();

    // Definir los vértices de la pirámide
	const bulletBodyVertices = new Float32Array([
		// Base de la pirámide
		-3, -3, 0,    3, -3, 0,   3, 3, 0,
		-3, -3, 0,    3, 3, 0,   -3, 3, 0,
		// Cara 1
		-3, -3, 0,    3, -3, 0,   0, 0, -10, 
		// Cara 2
		3, -3, 0,     3, 3, 0,    0, 0, -10,  
		// Cara 3
		3, 3, 0,     -3, 3, 0,    0, 0, -10,  
		// Cara 4
		-3, 3, 0,    -3, -3, 0,   0, 0, -10  
	]);

    const bulletBodyUVs = new Float32Array([
        // Coordenadas UV para cada triángulo
        // Base de la pirámide
        0, 0,  1, 0,  1, 1,
        0, 0,  1, 1,  0, 1,

        // Cara 1
        0, 0,  1, 0,  0.5, 1,

        // Cara 2
        0, 0,  1, 0,  0.5, 1,

        // Cara 3
        0, 0,  1, 0,  0.5, 1,

        // Cara 4
        0, 0,  1, 0,  0.5, 1
    ]);

    bulletBodyGeometry.setAttribute('position', new THREE.BufferAttribute(bulletBodyVertices, 3));
    bulletBodyGeometry.setAttribute('uv', new THREE.BufferAttribute(bulletBodyUVs, 2));

    // Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/piramide.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Crear el material de la pirámide utilizando MeshPhongMaterial
    const bulletBodyMaterial = new THREE.MeshPhongMaterial({ map: texture_1, side: THREE.DoubleSide });
    const bulletBody = new THREE.Mesh(bulletBodyGeometry, bulletBodyMaterial);

    return bulletBody;

}
// Se crea la bala con movimiento rectilineaexport function createLinearBullet(mountPoint) {
	export function createLinearBullet(mountPoint) {
		const lBullet = createForm();
		lBullet.position.copy(mountPoint.getWorldPosition(new THREE.Vector3()));
		lBullet.quaternion.copy(mountPoint.getWorldQuaternion(new THREE.Quaternion()));
		lBullet.type = 'linear';
		
		return lBullet;
	}

// Se crea la bala con movimiento parabolico
export function createGravityBullet(mountPoint) {
    const gBullet = createForm();
	gBullet.position.copy(mountPoint.getWorldPosition(new THREE.Vector3()));
	gBullet.quaternion.copy(mountPoint.getWorldQuaternion(new THREE.Quaternion()));
    gBullet.velocity = new THREE.Vector3(0, 0, -90).applyQuaternion(gBullet.quaternion);
    gBullet.gravity = new THREE.Vector3(0, -9.81, 0);
    gBullet.type = 'gravity';
    return gBullet;
}
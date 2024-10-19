import * as THREE from 'three';

// Crear un plano
const createPlane = () => {
	const geometry = new THREE.PlaneGeometry(1000, 1000, 5, 5);
	const texture_1 = new THREE.TextureLoader().load('texture/Grass.png')
	texture_1.wrapS = THREE.RepeatWrapping;
	texture_1.wrapT = THREE.RepeatWrapping;
	texture_1.repeat.set(5, 5);
    const material = new THREE.MeshBasicMaterial({ map: texture_1, side: THREE.DoubleSide});
    const plane = new THREE.Mesh(geometry, material);
	plane.rotation.x = -Math.PI / 2;

    return plane;

}

export default createPlane;
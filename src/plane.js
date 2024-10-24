import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

// Crear un plano
const createPlane = () => {
	const geometry = new THREE.PlaneGeometry(1000, 1000, 40, 40);
	const loaderDDS = new DDSLoader();

	// Textura 1: Grama baja de mar
	const texture_1 = loaderDDS.load('src/texture/bottom_sea1b.dds');
	texture_1.wrapS = THREE.RepeatWrapping;
	texture_1.wrapT = THREE.RepeatWrapping;
	texture_1.repeat.set(1, 1);

	// Textura 2: Grama con arena
	const texture_2 = loaderDDS.load('src/texture/bottom_sea1.dds')
	texture_2.wrapS = THREE.RepeatWrapping;
	texture_2.wrapT = THREE.RepeatWrapping;
	texture_2.repeat.set(1, 1);

	// Textura 3: Asfalto
	const texture_3 = loaderDDS.load('src/texture/asfalt_road_q3_dark.dds')
	texture_3.wrapS = THREE.RepeatWrapping;
	texture_3.wrapT = THREE.RepeatWrapping;
	texture_3.repeat.set(1, 1);
	console.log(texture_1);

	// Textura 3: Arena
	const texture_4 = loaderDDS.load('src/texture/bottom_sea1a.dds')
	texture_4.wrapS = THREE.RepeatWrapping;
	texture_4.wrapT = THREE.RepeatWrapping;
	texture_4.repeat.set(1, 1);
	console.log(texture_4);


	// Se crean materiales para cada textura
	const materials = [
		new THREE.MeshStandardMaterial({ map: texture_1, side: THREE.DoubleSide}), // Textura 0
		new THREE.MeshStandardMaterial({ map: texture_2, side: THREE.DoubleSide}), // Textura 1
		new THREE.MeshStandardMaterial({ map: texture_3, side: THREE.DoubleSide}), // Textura 2
		new THREE.MeshStandardMaterial({ map: texture_4, side: THREE.DoubleSide}), // Textura 3

	]
	
	// Se asignan los materiales
    const plane = new THREE.Mesh(geometry, materials);
	plane.rotation.x = -Math.PI / 2;


	// Se divide el plano en segmentos y se asignan los materiales
    geometry.clearGroups();

	for(let i = 1 ; i < 41; i++) {
		//Rellena con grama de mar
		geometry.addGroup((i-1)*40*6, 40*6, 0);
		// Rellena la carretera horizontal
		geometry.addGroup(i*16*6 + (i-1)*24*6, 8*6, 2);
	}

	// Rellena la carretera vertical
	for(let i = 17 ; i < 22; i++) {
		geometry.addGroup((i-1)*40*6, 18*6, 2);
	}

	// Rellena la parte de la piramide
	for(let i = 0 ; i < 17; i++) {
		geometry.addGroup((i-1)*40*6, 16*6, 3);
	}

	// Rellena la parte de los edificios azules
	for(let i = 17 ; i < 40; i++) {
		geometry.addGroup((i-1)*40*6, 16*6, 1);
	}
    
    return plane;

}
export default createPlane;
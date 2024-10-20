import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

// Crear un plano
const createPlane = () => {
	const geometry = new THREE.PlaneGeometry(300, 500, 40, 40);
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

	// Textura 2: Asfalto
	const texture_3 = loaderDDS.load('src/texture/asfalt_road_q3_dark.dds')
	texture_3.wrap4 = THREE.RepeatWrapping;
	texture_3.wrap4 = THREE.RepeatWrapping;
	texture_3.repeat.set(1, 1);



	// Se crean materiales para cada textura
	const materials = [
		new THREE.MeshBasicMaterial({ map: texture_1, side: THREE.DoubleSide}), // Textura 0
		new THREE.MeshBasicMaterial({ map: texture_2, side: THREE.DoubleSide}), // Textura 1
		new THREE.MeshBasicMaterial({ map: texture_3, side: THREE.DoubleSide}), // Textura 2

	]
	
	// Se asignan los materiales
    const plane = new THREE.Mesh(geometry, materials);


	// Se divide el plano en segmentos y se asignan los materiales
    geometry.clearGroups();

	for(let i = 1 ; i < 41; i++) {
		//Rellena con grama de mar
		geometry.addGroup((i-1)*40*6, 30*6, 0);
		// Rellena la carretera horizontal
		geometry.addGroup(i*16*6 + (i-1)*24*6, 8*6, 2);
		//Rellena con grama de mar y arena
		geometry.addGroup(i*30*6 + (i-1)*10*6, 10*6, 1);
	}

	// Rellena la carretera vertical
	for(let i = 17 ; i < 22; i++) {
		geometry.addGroup((i-1)*40*6, 18*6, 2);
	}

    

    
    return plane;

}

export default createPlane;
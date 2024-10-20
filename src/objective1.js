import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';


const createObjective1 = () => {
	const Objective1BodyGeometry = new THREE.BufferGeometry();
    const loaderDDS = new DDSLoader();
    // Textura 1: Grama baja de mar
	const texture_1 = loaderDDS.load('src/texture/bottom_sea1b.dds');
	texture_1.wrapS = THREE.RepeatWrapping;
	texture_1.wrapT = THREE.RepeatWrapping;
	texture_1.repeat.set(1, 1);
	const Objective1BodyVertices = new Float32Array([
		// Vertices del objetivo1
		-8, -8, 8,    // V0: Vértice inferior izquierdo tracero
		8, -8, 8,     // V1: Vértice inferior derecho tracero
		-8, 8, 8,     // V2: Vértice superior derecho tracero
		8, 8, 8,      // V3: Vértice superior izquierdo tracero
		-8, -8, -8,  // V4: Vértice inferior izquierdo delantero
		8, -8, -8,   // V5: Vértice inferior derecho delantero
		-8, 8, -8,   // V6: Vértice superior derecho delantero
		8, 8, -8,    // V7: Vértice superior izquierdo delantero

	]);
    const Objective1BodyFace = new Uint16Array([
		// Caras del cuerpo del Objective1
		0, 1, 2,  1, 2, 3, // cara trasera
		4, 5, 6,  5, 6, 7, // cara delantera
		0, 1, 4,  1, 4, 5, // cara inferior
		2, 3, 6,  3, 6, 7, // cara superior
		0, 2, 4,  2, 4, 6, // cara izquierdo
		1, 3, 5,  3, 5, 7, // cara derecha

	]);
    
    Objective1BodyGeometry.setAttribute('position', new THREE.BufferAttribute(Objective1BodyVertices, 3));
	Objective1BodyGeometry.setIndex(new THREE.BufferAttribute(Objective1BodyFace, 1));

	// Material del cuerpo del Objective1
	const Objective1BodyMaterial = new THREE.MeshStandardMaterial({color: 0xFFA500, side: THREE.DoubleSide});
	
    const Objective1Body = new THREE.Mesh(Objective1BodyGeometry, Objective1BodyMaterial);

    return Objective1Body;
}
export default createObjective1;
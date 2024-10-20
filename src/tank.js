import * as THREE from 'three';

// Cuerpo del tanque

const createTankBody = () => {
	const tankBodyGeometry = new THREE.BufferGeometry();
	const tankBodyVertices = new Float32Array([
		// Vertices del cuerpo del tanque
		-15, -8, 0,    // V0: Vértice inferior izquierdo tracero
		15, -8, 0,     // V1: Vértice inferior derecho tracero
		-15, 8, 0,     // V2: Vértice superior derecho tracero
		15, 8, 0,      // V3: Vértice superior izquierdo tracero
		-15, -8, -40,  // V4: Vértice inferior izquierdo delantero
		15, -8, -40,   // V5: Vértice inferior derecho delantero
		-15, 8, -40,   // V6: Vértice superior derecho delantero
		15, 8, -40,    // V7: Vértice superior izquierdo delantero

	]);
	
	const tankBodyFace = new Uint16Array([
		// Caras del cuerpo del tanque
		0, 1, 2,  1, 2, 3, // cara trasera
		4, 5, 6,  5, 6, 7, // cara delantera
		0, 1, 4,  1, 4, 5, // cara inferior
		2, 3, 6,  3, 6, 7, // cara superior
		0, 2, 4,  2, 4, 6, // cara izquierdo
		1, 3, 5,  3, 5, 7, // cara derecha

	]);

	tankBodyGeometry.setAttribute('position', new THREE.BufferAttribute(tankBodyVertices, 3));
	tankBodyGeometry.setIndex(new THREE.BufferAttribute(tankBodyFace, 1));

	// Material del cuerpo del tanque
	const tankBodyMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00, side: THREE.DoubleSide});
	const tankBody = new THREE.Mesh(tankBodyGeometry, tankBodyMaterial);

	return tankBody;
}

export default createTankBody;
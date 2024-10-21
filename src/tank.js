import * as THREE from 'three';

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

	tankBodyGeometry.setAttribute('position', new THREE.BufferAttribute(tankBodyVertices, 3));

	// Material del cuerpo del tanque
	const tankBodyMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00, side: THREE.DoubleSide});
	const tankBody = new THREE.Mesh(tankBodyGeometry, tankBodyMaterial);

	return tankBody;
}

export default createTankBody;
import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createObjective1 = () => {
    const loaderDDS = new DDSLoader();
	const Objective1BodyGeometry = new THREE.BufferGeometry();
    
    const Objective1BodyVertices = new Float32Array([
        // Cara frontal
        -21, -50, 21,   21, -50, 21,  -21, 50, 21,
        21, -50, 21,   -21, 50, 21,   21, 50, 21,
        // Cara trasera
        -21, -50, -21,   21, -50, -21,  -21, 50, -21,
        21, -50, -21,   -21, 50, -21,   21, 50, -21,
        // Cara inferior
        -21, -50, 21,   21, -50, 21,  -21, -50, -21, 
        21, -50, 21,   -21, -50, -21,   21, -50, -21,
        // Cara superior
        -21, 50, 21,   21, 50, 21,  -21, 50, -21,
        21, 50, 21,   -21, 50, -21,   21, 50, -21,
        // Cara izquierda
        -21, -50, 21,   -21, 50, 21,  -21, -50, -21,
        -21, 50, 21,   -21, -50, -21,   -21, 50, -21,
        // Cara derecha
        21, -50, 21,   21, 50, 21,  21, -50, -21,
        21, 50, 21,   21, -50, -21,   21, 50, -21
    ]);

const Objective1BodyUVs = new Float32Array([
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
    
    Objective1BodyGeometry.setAttribute('position', new THREE.BufferAttribute(Objective1BodyVertices, 3));
	Objective1BodyGeometry.setAttribute('uv', new THREE.BufferAttribute(Objective1BodyUVs, 2));

	// Material del cuerpo del Objective1
	const texture_1 = loaderDDS.load('src/texture/roof_build3.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);
	

    const Objective1BodyMaterial = new THREE.MeshStandardMaterial({ map: texture_1, side: THREE.DoubleSide });
    const Objective1Body = new THREE.Mesh(Objective1BodyGeometry, Objective1BodyMaterial);

     // Añadir caja de colisión
    Objective1Body.geometry.computeBoundingBox();
    Objective1Body.boundingBox = new THREE.Box3().setFromObject(Objective1Body);
    
    return Objective1Body;
}
export default createObjective1;
import * as THREE from 'three';
import createCylinderGeometry from './Geometries/cylinder';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createCaterpillar = () => {
    const radiusTop = 5;
    const radiusBottom = 5;
    const height = 5;
    const radialSegments = 32;
    
    // Crear la geometría del cilindro
    const geometry = createCylinderGeometry(radiusTop, radiusBottom, height, radialSegments);

    // Calcular los normales
    geometry.computeVertexNormals();

	// Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/orugas.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Crear el material de la oruga
    const material = new THREE.MeshStandardMaterial({ map: texture_1, side: THREE.DoubleSide});

    // Crear la malla de la oruga derecha
    const caterpillarD = new THREE.Mesh(geometry, material);
	const caterpillarD_1 = new THREE.Mesh(geometry, material);
	const caterpillarD_2 = new THREE.Mesh(geometry, material);
	const caterpillarD_3 = new THREE.Mesh(geometry, material);
	caterpillarD.add(caterpillarD_1);
	caterpillarD.add(caterpillarD_2);
	caterpillarD.add(caterpillarD_3);
    caterpillarD.position.set(15, -13, -5);
	caterpillarD_1.position.set(0, 0, -10);
	caterpillarD_2.position.set(0, 0, -20);
	caterpillarD_3.position.set(0, 0, -30);
    
	// rotar el material
	caterpillarD.rotation.z = Math.PI / 2;

    // Crear la malla de la oruga izquierda
    const caterpillarI = new THREE.Mesh(geometry, material);
	const caterpillarI_1 = new THREE.Mesh(geometry, material);
	const caterpillarI_2 = new THREE.Mesh(geometry, material);
	const caterpillarI_3 = new THREE.Mesh(geometry, material);
	caterpillarI.add(caterpillarI_1);
	caterpillarI.add(caterpillarI_2);
	caterpillarI.add(caterpillarI_3);
    caterpillarI.position.set(-10, -13, -5);
	caterpillarI_1.position.set(0, 0, -10);
	caterpillarI_2.position.set(0, 0, -20);
	caterpillarI_3.position.set(0, 0, -30);

	// rotar el material
	caterpillarI.rotation.z = Math.PI / 2;
	
    // Sombras
    caterpillarD.castShadow = true;
	caterpillarI.castShadow = true;

    return {caterpillarD, caterpillarI};
};

export default createCaterpillar;
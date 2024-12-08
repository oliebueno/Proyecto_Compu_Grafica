import * as THREE from 'three';
import createOvalGeometry from './Geometries/oval';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

// Crear un ovalo
const createOval = () => {
    const radiusX = 10;
    const radiusY = 18;
    const segments = 32;

    // Crear la geometría del óvalo
    const geometry = createOvalGeometry(radiusX, radiusY, segments);

    // Calcular los normales
    geometry.computeVertexNormals();

	// Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/ballon_bomb.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

	// Crear el material del ovalo
    const material = new THREE.MeshStandardMaterial({map: texture_1 , side: THREE.DoubleSide});
    const oval = new THREE.Mesh(geometry, material);

	oval.rotation.z = Math.PI / 2;

    return oval;
};

export default createOval;
import * as THREE from 'three';
import createCylinderGeometry from './Geometries/cylinder';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createCannon = () => {
    const radiusTop = 2;
    const radiusBottom = 2;
    const height = 20;
    const radialSegments = 32;

    // Crear la geometría del cilindro
    const geometry = createCylinderGeometry(radiusTop, radiusBottom, height, radialSegments);

    // Calcular los normales
    geometry.computeVertexNormals();

	// Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/canoon.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Crear el material del cañón
    const material = new THREE.MeshStandardMaterial({ map: texture_1, side: THREE.DoubleSide,});

    // Crear la malla del cañón
    const cannon = new THREE.Mesh(geometry, material);
    cannon.position.set(0, 0, 0);
	
	// rotar el material
	cannon.rotation.x = Math.PI / 2;

	// Punto de montaje
	const mountPoint = new THREE.Object3D();
	mountPoint.position.set(0, height, 0);
	mountPoint.rotation.copy(cannon.rotation);
	cannon.add(mountPoint);

    // Sombras
    cannon.castShadow = true;

    return {cannon, mountPoint};
};

export default createCannon;

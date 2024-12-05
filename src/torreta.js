import * as THREE from 'three';
import createSphereGeometry from './Geometries/sphere';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createTurret = () => {
    // Parámetros para la esfera
    const radius = 10;
    const widthSegments = 32;
    const heightSegments = 32;

    // Crear la geometría de la esfera
    const geometry = createSphereGeometry(radius, widthSegments, heightSegments);

    // Calcular los normales
    geometry.computeVertexNormals();

	// Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/torreta.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Crear el material de la torreta
    const material = new THREE.MeshStandardMaterial({ map: texture_1, side: THREE.DoubleSide});

    // Crear la malla de la torreta
    const turret = new THREE.Mesh(geometry, material);
    turret.position.set(0, 12, -20);
	turret.rotation.y = Math.PI 

    // Sombras
    turret.castShadow = true;

    return turret;
};

export default createTurret;

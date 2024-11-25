import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createCannon = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = [];

    const radiusTop = 2;
    const radiusBottom = 2;
    const height = 20;
    const radialSegments = 32;
    
    // Generar la geometría del cilindro
    for (let y = 0; y <= 1; y++) {
        const v = y * height;

        for (let x = 0; x <= radialSegments; x++) {
            const u = x / radialSegments;
            const theta = u * Math.PI * 2;

            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            const vx = y === 0 ? radiusBottom * cosTheta : radiusTop * cosTheta;
            const vy = v;
            const vz = y === 0 ? radiusBottom * sinTheta : radiusTop * sinTheta;

            vertices.push(vx, vy, vz);
            uvs.push(u, y);
        }
    }

    // Generar los índices de los triángulos del cilindro
    for (let x = 0; x < radialSegments; x++) {
        const i0 = x;
        const i1 = x + 1;
        const i2 = x + radialSegments + 1;
        const i3 = x + radialSegments + 2;

        indices.push(i0, i1, i2);
        indices.push(i1, i3, i2);
    }

    // Añadir tapa inferior
    const baseCenterIndex = vertices.length / 3;
    vertices.push(0, 0, 0);
    uvs.push(0.5, 0.5);

    for (let x = 0; x < radialSegments; x++) {
        const i0 = x;
        const i1 = x + 1;
        indices.push(baseCenterIndex, i0, i1);
    }

    // Añadir tapa superior
    const topCenterIndex = vertices.length / 3;
    vertices.push(0, height, 0);
    uvs.push(0.5, 0.5);

    for (let x = 0; x < radialSegments; x++) {
        const i0 = x + radialSegments + 1;
        const i1 = i0 + 1;
        indices.push(topCenterIndex, i1, i0);
	}

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.setIndex(indices);
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

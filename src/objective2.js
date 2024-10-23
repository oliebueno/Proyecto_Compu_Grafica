import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createObjective2 = () => {
    const Objective2BodyGeometry = new THREE.BufferGeometry();

    // Definir los vértices de la pirámide
    const Objective2BodyVertices = new Float32Array([
        // Base de la pirámide
        -70, 0, -70,    70, 0, -70,   70, 0, 70,
        -70, 0, -70,   70, 0, 70,   -70, 0, 70,
        // Cara 1
        -70, 0, -70,   70, 0, -70,   0, 100, 0,
        // Cara 2
        70, 0, -70,   70, 0, 70,   0, 100, 0,
        // Cara 3
        70, 0, 70,   -70, 0, 70,   0, 100, 0,
        // Cara 4
        -70, 0, 70,   -70, 0, -70,   0, 100, 0 
    ]);

    const Objective2BodyUVs = new Float32Array([
        // Coordenadas UV para cada triángulo
        // Base de la pirámide
        0, 0,  1, 0,  1, 1,
        0, 0,  1, 1,  0, 1,

        // Cara 1
        0, 0,  1, 0,  0.5, 1,

        // Cara 2
        0, 0,  1, 0,  0.5, 1,

        // Cara 3
        0, 0,  1, 0,  0.5, 1,

        // Cara 4
        0, 0,  1, 0,  0.5, 1
    ]);

    Objective2BodyGeometry.setAttribute('position', new THREE.BufferAttribute(Objective2BodyVertices, 3));
    Objective2BodyGeometry.setAttribute('uv', new THREE.BufferAttribute(Objective2BodyUVs, 2));


    // Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/piramide.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Crear el material de la pirámide utilizando MeshPhongMaterial
    const Objective2BodyMaterial = new THREE.MeshPhongMaterial({ map: texture_1, side: THREE.DoubleSide });
    const Objective2Body = new THREE.Mesh(Objective2BodyGeometry, Objective2BodyMaterial);

    return Objective2Body;
}

export default createObjective2;

import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

const createObjective2 = () => {
    const Objective2BodyGeometry = new THREE.BufferGeometry();

    // Definir los vértices de la pirámide
    const Objective2BodyVertices = new Float32Array([
        // Base de la pirámide
        -15, 0, -15,  // V0: Vértice inferior izquierdo
         15, 0, -15,  // V1: Vértice inferior derecho
         15, 0,  15,  // V2: Vértice superior derecho
        -15, 0,  15,  // V3: Vértice superior izquierdo
        // Vértice superior
         0, 30, 0   // V4: Vértice superior
    ]);

    // Definir las caras de la pirámide
    const Objective2BodyFaces = new Uint16Array([
        // Base
        0, 1, 2,  0, 2, 3,
        // Lados
        0, 1, 4,
        1, 2, 4,
        2, 3, 4,
        3, 0, 4
    ]);

    Objective2BodyGeometry.setAttribute('position', new THREE.BufferAttribute(Objective2BodyVertices, 3));
    Objective2BodyGeometry.setIndex(new THREE.BufferAttribute(Objective2BodyFaces, 1));

    // Cargar la textura
    const loaderDDS = new DDSLoader();
    const texture_1 = loaderDDS.load('src/texture/bottom_sea1.dds');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Crear el material de la pirámide utilizando MeshPhongMaterial
    const Objective2BodyMaterial = new THREE.MeshPhongMaterial({ map: texture_1, side: THREE.DoubleSide });
    const Objective2Body = new THREE.Mesh(Objective2BodyGeometry, Objective2BodyMaterial);

    return Objective2Body;
}

export default createObjective2;

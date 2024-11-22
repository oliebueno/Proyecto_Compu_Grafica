import * as THREE from 'three';

const createObjective3 = () => {
    const loaderTexture = new THREE.TextureLoader();
    const Objective3BodyGeometry = new THREE.BufferGeometry();
    
    const Objective3BodyVertices = new Float32Array([
        // Cara frontal
        -21, -50, 21,    21, -50, 21,   -21, 0, 21,      //Inferior izquierdo
        21, 0, 21,      -21, 0, 21,      21, -50, 21,    //Inferior derecha
        -21, 0, 21,      21, 0, 21,     -21, 50, 21,     //Superior derecha
        21, 50, 21,     -21, 50, 21,     21, 0, 21,      //Superior izquierdo
        // Cara trasera
        21, -50, -21,   -21, -50, -21,  -21, 0, -21,     //Inferior derecha
        -21, 0, -21,     21, 0, -21,     21, -50, -21,   //Inferior izquierdo
        21, 0, -21,     -21, 0, -21,    -21, 50, -21,    //Superior derecha
        -21, 50, -21,    21, 50, -21,    21, 0, -21,     //Superior izquierdo
        // Cara inferior
        -21, -50, 21,    21, -50, 21,   -21, -50, -21,   //Izquierda
        21, -50, 21,    -21, -50, -21,   21, -50, -21,   //Derecha
        // Cara superior
        -21, 50, 21,     21, 50, 21,    -21, 50, -21,    //Izquierda
        21, 50, -21,    -21, 50, -21,    21, 50, 21,     //Derecha
        // Cara izquierda
        -21, -50, 21,   -21, 0, 21,    -21, -50, -21,    //Inferior derecha
        -21, 0, -21,    -21, -50, -21, -21, 0, 21,       //Inferior izquierdo
        -21, 0, 21,     -21, 50, 21,   -21, 0, -21,      //Superior derecha
        -21, 50, -21,   -21, 0, -21,   -21, 50, 21,      //Superior izquierdo
        // Cara derecha
        21, -50, 21,    21, 0, 21,      21, -50, -21,    //Inferior izquierdo
        21, 0, -21,     21, -50, -21,   21, 0, 21,       //Inferior derecha
        21, 0, 21,      21, 50, 21,     21, 0, -21,      //Superior izquierdo
        21, 50, -21,    21, 0, -21,     21, 50, 21       //Superior derecha

    ]);

    const Objective3BodyUVs = new Float32Array([
        // Coordenadas UV para cada triángulo
        // Cara frontal
        0, 0,  1, 0,  0, 1,
        1, 1,  0, 1,  1, 0,
        0, 0,  1, 0,  0, 1,
        1, 1,  0, 1,  1, 0,
        // Cara trasera
        0, 0,  1, 0,  1, 1,
        1, 1,  0, 1,  0, 0,
        0, 0,  1, 0,  1, 1,
        1, 1,  0, 1,  0, 0,
        // Cara inferior
        0, 0,  1, 0,  0, 1,
        1, 0,  0, 1,  1, 1,
        // Cara superior
        0, 0,  1, 0,  0, 1,
        1, 1,  0, 1,  1, 0,
        // Cara izquierda
        1, 0,  1, 1,  0, 0,
        0, 1,  0, 0,  1, 1,
        1, 0,  1, 1,  0, 0,
        0, 1,  0, 0,  1, 1,
        // Cara derecha
        0, 0,  0, 1,  1, 0,
        1, 1,  1, 0,  0, 1,
        0, 0,  0, 1,  1, 0,
        1, 1,  1, 0,  0, 1
    ]);

    Objective3BodyGeometry.setAttribute('position', new THREE.BufferAttribute(Objective3BodyVertices, 3));
    Objective3BodyGeometry.setAttribute('uv', new THREE.BufferAttribute(Objective3BodyUVs, 2));
    Objective3BodyGeometry.computeVertexNormals();

    // Cargar textura principal
    const texture_1 = loaderTexture.load('src/texture/Bricks091_1K-JPG/Bricks091_1K-JPG_Color.jpg');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Cargar el mapa de normales
    const normalMap = loaderTexture.load('src/texture/Bricks091_1K-JPG/Bricks091_1K-JPG_NormalGL.jpg');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(1, 1);

    // Cargar el mapa de rugosidad 
    const roughnessMap = loaderTexture.load('src/texture/Bricks091_1K-JPG/Bricks091_1K-JPG_Roughness.jpg'); 
    roughnessMap.wrapS = THREE.RepeatWrapping; 
    roughnessMap.wrapT = THREE.RepeatWrapping; 
    roughnessMap.repeat.set(1, 1);

    // Cargar el mapa de oclusión ambiental 
    const aoMap = loaderTexture.load('src/texture/Bricks091_1K-JPG/Bricks091_1K-JPG_AmbientOcclusion.jpg'); 
    aoMap.wrapS = THREE.RepeatWrapping; 
    aoMap.wrapT = THREE.RepeatWrapping; 
    aoMap.repeat.set(1, 1);

    // Cargar el mapa de desplazamiento
    const displacementMap = loaderTexture.load('src/texture/Bricks091_1K-JPG/Bricks091_1K-JPG_Displacement.jpg');
    displacementMap.wrapS = THREE.RepeatWrapping;
    displacementMap.wrapT = THREE.RepeatWrapping;
    displacementMap.repeat.set(1, 1);

    // Material del cuerpo
    const Objective3BodyMaterial = new THREE.MeshStandardMaterial({ 
        map: texture_1,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        aoMap: aoMap,
        displacementMap: displacementMap,
        displacementScale: 0.1,
        normalScale: new THREE.Vector2(3, 3),
        roughness: 0.5,
        metalness: 0.2,
        side: THREE.DoubleSide,
        reflectivity: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissiveIntensity: 0.5,
    });

    const Objective3Body = new THREE.Mesh(Objective3BodyGeometry, Objective3BodyMaterial);

    //Sombras
    Objective3Body.castShadow = true;

    // Añadir caja de colisión
    Objective3Body.geometry.computeBoundingBox();
    Objective3Body.boundingBox = new THREE.Box3().setFromObject(Objective3Body);
    
    return Objective3Body;
}

export default createObjective3;
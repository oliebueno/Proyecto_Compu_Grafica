import * as THREE from 'three';

const createObjective1 = () => {
    const loaderTexture = new THREE.TextureLoader();
    const Objective1BodyGeometry = new THREE.BufferGeometry();
    
    const Objective1BodyVertices = new Float32Array([
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

    const Objective1BodyUVs = new Float32Array([
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

    Objective1BodyGeometry.setAttribute('position', new THREE.BufferAttribute(Objective1BodyVertices, 3));
    Objective1BodyGeometry.setAttribute('uv', new THREE.BufferAttribute(Objective1BodyUVs, 2));
    Objective1BodyGeometry.computeVertexNormals();

    // Cargar textura principal
    const texture_1 = loaderTexture.load('src/texture/Bricks059_1K-JPG/Bricks059_1K-JPG_Color.jpg');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Cargar el mapa de normales
    const normalMap = loaderTexture.load('src/texture/Bricks059_1K-JPG/Bricks059_1K-JPG_NormalGL.jpg');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(1, 1);

    // Cargar el mapa de rugosidad 
    const roughnessMap = loaderTexture.load('src/texture/Bricks059_1K-JPG/Bricks059_1K-JPG_Roughness.jpg'); 
    roughnessMap.wrapS = THREE.RepeatWrapping; 
    roughnessMap.wrapT = THREE.RepeatWrapping; 
    roughnessMap.repeat.set(1, 1);

    // Cargar el mapa de oclusión ambiental 
    const aoMap = loaderTexture.load('src/texture/Bricks059_1K-JPG/Bricks059_1K-JPG_AmbientOcclusion.jpg'); 
    aoMap.wrapS = THREE.RepeatWrapping; 
    aoMap.wrapT = THREE.RepeatWrapping; 
    aoMap.repeat.set(1, 1);

    // Cargar el mapa de desplazamiento
    const displacementMap = loaderTexture.load('src/texture/Bricks059_1K-JPG/Bricks059_1K-JPG_Displacement.jpg');
    displacementMap.wrapS = THREE.RepeatWrapping;
    displacementMap.wrapT = THREE.RepeatWrapping;
    displacementMap.repeat.set(1, 1);

    // Material del cuerpo
    const Objective1BodyMaterial = new THREE.MeshStandardMaterial({ 
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

    const Objective1Body = new THREE.Mesh(Objective1BodyGeometry, Objective1BodyMaterial);

    //Sombras
    Objective1Body.castShadow = true;

    // Añadir caja de colisión
    Objective1Body.geometry.computeBoundingBox();
    Objective1Body.boundingBox = new THREE.Box3().setFromObject(Objective1Body);
    
    return Objective1Body;
}

export default createObjective1;

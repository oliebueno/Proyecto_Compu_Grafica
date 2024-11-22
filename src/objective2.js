import * as THREE from 'three';

const createObjective2 = () => {
    const loaderTexture = new THREE.TextureLoader();
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
    Objective2BodyGeometry.computeVertexNormals();


    // Cargar textura principal
    const texture_1 = loaderTexture.load('src/texture/Concrete039_1K-JPG/Concrete039_1K-JPG_Color.jpg');
    texture_1.wrapS = THREE.RepeatWrapping;
    texture_1.wrapT = THREE.RepeatWrapping;
    texture_1.repeat.set(1, 1);

    // Cargar el mapa de normales
    const normalMap = loaderTexture.load('src/texture/Concrete039_1K-JPG/Concrete039_1K-JPG_NormalGL.jpg');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(1, 1);

    // Cargar el mapa de rugosidad 
    const roughnessMap = loaderTexture.load('src/texture/Concrete039_1K-JPG/Concrete039_1K-JPG_Roughness.jpg'); 
    roughnessMap.wrapS = THREE.RepeatWrapping; 
    roughnessMap.wrapT = THREE.RepeatWrapping; 
    roughnessMap.repeat.set(1, 1);

    // Cargar el mapa de oclusión ambiental 
    const aoMap = loaderTexture.load('src/texture/Concrete039_1K-JPG/Concrete039_1K-JPG_AmbientOcclusion.jpg'); 
    aoMap.wrapS = THREE.RepeatWrapping; 
    aoMap.wrapT = THREE.RepeatWrapping; 
    aoMap.repeat.set(1, 1);

    // Cargar el mapa de desplazamiento
    const displacementMap = loaderTexture.load('src/texture/Concrete039_1K-JPG/Concrete039_1K-JPG_Displacement.jpg');
    displacementMap.wrapS = THREE.RepeatWrapping;
    displacementMap.wrapT = THREE.RepeatWrapping;
    displacementMap.repeat.set(1, 1);

    // Crear el material de la pirámide utilizando MeshPhongMaterial
    // Material del cuerpo
    const Objective2BodyMaterial = new THREE.MeshStandardMaterial({ 
        map: texture_1,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        aoMap: aoMap,
        displacementMap: displacementMap,
        displacementScale: 0.1,
        normalScale: new THREE.Vector2(3, 3),
        roughness: 0.5,
        metalness: 0.1,
        side: THREE.DoubleSide,
        reflectivity: 0.5,
        clearcoat: 0.2,
        clearcoatRoughness: 0.1,
        emissiveIntensity: 0.5,
    });

    const Objective2Body = new THREE.Mesh(Objective2BodyGeometry, Objective2BodyMaterial);

    //Sombras
    Objective2Body.castShadow = true;

    // Añadir caja de colisión
    Objective2Body.geometry.computeBoundingBox();
    Objective2Body.boundingBox = new THREE.Box3().setFromObject(Objective2Body);
    
    return Objective2Body;
}

export default createObjective2;

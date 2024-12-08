import * as THREE from 'three';
import createCylinderGeometry from '../Geometries/cylinder';

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
    const loaderTexture = new THREE.TextureLoader();

    // Cargar textura principal
    const texture_1 = loaderTexture.load('src/texture/Chainmail004_1K-JPG/Chainmail004_1K-JPG_Color.jpg');

    // Cargar el mapa de normales
    const normalMap = loaderTexture.load('src/texture/Chainmail004_1K-JPG/Chainmail004_1K-JPG_NormalGL.jpg');

    // Cargar el mapa de rugosidad 
    const roughnessMap = loaderTexture.load('src/texture/Chainmail004_1K-JPG/Chainmail004_1K-JPG_Roughness.jpg'); 

    // Cargar el mapa de ID
    const idMaskMap = loaderTexture.load('src/texture/Chainmail004_1K-JPG/Chainmail004_1K-JPG_IdMask.jpg');

    // Crear el material de la oruga
    const material =  new THREE.MeshStandardMaterial({ 
        map: texture_1,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        normalScale: new THREE.Vector2(3, 3),
        roughness: 0.5,
        metalness: 0.2,
        side: THREE.DoubleSide,
        emissiveIntensity: 0.5,
        emissiveMap: idMaskMap
    });


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
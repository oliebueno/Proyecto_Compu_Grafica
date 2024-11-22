import * as THREE from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

// Crear un plano
const createPlane = () => {
	const geometry = new THREE.PlaneGeometry(1000, 1000, 40, 40);
	const loaderDDS = new DDSLoader();
	const loaderTexture = new THREE.TextureLoader();

	// Textura 1:
	const texture_1 = loaderTexture.load('src/texture/Rock057_1K-JPG/Rock057_1K-JPG_Color.jpg');
	texture_1.wrapS = THREE.RepeatWrapping;
	texture_1.wrapT = THREE.RepeatWrapping;
	texture_1.repeat.set(1, 1);

	// Cargar el mapa de normales de la textura 1
    const normalMap = loaderTexture.load('src/texture/Rock057_1K-JPG/Rock057_1K-JPG_NormalGL.jpg');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(1, 1);

    // Cargar el mapa de oclusión ambiental de la textura 1
    const aoMap = loaderTexture.load('src/texture/Rock057_1K-JPG/Rock057_1K-JPG_AmbientOcclusion.jpg'); 
    aoMap.wrapS = THREE.RepeatWrapping; 
    aoMap.wrapT = THREE.RepeatWrapping; 
    aoMap.repeat.set(1, 1);

	// Textura 2
	const texture_2 = loaderTexture.load('src/texture/Ground037_1K-JPG/Ground037_1K-JPG_Color.jpg'); 
	texture_2.wrapS = THREE.RepeatWrapping;
	texture_2.wrapT = THREE.RepeatWrapping;
	texture_2.repeat.set(1, 1);

	// Cargar el mapa de normales de la textura 2
    const normalMap2 = loaderTexture.load('src/texture/Ground037_1K-JPG/Ground037_1K-JPG_NormalGL.jpg');
    normalMap2.wrapS = THREE.RepeatWrapping;
    normalMap2.wrapT = THREE.RepeatWrapping;
    normalMap2.repeat.set(1, 1);

    // Cargar el mapa de oclusión ambiental de la textura 2
    const aoMap2 = loaderTexture.load('src/texture/Ground037_1K-JPG/Ground037_1K-JPG_AmbientOcclusion.jpg'); 
    aoMap2.wrapS = THREE.RepeatWrapping; 
    aoMap2.wrapT = THREE.RepeatWrapping; 
    aoMap2.repeat.set(1, 1);

	// Textura 3
	const texture_3 = loaderTexture.load('src/texture/Asphalt010_1K-JPG/Asphalt010_1K-JPG_Color.jpg'); 
	texture_3.wrapS = THREE.RepeatWrapping;
	texture_3.wrapT = THREE.RepeatWrapping;
	texture_3.repeat.set(1, 1);

	// Cargar el mapa de normales de la textura 3
    const normalMap3 = loaderTexture.load('src/texture/Asphalt010_1K-JPG/Asphalt010_1K-JPG_NormalGL.jpg');
    normalMap3.wrapS = THREE.RepeatWrapping;
    normalMap3.wrapT = THREE.RepeatWrapping;
    normalMap3.repeat.set(1, 1);

    // Cargar el mapa de opacidad de la textura 3
    const opMap3 = loaderTexture.load('src/texture/Asphalt010_1K-JPG/Asphalt010_1K-JPG_Opacity.jpg'); 
    opMap3.wrapS = THREE.RepeatWrapping; 
    opMap3.wrapT = THREE.RepeatWrapping; 
    opMap3.repeat.set(1, 1);

	// Textura 4
	const texture_4 = loaderTexture.load('src/texture/Ground054_1K-JPG/Ground054_1K-JPG_Color.jpg'); 
	texture_4.wrapS = THREE.RepeatWrapping;
	texture_4.wrapT = THREE.RepeatWrapping;
	texture_4.repeat.set(1, 1);

	// Cargar el mapa de normales de la textura 2
    const normalMap4 = loaderTexture.load('src/texture/Ground054_1K-JPG/Ground054_1K-JPG_NormalGL.jpg');
    normalMap4.wrapS = THREE.RepeatWrapping;
    normalMap4.wrapT = THREE.RepeatWrapping;
    normalMap4.repeat.set(1, 1);

    // Cargar el mapa de oclusión ambiental de la textura 2
    const aoMap4 = loaderTexture.load('src/texture/Ground054_1K-JPG/Ground054_1K-JPG_AmbientOcclusion.jpg'); 
    aoMap4.wrapS = THREE.RepeatWrapping; 
    aoMap4.wrapT = THREE.RepeatWrapping; 
    aoMap4.repeat.set(1, 1);


	// Se crean materiales para cada textura
	const materials = [
		new THREE.MeshStandardMaterial({              // Textura 1
			map: texture_1,
			normalMap: normalMap,
			aoMap: aoMap,
			normalScale: new THREE.Vector2(2, 2),
			emissiveIntensity: 0.5,
			side: THREE.DoubleSide,
	}),
		new THREE.MeshStandardMaterial({              // Textura 2
			map: texture_2,
			normalMap: normalMap2,
            aoMap: aoMap2,
            normalScale: new THREE.Vector2(2, 2),
			emissiveIntensity: 0.5,
			side: THREE.DoubleSide,
		}),
		new THREE.MeshStandardMaterial({              // Textura 3
			map: texture_3,
			normalMap: normalMap3,
			alphaMap: opMap3,
            normalScale: new THREE.Vector2(2, 2),
            side: THREE.DoubleSide,
            emissiveIntensity: 0.5, 
			side: THREE.DoubleSide
		}),
		new THREE.MeshStandardMaterial({              // Textura 4
			map: texture_4,
			normalMap: normalMap4,
            aoMap: aoMap4,
            normalScale: new THREE.Vector2(2, 2),
            side: THREE.DoubleSide,
            emissiveIntensity: 0.5,
			side: THREE.DoubleSide}),

	]
	
	// Se asignan los materiales
    const plane = new THREE.Mesh(geometry, materials);
	plane.rotation.x = -Math.PI / 2;


	// Se divide el plano en segmentos y se asignan los materiales
    geometry.clearGroups();

	for(let i = 1 ; i < 41; i++) {
		//Rellena la parte izquierda
		geometry.addGroup((i-1)*40*6, 40*6, 0);
		// Rellena la carretera horizontal
		geometry.addGroup(i*16*6 + (i-1)*24*6, 8*6, 2);
	}

	// Rellena la carretera vertical
	for(let i = 17 ; i < 22; i++) {
		geometry.addGroup((i-1)*40*6, 18*6, 2);
	}

	// Rellena la parte de la piramide
	for(let i = 0 ; i < 17; i++) {
		geometry.addGroup((i-1)*40*6, 16*6, 3);
	}

	// Rellena la parte baja izquierda
	for(let i = 17 ; i < 41; i++) {
		geometry.addGroup((i-1)*40*6, 16*6, 1);
	}
    
    return plane;

}
export default createPlane;
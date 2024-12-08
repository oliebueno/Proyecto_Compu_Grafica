import * as THREE from 'three';
import createSphereGeometry from '../Geometries/sphere';

export function createPhare(x, y, z) {
    // Parámetros para la esfera
    const radius = 3;
    const widthSegments = 32;
    const heightSegments = 32;

    // Crear la geometría de la esfera
    const geometry = createSphereGeometry(radius, widthSegments, heightSegments);

    // Calcular los normales
    geometry.computeVertexNormals();

    // Cargar la textura
    const loaderTexture = new THREE.TextureLoader();

    // Cargar textura principal
    const texture_1 = loaderTexture.load('src/texture/Metal048A_1K-JPG/Metal048A_1K-JPG_Color.jpg');

    // Cargar el mapa de normales
    const normalMap = loaderTexture.load('src/texture/Metal048A_1K-JPG/Metal048A_1K-JPG_NormalGL.jpg');

    // Cargar el mapa de rugosidad 
    const roughnessMap = loaderTexture.load('src/texture/Metal048A_1K-JPG/Metal048A_1K-JPG_Roughness.jpg');

    // Cargar el mapa de metalicidad
    const metalnessMap = loaderTexture.load('src/texture/Metal048A_1K-JPG/Metal048A_1K-JPG_Metalness.jpg');


    // Crear el material de la oruga
    const material =  new THREE.MeshStandardMaterial({ 
        map: texture_1,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        metalnessMap: metalnessMap,
        normalScale: new THREE.Vector2(3, 3),
        roughness: 0.1,
        metalness: 0.7,
        side: THREE.DoubleSide,
        emissiveIntensity: 0.5,
    });

        // Crear la malla del faro izquierdo
        const phare = new THREE.Mesh(geometry, material);
        phare.position.set(x, y, z);
        phare.rotation.y = Math.PI 

        // Sombras
        phare.castShadow = true;

        return phare;
};
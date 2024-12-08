import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// Función que carga el modelo 3D del tanque
export function load_tank_1(scene) {
    const fbxLoader = new FBXLoader();

    fbxLoader.load(
        'src/Modelos/tanque/T 90.fbx',
        (object) => {
            scene.add(object);
            object.position.set(0, 12, -300);
            object.scale.set(0.15, 0.15, 0.15);

            object.traverse((child) => {
                if (child.isMesh) {
                    const textureLoader = new THREE.TextureLoader();
                    const texture = textureLoader.load('src/Modelos/tanque/T 90D.png', (texture) => {
                    });

                    child.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        roughness: 0.5,
                        metalness: 0.5,
                    });

                    child.material.needsUpdate = true;
                    child.castShadow = true;
                }
            });
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% cargado');
        },
        (error) => {
            console.error('Error al cargar el modelo:', error);
        }
    );
};

// Función que carga el modelo 3D de una lampara
export function load_lamp(scene, x, y, z) {
    return new Promise((resolve, reject) => {
        const fbxLoader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        fbxLoader.load(
            'src/Modelos/lamp/LAMP_FBX.fbx',
            (object) => {
                scene.add(object);
                object.position.set(x, y, z);
                object.scale.set(0.06, 0.06, 0.06);

                // Cargar texturas
                const normalTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_Normal_OPENGL.png');
                const aoTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_AO.png');
                const displacementTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_DISPLACEMENT.png');
                const emissiveTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_Emissive.png');
                const heightTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_Height.png');
                const baseColorTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_BaseColor.png');
                const metallicTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_Metallic.png');
                const roughnessTexture = textureLoader.load('src/Modelos/lamp/DefaultMaterial_Roughness.png');

                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: baseColorTexture,
                            normalMap: normalTexture,
                            normalScale: new THREE.Vector2(3, 3),
                            roughnessMap: roughnessTexture,
                            metalnessMap: metallicTexture,
                            roughness: 0.3,
                            metalness: 0.8,
                            emissiveMap: emissiveTexture,
                            aoMap: aoTexture,
                            displacementMap: displacementTexture,
                            displacementScale: 0,
                            side: THREE.DoubleSide,
                        });

                        if (heightTexture) {
                            child.material.displacementMap = heightTexture;
                        }

                        child.material.needsUpdate = true;
                        child.castShadow = true;
                    }
                });

                resolve(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo:', error);
                reject(error);
            }
        );
    });
}
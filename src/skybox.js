import * as THREE from 'three';

// Crea una función para agregar el skybox
export function createSkybox(scene) {
    const loader = new THREE.TextureLoader();

    //Carga las texturas
    let skyboxMaterials = [];
    let texture_ft = new THREE.TextureLoader().load("src/texture/Skybox/barren_ft.jpg");
    let texture_bk = new THREE.TextureLoader().load("src/texture/Skybox/barren_bk.jpg");
    let texture_up = new THREE.TextureLoader().load("src/texture/Skybox/barren_up.jpg");
    let texture_dn = new THREE.TextureLoader().load("src/texture/Skybox/barren_dn.jpg");
    let texture_rt = new THREE.TextureLoader().load("src/texture/Skybox/barren_rt.jpg");
    let texture_lf = new THREE.TextureLoader().load("src/texture/Skybox/barren_lf.jpg");

    skyboxMaterials.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    skyboxMaterials.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
    skyboxMaterials.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    skyboxMaterials.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    skyboxMaterials.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    skyboxMaterials.push(new THREE.MeshBasicMaterial({ map: texture_ft }));

    for(let i = 0; i < skyboxMaterials.length; i++) {
        skyboxMaterials[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(1000, 500, 1000);
    let skybox = new THREE.Mesh(skyboxGeo, skyboxMaterials);
    skybox.position.y = 248;
    scene.add(skybox);
}
import * as THREE from 'three';


const createCaterpillar = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = [];

    const radiusTop = 5;
    const radiusBottom = 5;
    const height = 5;
    const radialSegments = 32;
    
    // Generar la geometría del cilindro
    for (let y = 0; y <= 1; y++) {
        const v = y * height;

        for (let x = 0; x <= radialSegments; x++) {
            const u = x / radialSegments;
            const theta = u * Math.PI * 2;

            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            const vx = y === 0 ? radiusBottom * cosTheta : radiusTop * cosTheta;
            const vy = v;
            const vz = y === 0 ? radiusBottom * sinTheta : radiusTop * sinTheta;

            vertices.push(vx, vy, vz);
            uvs.push(u, y);
        }
    }

    // Generar los índices de los triángulos del cilindro
    for (let x = 0; x < radialSegments; x++) {
        const i0 = x;
        const i1 = x + 1;
        const i2 = x + radialSegments + 1;
        const i3 = x + radialSegments + 2;

        indices.push(i0, i1, i2);
        indices.push(i1, i3, i2);
    }

    // Añadir tapa inferior
    const baseCenterIndex = vertices.length / 3;
    vertices.push(0, 0, 0);
    uvs.push(0.5, 0.5);

    for (let x = 0; x < radialSegments; x++) {
        const i0 = x;
        const i1 = x + 1;
        indices.push(baseCenterIndex, i0, i1);
    }

    // Añadir tapa superior
    const topCenterIndex = vertices.length / 3;
    vertices.push(0, height, 0);
    uvs.push(0.5, 0.5);

    for (let x = 0; x < radialSegments; x++) {
        const i0 = x + radialSegments + 1;
        const i1 = i0 + 1;
        indices.push(topCenterIndex, i1, i0);
	}

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.setIndex(indices);

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
	

    return {caterpillarD, caterpillarI};
};

export default createCaterpillar;
import * as THREE from 'three';

// Crea la geometría de un cilindro
const createCylinderGeometry = (radiusTop, radiusBottom, height, radialSegments) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = [];

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

    return geometry;
};

export default createCylinderGeometry;
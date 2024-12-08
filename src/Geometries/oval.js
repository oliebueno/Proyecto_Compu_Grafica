import * as THREE from 'three';

// Crea la geometría de un ovalo
const createOvalGeometry = (radiusX, radiusY, segments) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const uvs = [];
    const indices = [];

    for (let y = 0; y <= segments; y++) {
        const theta = y * Math.PI / segments;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let x = 0; x <= segments; x++) {
            const phi = x * 2 * Math.PI / segments;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const vx = radiusX * cosPhi * sinTheta;
            const vy = radiusY * cosTheta;
            const vz = radiusX * sinPhi * sinTheta;

            vertices.push(vx, vy, vz);
            uvs.push(x / segments, y / segments);
        }
    }

    for (let y = 0; y < segments; y++) {
        for (let x = 0; x < segments; x++) {
            const base = y * (segments + 1) + x;

            const a = base;
            const b = base + 1;
            const c = base + segments + 1;
            const d = base + segments + 2;

            indices.push(a, b, c);
            indices.push(b, d, c);
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.setIndex(indices);

    return geometry;
};

export default createOvalGeometry;
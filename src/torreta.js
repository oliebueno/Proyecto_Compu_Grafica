import * as THREE from 'three';

const createTurret = () => {
    // Parámetros para la esfera
    const radius = 10;
    const widthSegments = 32;
    const heightSegments = 32;

    // Crear la geometría de la esfera
    const geometry = new THREE.BufferGeometry();
    
    // Crear los vértices de la esfera
    const vertices = [];
    const indices = [];
    const uvs = [];
    
    for (let y = 0; y <= heightSegments; y++) {
        const theta = y * Math.PI / heightSegments;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let x = 0; x <= widthSegments; x++) {
            const phi = x * 2 * Math.PI / widthSegments;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const vx = radius * cosPhi * sinTheta;
            const vy = radius * cosTheta;
            const vz = radius * sinPhi * sinTheta;

            vertices.push(vx, vy, vz);
            uvs.push(x / widthSegments, y / heightSegments);
        }
    }

    for (let y = 0; y < heightSegments; y++) {
        for (let x = 0; x < widthSegments; x++) {
            const base = (y * (widthSegments + 1)) + x;

            const a = base;
            const b = base + 1;
            const c = base + widthSegments + 1;
            const d = base + widthSegments + 2;

            indices.push(a, b, c);
            indices.push(b, d, c);
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.setIndex(indices);

    // Crear el material de la torreta
    const material = new THREE.MeshStandardMaterial({ color: 0xFF0000}); // Verde

    // Crear la malla de la torreta
    const turret = new THREE.Mesh(geometry, material);
    turret.position.set(0, 12, -20); // Ajusta la altura según la estructura del tanque

    return turret;
};

export default createTurret;

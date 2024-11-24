import * as THREE from 'three';

// Crea el sprite animado de las vidas
export function createAnimatedSprite(scene, columns, rows) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('src/Atlas/lifes.jpg', function () {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1 / columns, 1 / rows);
    });

    // Crea el sprite
    const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture 
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(-window.innerWidth/2 + 50, window.innerHeight/2 - 50, 1);
    sprite.scale.set(50, 50, 1);
    scene.add(sprite);

    const totalFrames = columns * rows;
    let currentFrame = 0;
    let frameDelay = 20;
    let frameCounter = 0;

    function updateSprite() {
        frameCounter++;
        if (frameCounter >= frameDelay) {
            frameCounter = 0;

            const column = currentFrame % columns;
            const row = Math.floor(currentFrame / columns);

            texture.offset.x = column / columns;
            texture.offset.y = row / rows;

            currentFrame = (currentFrame + 1) % totalFrames;
        }
    }

    return updateSprite;
}

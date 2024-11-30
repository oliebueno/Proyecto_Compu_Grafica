import * as THREE from 'three';

// Función para crear una secuencia de palabras
export function createTextSequence(scene, sequences, columns, rows, x, y, z, spriteWidth, spriteHeight, ruta, alpha) {
    const loader = new THREE.TextureLoader();

    const alphabet = alpha;
    const spaceWidth = spriteWidth / 2;

    function createTextSprites(text, duration, onComplete) {
        let offsetX = x;
        const sprites = [];
        const letterSpacing = 0;
        loader.load(ruta, function (alphabetTexture) {
            alphabetTexture.wrapS = THREE.RepeatWrapping;
            alphabetTexture.wrapT = THREE.RepeatWrapping;
            alphabetTexture.repeat.set(1 / columns, 1 / rows);

            for (let i = 0; i < text.length; i++) {
                const char = text[i].toLowerCase();

                if (char === ' ') {
                    offsetX += spaceWidth;
                    continue;
                }

                const index = alphabet.indexOf(char);

                if (index !== -1) {
                    const charTexture = alphabetTexture.clone();
                    charTexture.needsUpdate = true;

                    const column = index % columns;
                    const row = Math.floor(index / columns);

                    charTexture.offset.x = column / columns;
                    charTexture.offset.y = 1 - (row + 1) / rows;

                    const spriteMaterial = new THREE.SpriteMaterial({ map: charTexture });
                    const sprite = new THREE.Sprite(spriteMaterial);
                    sprite.scale.set(spriteWidth, spriteHeight, 1);
                    const adjustedY = y - (spriteHeight / 2);
                    sprite.position.set(offsetX, adjustedY, z);

                    scene.add(sprite);
                    sprites.push(sprite);

                    offsetX += spriteWidth + letterSpacing;
                }
            }

            // Eliminar sprites después de la duración especificada
            if (duration) {
                setTimeout(() => {
                    sprites.forEach(sprite => {
                        scene.remove(sprite);
                    });
                    if (onComplete) {
                        onComplete();
                    }
                }, duration);
            } else if (onComplete) {
                onComplete();
            }
        });
    }

    // Función que inicia la secuencia
    function runSequence(index) {
        if (index < sequences.length) {
            const { text, duration } = sequences[index];
            createTextSprites(text, duration, () => runSequence(index + 1));
        }
    }

    runSequence(0);
}

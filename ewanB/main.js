import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; // Correct import path


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


  undefined,
  function(err) {
      console.error('Error loading font:', err);
    }
  
    
    
// Add the code for the 2D canvas overlay

// Create a 2D canvas
const canvas2D = document.createElement('canvas');
const context2D = canvas2D.getContext('2d');

// Set canvas size
canvas2D.width = 1000;
canvas2D.height = 300;

// Set text style
// Set text style
context2D.font = 'Bold 48px Arial';
context2D.fillStyle = '#ffffff'; // Color of the text
context2D.textAlign = 'left'; // Align text to the left
context2D.textBaseline = 'bottom'; // Align text to the top

// Write HTML text onto the canvas
context2D.fillText('Ewan Bracegirdle Age:28', 10, 50); // Adjust position as needed
context2D.fillText('I am a 3d modeller and animator.', 10, 100); // Adjust position as needed
context2D.fillText('I like to code websites.', 10, 150); // Adjust position as needed
context2D.fillText('I am self taught with 2 years of experience.', 10, 200);
context2D.fillText('I have studied at CyberCap.', 10, 250);


// Create a texture from the canvas
const texture2D = new THREE.CanvasTexture(canvas2D);

// Create a material using the texture
const material2D = new THREE.MeshBasicMaterial({ map: texture2D });

// Create a geometry for the mesh (e.g., plane)
const geometry2D = new THREE.PlaneGeometry(10, 5); // Adjust size as needed

// Create a mesh using the geometry and material
const mesh2D = new THREE.Mesh(geometry2D, material2D);

// Position the mesh in the scene
mesh2D.position.set(15, 5, 15); // Adjust position as needed


// Add the mesh to the scene
scene.add(mesh2D);

const canvas2D_2 = document.createElement('canvas');
const context2D_2 = canvas2D_2.getContext('2d');

// Set canvas size
canvas2D_2.width = 1000;
canvas2D_2.height = 300;

// Set text style
// Set text style
context2D_2.font = 'Bold 48px Arial';
context2D_2.fillStyle = '#ffffff'; // Color of the text
context2D_2.textAlign = 'left'; // Align text to the left
context2D_2.textBaseline = 'bottom'; // Align text to the top

// Write HTML text onto the canvas
context2D_2.fillText('Spacebar: Play', 10, 50); // Adjust position as needed
context2D_2.fillText('Leftclick: Rotate camera', 10, 100); // Adjust position as needed
context2D_2.fillText('Rightclick: Pan camera', 10, 150); // Adjust position as needed
context2D_2.fillText('Scrollwheel: Zoom', 10, 200);
context2D_2.fillText('Enjoy!', 10, 250);


// Create a texture from the canvas
const texture2D_2 = new THREE.CanvasTexture(canvas2D_2);

// Create a material using the texture
const material2D_2 = new THREE.MeshBasicMaterial({ map: texture2D_2 });

// Create a geometry for the mesh (e.g., plane)
const geometry2D_2 = new THREE.PlaneGeometry(10, 5); // Adjust size as needed

// Create a mesh using the geometry and material
const mesh2D_2 = new THREE.Mesh(geometry2D_2, material2D_2);

// Position the mesh in the scene
mesh2D_2.position.set(-13, 5, 15); // Adjust position as needed


// Add the mesh to the scene
scene.add(mesh2D_2);


// The rest of your code remains unchanged...

// The rest of your code remains unchanged...

const geometry = new THREE.TorusGeometry(20, 3, 16, 50);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

torus.position.setZ(66);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const stars = []; // Array to store stars

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshToonMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
    stars.push(star); // Add star to the stars array
}

Array(200).fill().forEach(addStar);

const video = document.getElementById('video');
video.onloadeddata = function () {
    if (!video.paused) {
        console.log("Video is playing");
    }
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        console.log("Video is loaded");
    }
    videoTexture.needsUpdate = true;
    videoTexture.minFilter = THREE.LinearFilter;
    videoMaterial.map = videoTexture;
    videoMaterial.needsUpdate = true;
};
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
const screen = new THREE.PlaneGeometry(50, 50);
const videoScreen = new THREE.Mesh(screen, videoMaterial);
videoScreen.position.set(0, 25, -50);
scene.add(videoScreen);

// Create a torus knot geometry
const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

// Create a material for the torus knot
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });

// Create a mesh using the torus knot geometry and material
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);

// Position the torus knot in the scene
torusKnot.position.set(50, 0, 0); // Adjust position as needed

// Add the torus knot to the scene
scene.add(torusKnot);

// Create material for default text


const fallbackText = document.getElementById('text-overlay').innerHTML;

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
});

// Add this line to your JavaScript to display fallback text

function animate() {
    requestAnimationFrame(animate);

    // Rotate the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.005;
    torusKnot.rotation.z += 0.01;

    // Update positions of stars
    stars.forEach(star => {
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(0.3)); // Adjust the spread to slow down movement
        star.position.set(
            star.position.x + x,
            star.position.y + y,
            star.position.z + z
        );
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

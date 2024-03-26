import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';


// Create the Three.js scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100); // Set the initial position of the camera above the plane
camera.rotation.set(-Math.PI / 4, 0, 0); // Rotate the camera to look down towards the scene

// Create the renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up lights and grid
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const textCanvas = document.createElement('canvas');
const textContext = textCanvas.getContext('2d');
textCanvas.width = 1000; // Set canvas width
textCanvas.height = 500; // Set canvas height (adjust according to your text size)

// Set up text properties
textContext.font = '40px Arial'; // Set font size and family
textContext.fillStyle = 'white'; // Set text color
textContext.textAlign = 'center'; // Set text alignment
textContext.fillText('Plateau Mt. Royal Montreal Quebec Canada', textCanvas.width / 2, textCanvas.height / 2); // Draw text

// Calculate the aspect ratio of the text
const textAspectRatio = textCanvas.width / textCanvas.height;

// Create a texture from the canvas
const textTexture = new THREE.CanvasTexture(textCanvas);

// Calculate the width and height of the plane geometry based on the aspect ratio
const planeWidthText = 10;
const planeHeightText = planeWidthText / textAspectRatio;

// Create a plane geometry with the text texture
const textPlaneGeometry = new THREE.PlaneGeometry(planeWidthText, planeHeightText); // Adjust width and height as needed
const textPlaneMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: false });
const textPlane = new THREE.Mesh(textPlaneGeometry, textPlaneMaterial);
textPlane.position.set(0, 5, -20); // Set position of the text plane
scene.add(textPlane); // Add text plane to the scene

textPlane.position.set(10, 50, 80)
textPlane.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0));


// Set up ground plane
const planeWidth=0.7;
const planeHeight=0.7;
const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
// Load texture image
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('BING_SAT_WM.jpg'); // Replace 'path/to/texture.jpg' with your texture file
const planeMaterial = new THREE.MeshBasicMaterial({ map: texture }); // Apply texture to material
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0.1, 0);
plane.rotation.x = -Math.PI / 2;

scene.add(plane);


// Set up orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable rotation

// Custom key bindings for camera movement
document.addEventListener('keydown', (event) => {
    const movementSpeed = 2.0; // Adjust the movement speed as needed
    switch (event.key.toLowerCase()) {
        case 'arrowup':
            camera.position.z -= movementSpeed; // Move camera forward
            break;
        case 'arrowdown':
            camera.position.z += movementSpeed; // Move camera backward
            break;
        case 'arrowleft':
            camera.position.x -= movementSpeed; // Move camera left
            break;
        case 'arrowright':
            camera.position.x += movementSpeed; // Move camera right
            break;
        default:
            break;
    }
});

// Function to handle arrow key press events
function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    // Check if the pressed key is one of the arrow keys
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        // Prevent the default behavior of arrow keys (scrolling)
        event.preventDefault();
    }
}

// Add event listener for keydown events
document.addEventListener('keydown', handleKeyDown);

const outlineEffect = new OutlineEffect(renderer);
// Load the 3D model using OBJLoader
// Load the 3D model using OBJLoader
const objectScaleFactor = 0.09; // Scale factor for the loaded object
const planeScaleFactor = 0.9; // Scale factor for the plane

const loader = new OBJLoader();
loader.load(
    'MTLEWAN.obj',
    function (object) {
      object.scale.set(objectScaleFactor, objectScaleFactor, objectScaleFactor);

        // Calculate the bounding box dimensions of the scaled object
        // Calculate the bounding box dimensions of the loaded object
        const objectBoundingBox = new THREE.Box3().setFromObject(object);
        const objectWidth = objectBoundingBox.max.x - objectBoundingBox.min.x;
        const objectHeight = objectBoundingBox.max.z - objectBoundingBox.min.z; // Use z dimension for height since OBJ models typically use Y-up coordinates

        // Update the size of the ground plane to match the object
        const planeWidth = objectWidth * planeScaleFactor;
        const planeHeight = objectHeight * planeScaleFactor;
        planeGeometry.parameters.width = planeWidth;
        planeGeometry.parameters.height = planeHeight;
        planeGeometry.dispose(); // Dispose geometry to update its parameters
        plane.scale.set(0.1, 0.1, 0.1); // Reset scale before setting size
        plane.scale.set(planeWidth, planeHeight);

        // Position the plane beneath the object
        plane.position.set(-37.3, objectBoundingBox.min.y, -10);

        object.rotation.y = THREE.MathUtils.degToRad(5);

        // Add the plane to the scene
        scene.add(plane);

        // Add the loaded object to the scene
        scene.add(object);

        // Render the scene
        renderer.render(scene, camera);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error occurred while loading the OBJ model:', error);
    }
);




// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    outlineEffect.render(scene, camera);
}

animate();

// Change background color upon pressing the 'A' key
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'a') {
        const colors = [0xc2d68f, 0xc2b280, 0xd4c19e, 0xb0b291, 0xbfae9c, 0xccc5a8];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        renderer.setClearColor(new THREE.Color(randomColor), 1);
    }
});

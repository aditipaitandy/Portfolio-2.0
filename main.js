// Import Three.js library
import * as THREE from 'three';

function init() {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const positionArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positionArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Define qualifications points
    const qualifications = [
        { position: new THREE.Vector3(-2, 1, 0), label: 'BCA Graduate' },
        { position: new THREE.Vector3(0, 2, 0), label: 'MCA in Data Science' },
        { position: new THREE.Vector3(2, 1, 0), label: 'Internship as Front-End Developer' },
        { position: new THREE.Vector3(0, 0, 0), label: 'Data Analyst Course' },
    ];

    // Create lines connecting qualifications
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color for lines
    const lineGeometry = new THREE.BufferGeometry();
    
    // Create an array of positions for the lines
    const linePositions = new Float32Array(qualifications.length * 3);
    qualifications.forEach((qual, index) => {
        linePositions[index * 3] = qual.position.x;
        linePositions[index * 3 + 1] = qual.position.y;
        linePositions[index * 3 + 2] = qual.position.z;
    });

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    // Create the lines and add to the scene
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Animate particles
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        line.rotation.y += 0.001; // Optional: rotate the line for added effect
        renderer.render(scene, camera);
    }
    animate();

    // Update on window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

init();

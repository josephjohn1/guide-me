import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const WalkingPerson = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, person;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 5, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      //const controls = new OrbitControls(camera, renderer.domElement);

      const loader = new GLTFLoader();
      loader.load(
        '/models/Startwalking.glb',
        (gltf) => {
          person = gltf.scene;
          person.scale.set(0.1, 0.1, 0.1);
          person.position.set(0, 0, 0);
          scene.add(person);

          animate();
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
        }
      );

      const animate = () => {
        requestAnimationFrame(animate);

        // Update code for walking animation
        if (person) {
          person.rotation.y += 0.01; // Rotate the person
        }

        renderer.render(scene, camera);
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        mountRef.current.removeChild(renderer.domElement);
      };
    };

    init();
  }, []);

  return <div ref={mountRef} />;
};

export default WalkingPerson;

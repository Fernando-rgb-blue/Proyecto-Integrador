"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Escena, cámara y renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        1,
        1000
        );
        camera.position.z = 200;

        const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Material con color por defecto (modo claro)
        const material = new THREE.PointsMaterial({
        color: "#87ceeb",
        size: 2,
        sizeAttenuation: true,
        });

        const updateMaterialColor = () => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        material.color.set(isDarkMode ? "#00ffff" : "#87ceeb");
        };

        updateMaterialColor();

        const observer = new MutationObserver(updateMaterialColor);
        observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
        });

        // Partículas
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 800;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Movimiento con el mouse
        const mouse = { x: 0, y: 0 };
        const targetRotation = { x: 0, y: 0 };

        const onMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        mouse.x = x - 0.5;
        mouse.y = y - 0.5;

        targetRotation.x = mouse.y * 0.6;
        targetRotation.y = mouse.x * 0.6;
        };

        window.addEventListener("mousemove", onMouseMove);

        const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.05;
        particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.05;
        renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
        };
    }, []);

    return (
        <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[-1] pointer-events-none"
        />
    );
}

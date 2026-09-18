"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

export interface DepthLayer {
  src: string;
  /** Negative = further from camera. */
  z: number;
}

/**
 * The actual WebGL work — dynamically imported with ssr:false by
 * DepthScene, and only mounted once the section is near the viewport.
 * Three image planes at increasing depth; the camera dollies toward them
 * as the user scrolls, render-on-demand (no idle RAF loop) so it costs
 * nothing when the user isn't actively scrolling this section.
 */
export function DepthSceneCanvas({
  layers,
  rootRef,
}: {
  layers: DepthLayer[];
  rootRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 0;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const loader = new THREE.TextureLoader();
    const meshes: THREE.Mesh[] = [];
    const textures: THREE.Texture[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    function planeSizeAtDepth(depth: number) {
      const distance = Math.abs(camera.position.z - depth);
      const vFov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFov / 2) * distance;
      const width = height * camera.aspect;
      return { width: width * 1.15, height: height * 1.15 };
    }

    layers.forEach((layer, i) => {
      const texture = loader.load(layer.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.push(texture);

      const { width, height } = planeSizeAtDepth(layer.z);
      const geometry = new THREE.PlaneGeometry(width, height);
      geometries.push(geometry);

      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: i === 0 ? 1 : 0.98 });
      materials.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(i % 2 === 0 ? 0 : (i - 1) * 0.4, 0, layer.z);
      scene.add(mesh);
      meshes.push(mesh);
    });

    function render() {
      renderer.render(scene, camera);
    }

    function resize() {
      const { clientWidth, clientHeight } = canvas!;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
      meshes.forEach((mesh, i) => {
        const layer = layers[i]!;
        const { width, height } = planeSizeAtDepth(layer.z);
        mesh.geometry.dispose();
        const newGeo = new THREE.PlaneGeometry(width, height);
        mesh.geometry = newGeo;
        geometries[i] = newGeo;
      });
      render();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const farthest = layers[layers.length - 1]?.z ?? -10;
    const tween = gsap.fromTo(
      camera.position,
      { z: 0 },
      {
        z: farthest + 1.2,
        ease: "none",
        onUpdate: render,
        scrollTrigger: { trigger: root, start: "top top", end: "+=140%", scrub: 0.6, pin: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      resizeObserver.disconnect();
      meshes.forEach((mesh) => scene.remove(mesh));
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [layers, rootRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

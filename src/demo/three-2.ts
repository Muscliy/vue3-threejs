import type { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import * as Three from "three";
import { onMounted, type Ref } from "vue";

export function useThree2(dom: Ref<Element>) {
  let renderer: WebGLRenderer;
  function initThree() {
    const width = dom.value.clientWidth;
    const height = dom.value.clientHeight;
    renderer = new Three.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1.0);
    dom.value.appendChild(renderer.domElement);
  }

  let camera: PerspectiveCamera;
  function initCamera() {
    const width = dom.value.clientWidth;
    const height = dom.value.clientHeight;
    camera = new Three.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 1000, 0);
    camera.lookAt(0, 0, 0);
  }

  let scene: Scene;
  function initScene() {
    scene = new Three.Scene();
  }

  let cube: Object3D;
  function initObject() {
    const material = new Three.LineBasicMaterial({
      vertexColors: true,
    });

    const points = [];
    points.push(new Three.Vector3(-100, 0, 100));
    points.push(new Three.Vector3(100, 0, -100));
    points.push(new Three.Vector3(0, -100, 0));
    const geometry = new Three.BufferGeometry().setFromPoints(points);

    const colors = new Float32Array([1, 0, 0, 0, 0, 1, 0, 1, 0]);
    const color = new Three.BufferAttribute(colors, 3);
    geometry.setAttribute("color", color);

    cube = new Three.Line(geometry, material);
    cube.type = "LineSegments";
    scene.add(cube);
  }

  onMounted(() => {
    initThree();
    initCamera();
    initScene();
    initObject();
    renderer.clear();
    renderer.render(scene, camera);
  });
}

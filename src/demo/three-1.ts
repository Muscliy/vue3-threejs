/* eslint-disable no-debugger */
import { onMounted, type Ref } from "vue";
import * as Three from "three";

export function useThree1(dom: Ref<Element>) {
  onMounted(() => {
    const width = dom.value.clientWidth;
    const height = dom.value.clientHeight;
    const scene = new Three.Scene();

    const camera = new Three.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 5;

    const renderer = new Three.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor("#ffffff");
    dom.value.appendChild(renderer.domElement);

    const geometry = new Three.BoxGeometry(2, 2, 2);
    const material = new Three.MeshBasicMaterial({ color: "#ff0000" });
    const cubeMesh = new Three.Mesh(geometry, material);

    scene.add(cubeMesh);

    function render() {
      requestAnimationFrame(render);
      cubeMesh.rotation.x += 0.01;
      cubeMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    render();
  });
}

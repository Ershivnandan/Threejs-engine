import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Engine {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.init();
    this.render();
  }

  init() {
    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 0, 2);
    this.renderer = new Three.WebGLRenderer({ canvas: this.canvas });
    this.setupControls();
    this.windowResize();
    this.setup();
    this.fullSize();
    this.loadingManager();
  }

  render() {
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
    this.update();
    requestAnimationFrame(() => this.render());
  }

  setupControls() {
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }

  windowResize() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  fullSize() {
    window.addEventListener("dblclick", () => {
      this.fullScreen =
        document.fullscreenElement || document.webkitFullscreenElement;

      if (!this.fullScreen) {
        if (this.canvas.requestFullscreen) {
          this.canvas.requestFullscreen();
        } else if (this.canvas.webkitRequestFullscreen) {
          this.canvas.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }

  loadingManager() {
    this.loaderelement = document.getElementById("loader");

    this.loader = new Three.LoadingManager();

    this.loader.onStart = (url, itemsLoaded, itemsTotal) => {
      this.loaderelement.style.display = "flex";
    };

    this.loader.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressPercentage = (itemsLoaded / itemsTotal) * 100;
      const backgroundPosition = `${progressPercentage}% 0%, ${
        100 + progressPercentage
      }% 0%, ${200 + progressPercentage}% 0%`;
      this.loaderelement.style.backgroundPosition = backgroundPosition;
    };

    this.loader.onLoad = () => {
      this.loaderelement.style.display = "none";
    };
  }
}

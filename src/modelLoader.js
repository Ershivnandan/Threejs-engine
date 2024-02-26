import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Engine from "../Engine/engine";
import GUI from "lil-gui";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment";

export default class modelLoader extends Engine {
  constructor({ canvas }) {
    super({ canvas });
    this.setup();
    this.update();
    this.setupLight();
    this.setupGui();
    this.loadingTexture();
  }


  loadingTexture(){
    this.textureLoader = new Three.TextureLoader();

    this.silverTexture = this.textureLoader.load('static/mytextures/silverMetal.jpg');
    this.blackTexture = this.textureLoader.load('static/mytextures/blackMetal.jpg');

  }

  setup() {
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.clock = new Three.Clock();


    this.gltfLoader.load("static/models/myAssemblyCompressed.glb", (model) => {
      model.scene.scale.set(5, 5, 5);
      this.bottle = model;
      console.log(model);
      model.scene.position.set(0,-2,1);

      this.mixer = new Three.AnimationMixer(this.bottle.scene);

      this.bottomAnimation = this.mixer.clipAction(
        this.bottle.animations[0]
      );
      this.infuserAnimation = this.mixer.clipAction(
        this.bottle.animations[1]
      );
      this.middleAnimation = this.mixer.clipAction(
        this.bottle.animations[2]
      );
      this.capAnimation = this.mixer.clipAction(
        this.bottle.animations[3]
      );
      this.textAnimation = this.mixer.clipAction(
        this.bottle.animations[4]
      );
      this.pcbAnimation = this.mixer.clipAction(
        this.bottle.animations[5]
      );

      this.playAnimations();

      this.scene.add(this.bottle.scene);
         
    this.update();
    });

    this.camera.position.set(0, 2, 5);

 

  }

  playAnimations() {
    this.bottomAnimation.play();
    this.infuserAnimation.play();
    this.middleAnimation.play();
    this.capAnimation.play();
    this.textAnimation.play();
    this.pcbAnimation.play();
  }

  setupLight() {
    //Ambiant Light
    this.ambiantLight = new Three.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambiantLight);


    //Directional light

    this.directionalLightGroup = new Three.Group();

    //light 1
    this.directionalLight = new Three.DirectionalLight(0xffffff, 3.5);
    this.directionalLightGroup.add(this.directionalLight);
    this.directionalLight.position.set(0, 4, 0);

    //light 2
    this.directionalLight2 = new Three.DirectionalLight(0xffffff, 3.5);
    this.directionalLightGroup.add(this.directionalLight2);
    this.directionalLight2.position.set(0, 0, 3);

    //light 3
    this.directionalLight3 = new Three.DirectionalLight(0xffffff, 3.5);
    this.directionalLightGroup.add(this.directionalLight3);
    this.directionalLight3.position.set(0, 0, -3);

    //adding to group
    this.scene.add(this.directionalLightGroup);

    //DirectionalLight helper 
    this.directionalLightHelper = new Three.DirectionalLightHelper(this.directionalLight);
    // this.scene.add(this.directionalLightHelper);

    this.hemisphereLight = new Three.HemisphereLight(0xffffff, 0xffffff, 0.5);
    // this.scene.add(this.hemisphereLight);

    this.hemisphereLightHelper = new Three.HemisphereLightHelper(this.hemisphereLight, 2, 'blue');
    // this.scene.add(this.hemisphereLightHelper);
  }

  setupGui() {
    this.gui = new GUI({ title: "Setup by Shiv", close: true });

    //Ambinat light Controls
    this.ambiantLightControl = this.gui.addFolder("Ambiant Light");
    this.ambiantLightControl.add(this.ambiantLight, "intensity").min(0.5).max(10).name("Intensity").step(0.5);

    //Directional Light Controls
    this.directionalLigthcontrols = this.gui.addFolder("Directional Light");
    this.directionalLigthcontrols.add(this.directionalLight.position, 'x').min(-10).max(10).name('position X').step(1);
    this.directionalLigthcontrols.add(this.directionalLight.position, 'y').min(-10).max(10).name('position Y').step(1);
    this.directionalLigthcontrols.add(this.directionalLight.position, 'z').min(-10).max(10).name('position Z').step(1);
    this.directionalLigthcontrols.add(this.directionalLight, "intensity").min(0.5).max(10).name("intensity").step(0.5);

    //Hemisphere light
    // this.hemisphereLightControls = this.gui.addFolder('Hemisphere Light');
    // this.hemisphereLightControls.add(this.hemisphereLight.position, 'x').min(-10).max(10).name('position X').step(1);
    // this.hemisphereLightControls.add(this.hemisphereLight.position, 'y').min(-10).max(10).name('position Y').step(1);
    // this.hemisphereLightControls.add(this.hemisphereLight.position, 'z').min(-10).max(10).name('position Z').step(1);
    // this.hemisphereLightControls.add(this.hemisphereLight, 'intensity').min(0.5).max(20).name('Intensity').step(1);
  }


  update() {

    if (this.mixer) {
      const delta = this.clock.getDelta();
      this.mixer.update(delta);
    }
  }
}

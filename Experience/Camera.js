import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.debugger = this.experience.debugger;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.renderer = this.experience.renderer;
    this.config = this.experience.config;

    if (this.config.vertical === true) {
      this.aboutMeDistance = 2.6;
      this.projectsDistance = 4.6;
    } else {
      this.aboutMeDistance = 2.2;
      this.projectsDistance = 4.2;
    }

    this.setInstance();
    this.setHelpers(this.debugger.active);
    this.setOrbitControls();
    this.setCamAngles();
    this.setTransitions();


    if (this.debugger.active) {
      this.debugFolder = this.debugger.ui.addFolder("camera");

      this.positionDebugFolder =
        this.debugFolder.addFolder("setCameraPosition");
      this.positionDebugFolder
        .add(this.instance.position, "x")
        .min(-20)
        .max(20)
        .step(0.1);
      this.positionDebugFolder
        .add(this.instance.position, "y")
        .min(-20)
        .max(20)
        .step(0.1);
      this.positionDebugFolder
        .add(this.instance.position, "z")
        .min(-20)
        .max(20)
        .step(0.1);

      this.scene.add(new THREE.Mesh(this.testHitBox, this.testHitBoxMaterial));

      this.cam = false;
      this.cameraToggle = { unlockCamera: false };
      this.debugFolder.add(this.cameraToggle, "unlockCamera").onChange(() => {
        this.cam ? this.camAngle.default() : this.camAngle.unlocked();
      });
      
    }
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.instance.position.z = 0;
    this.instance.position.y = 0;
    this.instance.position.x = 0;
    this.scene.add(this.instance);
  }

  setHelpers(showHelpers) {
    this.helpers = {};
    this.helpers.size = 10;
    this.helpers.divisions = 10;

    this.helpers.gridHelper = new THREE.GridHelper(
      this.helpers.size,
      this.helpers.divisions
    );
    this.helpers.axesHelper = new THREE.AxesHelper(this.helpers.size);

    this.scene.add(this.helpers.gridHelper);
    this.scene.add(this.helpers.axesHelper);

    if (showHelpers) {
      this.helpers.gridHelper.visible = true;
      this.helpers.axesHelper.visible = true;
    } else {
      this.helpers.gridHelper.visible = false;
      this.helpers.axesHelper.visible = false;
    }
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(this.instance, this.canvas);
    this.orbitControls.enableDamping = true;
    this.orbitControls.enablePan = false;
    this.orbitControls.enableZoom = true;
  }

  setCamAngles() {
    this.camAngle = {};

    this.camAngle.unlocked = () => {
      this.orbitControls.minDistance = 0;
      this.orbitControls.maxDistance = 30;
      this.orbitControls.minAzimuthAngle = 0;
      this.orbitControls.maxAzimuthAngle = Math.PI * 1.9999;
      this.orbitControls.minPolarAngle = 0;
      this.orbitControls.maxPolarAngle = Math.PI;
      this.orbitControls.rotateSpeed = 1;
      this.cam = true;
    };

    this.camAngle.default = () => {
      this.orbitControls.minDistance = 0;
      this.orbitControls.maxDistance = 20;
      this.orbitControls.minAzimuthAngle = 0;
      this.orbitControls.maxAzimuthAngle = Math.PI * 1.9999;
      this.orbitControls.minPolarAngle = Math.PI * 0.2;
      this.orbitControls.maxPolarAngle = 1.5;
      this.orbitControls.rotateSpeed = 1;
      this.cam = false;
    };

    this.camAngle.cabinet = () => {
      this.orbitControls.minDistance = 3.5;
      this.orbitControls.maxDistance = 4.5;
      this.orbitControls.minAzimuthAngle = -1.1; //left
      this.orbitControls.maxAzimuthAngle = -0.8; //right
      this.orbitControls.minPolarAngle = 0.5;
      this.orbitControls.maxPolarAngle = 0.9;
    };

    this.camAngle.computer = () => {
      this.orbitControls.minDistance = 3;
      this.orbitControls.maxDistance = 4;
      this.orbitControls.minAzimuthAngle = 0.65;
      this.orbitControls.maxAzimuthAngle = 0.75;
      this.orbitControls.minPolarAngle = 1.3;
      this.orbitControls.maxPolarAngle = 1.4;
    };

    this.camAngle.phone = () => {
      this.orbitControls.minDistance = 1.5;
      this.orbitControls.maxDistance = 2;
      this.orbitControls.minAzimuthAngle = 1.8; //left
      this.orbitControls.maxAzimuthAngle = 2.0; //right
      this.orbitControls.minPolarAngle = 0.3;
      this.orbitControls.maxPolarAngle = 0.5;
    };
  }

  setTransitions() {
    this.transitions = {};

    this.transitions.default = async (duration) => {
      this.orbitControls.enableRotate = false;
      this.orbitControls.enableZoom = false;

      gsap.to(this.instance.position, {
        duration: duration,
        ease: "power1.inOut",
        x: 10,
        y: 10,
        z: 10,
      });

      gsap.to(this.orbitControls.target, {
        duration: duration,
        ease: "power1.inOut",
        x: 0,
        y: 0,
        z: 0,
      });

      await this.sleep(1500);
      this.orbitControls.enableRotate = true;
      this.orbitControls.enableZoom = true;
      this.orbitControls.rotateSpeed = 1;
    };

    this.transitions.cabinet = async (duration) => {
      this.orbitControls.enableRotate = false;
      this.orbitControls.enableZoom = false;

      gsap.to(this.instance.position, {
        duration: duration,
        ease: "power1.inOut",
        x: 0.4,
        y: 2.56,
        z: 0.75,
      });
      gsap.to(this.orbitControls.target, {
        duration: duration,
        ease: "power1.inOut",
        x: 2.5,
        y: -0.5,
        z: -0.75,
      });

      await this.sleep(1500);
      this.orbitControls.enableRotate = true;
      this.orbitControls.enableZoom = true;
      this.orbitControls.rotateSpeed = 0.05;
    };

    this.transitions.computer = async (duration) => {
      this.orbitControls.enableRotate = false;
      this.orbitControls.enableZoom = false;

      gsap.to(this.instance.position, {
        duration: duration,
        ease: "power1.inOut",
        x: -0.53392,
        y: 1.901221,
        z: -0.04970,
      });
      gsap.to(this.orbitControls.target, {
        duration: duration,
        ease: "power1.inOut",
        x: -2.7,
        y: 1.175,
        z: -2.7,
      });

      await this.sleep(1500);
      this.orbitControls.enableRotate = true;
      this.orbitControls.enableZoom = true;
      this.orbitControls.rotateSpeed = 0.01;
    };

    this.transitions.phone = async (duration) => {
      this.orbitControls.enableRotate = false;
      this.orbitControls.enableZoom = false;

      gsap.to(this.instance.position, {
        duration: duration,
        ease: "power1.inOut",
        x: -2.56,
        y: 2,
        z: 0.57
      });
      gsap.to(this.orbitControls.target, {
        duration: duration,
        ease: "power1.inOut",
        x: -3.27,
        y: 0.25,
        z: 0.81
      });

      await this.sleep(1500);
      this.orbitControls.enableRotate = true;
      this.orbitControls.enableZoom = true;
      this.orbitControls.rotateSpeed = 0.05;
    };
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  resize() {
    //updating perspective camera on resize
    this.instance.aspect = this.sizes.aspect;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.orbitControls.update();
    // console.log("x  : " + this.instance.position.x);
    // console.log("y  : " + this.instance.position.y);
    // console.log("z  : " + this.instance.position.z);
    // console.log("azi: " + this.orbitControls.getAzimuthalAngle());
    // console.log("pol: " + this.orbitControls.getPolarAngle() +"\n");

  }
}

import * as THREE from "three";
import { Material, Mesh } from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debugger = this.experience.debugger;

    if (this.debugger.active) {
      this.debugFolder = this.debugger.ui.addFolder("environment");
    }

    this.setSunlight();
    this.setFloor();
    this.setFog();
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#e8e8e8", .5);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(2048, 2048);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(2, 10, 6);
    this.scene.add(this.sunlight);

    if (this.debugger.active) {
      this.sunlightHelpers = new THREE.DirectionalLightHelper(this.sunlight, 0xffffff);
      this.scene.add(this.sunlightHelpers);
    }

    this.ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    this.scene.add(this.ambientLight);
  }

  setFloor() {
    this.floorGeometry = new THREE.PlaneGeometry( 100,100);
    this.floorMaterial = new THREE.MeshBasicMaterial( {color: 0x040404, side: THREE.BackSide });
    this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial );
    this.floor.rotateX(Math.PI/2);
    this.floor.position.y = -3.75;
    this.scene.add(this.floor);
  }

  setFog() {
    this.scene.background = new THREE.Color( 0x000000 );
		this.scene.fog = new THREE.FogExp2( 0x000000, 0.033 );
  }

  resize() {}

  update() {}
}

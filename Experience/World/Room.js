import * as THREE from "three";
import { LoopPingPong } from "three";

import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.cubicle;
    this.actualRoom = this.room.scene;
    this.controls = this.experience.controls;
    this.debugger = this.experience.debugger;

    if (this.debugger.active) {
      this.debugFolder = this.debugger.ui.addFolder("room");
    }

    this.mixer = new THREE.AnimationMixer(this.actualRoom);

    this.setModel();
    this.setAnimation();
    this.animateTo();
  }

  setModel() {
    this.scene.add(this.actualRoom);
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === "Monitor_Screen") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0xffffff);
        child.material.ior = 1;
        child.material.opacity = 1;
        child.material.transmission = 1;
      }

      if (child.name === "Monitor_Display") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.minesweeper,
        });
      }
    });
  }

  setAnimation() {
    this.room.animations.forEach((animation) => {
      if (animation.name === "Right BallAction") {
        this.cradleRight = this.mixer.clipAction(animation);
        this.cradleRight.play();
      } else if (animation.name === "Left BallAction") {
        this.cradleLeft = this.mixer.clipAction(animation);
        this.cradleLeft.play();
      }
    });
  }

  animateTo() {
    this.animateObject = {};

    //making the folder animations play so they repetitions are all exhausted up
    this.selectedFolder = [];
    this.room.animations.forEach((animation) => {
      for (let folder = 0; folder < 12; folder++) {
        if (animation.name === "Folder" + (folder + 1) + "Action") {
          this.selectedFolder[folder] = this.mixer.clipAction(animation);
          this.selectedFolder[folder].loop = THREE.LoopPingPong;
          this.selectedFolder[folder].repetitions = 2;
          this.selectedFolder[folder].play();
        }
      }
    });

    //opening and closing cabinet
    this.room.animations.forEach((animation) => {
      if (animation.name === "TopRailBigAction") {
        this.bigRail = this.mixer.clipAction(animation);
        this.bigRail.loop = THREE.LoopPingPong;
        this.bigRail.repetitions = 2;
        this.topCabinet.play();
      } else if (animation.name === "CabinetDrawerTopCoverAction") {
        //open cabinet animation
        this.topCabinet = this.mixer.clipAction(animation);
        this.topCabinet.loop = THREE.LoopPingPong;
        this.topCabinet.repetitions = 2;
        this.topCabinet.play();
      }
    });

    this.animateObject.openCabinet = async () => {
      this.bigRail.reset();
      setTimeout(() => {
        this.bigRail.paused = true;
      }, this.bigRail.getClip().duration * 1000);

      this.topCabinet.reset();
      setTimeout(() => {
        this.topCabinet.paused = true;
      }, this.topCabinet.getClip().duration * 1000);

      await this.sleep(1500);
    };
    this.animateObject.closeCabinet = async () => {
      this.bigRail.paused = false;
      this.topCabinet.paused = false;

      await this.sleep(1500);
    };

    //pressing dials on telephone
    this.animateObject.instagramDial = async () => {
      this.room.animations.forEach((animation) => {
        if (animation.name === "Speed Dials.instagramAction") {
          this.instagram = this.mixer.clipAction(animation);
          this.instagram.repetitions = 1;
          this.instagram.play();
          this.instagram.reset();
        }
      });
      await this.sleep(500);
    };
    this.animateObject.mailDial = async () => {
      this.room.animations.forEach((animation) => {
        if (animation.name === "Speed Dials.mailAction") {
          this.mail = this.mixer.clipAction(animation);
          this.mail.repetitions = 1;
          this.mail.play();
          this.mail.reset();
        }
      });
      await this.sleep(500);
    };
    this.animateObject.linkedinDial = async () => {
      this.room.animations.forEach((animation) => {
        if (animation.name === "Speed Dials.linkedinAction") {
          this.linkedin = this.mixer.clipAction(animation);
          this.linkedin.repetitions = 1;
          this.linkedin.play();
          this.linkedin.reset();
        }
      });
      await this.sleep(500);
    };
    this.animateObject.githubDial = async () => {
      this.room.animations.forEach((animation) => {
        if (animation.name === "Speed Dials.githubAction") {
          this.github = this.mixer.clipAction(animation);
          this.github.repetitions = 1;
          this.github.play();
          this.github.reset();
        }
      });
      await this.sleep(500);
    };

    this.animateObject.openFolder = async (folder) => {
      this.selectedFolder[folder - 1].reset();
      setTimeout(() => {
        this.selectedFolder[folder - 1].paused = true;
      }, this.selectedFolder[folder - 1].getClip().duration * 1000);
      await this.sleep(100);
    };

    //close folder
    this.animateObject.closeFolder = async (folder) => {
      this.selectedFolder[folder - 1].paused = false;
      await this.sleep(100);
    };
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  resize() {}

  update() {
    this.mixer.update(this.time.delta * 0.001);
  }
}

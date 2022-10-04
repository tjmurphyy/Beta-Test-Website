import * as THREE from "three";
import { GridHelper, Group } from "three";
import Experience from "./Experience";
import Room from "./World/Room";

export default class RayCaster {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debugger = this.experience.debugger;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.performance = this.experience.performance;
    this.preLoader = this.experience.preLoader;
    this.controls = this.experience.controls;
    this.config = this.experience.config;

    this.preLoader.on("start", () => {
      this.config.touch = this.experience.config.touch;
      this.room = this.experience.room;
      this.raycaster = new THREE.Raycaster();
      this.hoverRaycaster = new THREE.Raycaster();
      this.hoveredFolder = {};
      this.cursor = new THREE.Vector2();

      this.touchedPoints = [];
      this.hoveredPoints = [];

      //hitboxes for menu options
      this.menuHitBoxes = new THREE.Group();
      this.hitBoxMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      });

      //cabinet hitbox
      this.cabinetHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 3.33, 2.5),
        this.hitBoxMaterial
      );
      this.cabinetHitBox.position.set(2.7, -1.9, -2.75);

      //computer hitbox
      this.computerHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.9, 2, 1.5),
        this.hitBoxMaterial
      );
      this.computerHitBox.position.set(-2.7, 1.05, -2.7);
      this.computerHitBox.rotateY(0.7);
      this.computerHitBox.rotateX(-0.25);

      //phone hitbox
      this.phoneHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.5, 0.66),
        this.hitBoxMaterial
      );
      this.phoneHitBox.position.set(-3.27, 0.25, 0.81);
      this.phoneHitBox.rotateY(0.25);
      this.phoneHitBox.rotateZ(-0.2);

      this.menuHitBoxes.add(
        this.cabinetHitBox,
        this.computerHitBox,
        this.phoneHitBox
      );
      this.scene.add(this.menuHitBoxes);

      //hitboxes for phone
      this.phoneHitBoxes = new THREE.Group();
      this.instagramHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, 0.1),
        this.hitBoxMaterial
      );
      this.instagramHitBox.position.set(-3.5325, 0.35, 0.7725);
      this.instagramHitBox.rotateY(0.25);
      this.instagramHitBox.rotateZ(-0.2);

      this.linkedInHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, 0.1),
        this.hitBoxMaterial
      );
      this.linkedInHitBox.position.set(-3.56, 0.35, 0.65);
      this.linkedInHitBox.rotateY(0.25);
      this.linkedInHitBox.rotateZ(-0.2);

      this.githubHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, 0.1),
        this.hitBoxMaterial
      );
      this.githubHitBox.position.set(-3.4725, 0.34, 0.7575);
      this.githubHitBox.rotateY(0.25);
      this.githubHitBox.rotateZ(-0.2);

      this.emailHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, 0.1),
        this.hitBoxMaterial
      );
      this.emailHitBox.position.set(-3.5, 0.34, 0.635);
      this.emailHitBox.rotateY(0.25);
      this.emailHitBox.rotateZ(-0.2);

      this.phoneHitBoxes.add(
        this.instagramHitBox,
        this.linkedInHitBox,
        this.githubHitBox,
        this.emailHitBox
      );
      this.scene.add(this.phoneHitBoxes);

      //hitboxes for files
      this.fileHitBoxes = new THREE.Group();
      this.folder1HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder1HitBox.position.set(2.7, -0.3175, -0.085);
      this.folder1HitBox.name = 1;

      this.folder2HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder2HitBox.position.set(2.7, -0.3175, -0.227);
      this.folder2HitBox.name = 2;

      this.folder3HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder3HitBox.position.set(2.7, -0.3175, -0.369);
      this.folder3HitBox.name = 3;

      this.folder4HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder4HitBox.position.set(2.7, -0.3175, -0.511);
      this.folder4HitBox.name = 4;

      this.folder5HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder5HitBox.position.set(2.7, -0.3175, -0.653);
      this.folder5HitBox.name = 5;

      this.folder6HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder6HitBox.position.set(2.7, -0.3175, -0.795);
      this.folder6HitBox.name = 6;

      this.folder7HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder7HitBox.position.set(2.7, -0.3175, -0.937);
      this.folder7HitBox.name = 7;

      this.folder8HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder8HitBox.position.set(2.7, -0.3175, -1.079);
      this.folder8HitBox.name = 8;

      this.folder9HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder9HitBox.position.set(2.7, -0.3175, -1.221);
      this.folder9HitBox.name = 9;

      this.folder10HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder10HitBox.position.set(2.7, -0.3175, -1.363);
      this.folder10HitBox.name = 10;

      this.folder11HitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.125, 0.2, 0.142),
        this.hitBoxMaterial
      );
      this.folder11HitBox.position.set(2.7, -0.3175, -1.505);
      this.folder11HitBox.name = 11;

      this.fileHitBoxes.add(
        this.folder1HitBox,
        this.folder2HitBox,
        this.folder3HitBox,
        this.folder4HitBox,
        this.folder5HitBox,
        this.folder6HitBox,
        this.folder7HitBox,
        this.folder8HitBox,
        this.folder9HitBox,
        this.folder10HitBox,
        this.folder11HitBox
      );
      this.scene.add(this.fileHitBoxes);

      this.cabinetFiles = [
        this.folder1HitBox,
        this.folder2HitBox,
        this.folder3HitBox,
        this.folder4HitBox,
        this.folder5HitBox,
        this.folder6HitBox,
        this.folder7HitBox,
        this.folder8HitBox,
        this.folder9HitBox,
        this.folder10HitBox,
        this.folder11HitBox,
      ];

      this.clickableButtons = [
        this.instagramHitBox,
        this.linkedInHitBox,
        this.githubHitBox,
        this.emailHitBox,
      ];

      this.menuClickableObjects = [
        this.cabinetHitBox,
        this.computerHitBox,
        this.phoneHitBox,
      ];

      if (!this.debugger.active) {
        this.menuHitBoxes.visible = false;
        this.phoneHitBoxes.visible = false;
        this.fileHitBoxes.visible = false;
      }

      //checks mouse movement in cabinet
      window.addEventListener("mousemove", (event) => {
        if (
          !this.controls.logic.buttonsLocked &&
          this.controls.logic.mode === "cabinet"
        ) {
          this.cursor.x = (event.clientX / this.sizes.width) * 2 - 1;
          this.cursor.y = -(event.clientY / this.sizes.height) * 2 + 1;

          this.hover(this.cursor);
          this.hoveredPoints = [];
        } else {
          this.hoveredPoints = [];
        }
      });

      window.addEventListener("pointerdown", (event) => {
        this.touchedPoints.push(event.pointerId);

        this.cursorXMin = Math.abs(
          ((event.clientX / this.sizes.width) * 2 - 1) * 0.9
        );
        this.cursorXMax = Math.abs(
          ((event.clientX / this.sizes.width) * 2 - 1) * 1.1
        );

        this.cursorYMin = Math.abs(
          ((event.clientY / this.sizes.height) * 2 - 1) * 0.9
        );
        this.cursorYMax = Math.abs(
          ((event.clientY / this.sizes.height) * 2 - 1) * 1.1
        );
      });

      // Click listener
      window.addEventListener("pointerup", (event) => {
        this.cursor.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.cursor.y = -(event.clientY / this.sizes.height) * 2 + 1;

        this.absX = Math.abs(this.cursor.x);
        this.absY = Math.abs(this.cursor.y);

        if (
          this.touchedPoints.length === 1 &&
          this.absX > this.cursorXMin &&
          this.absX < this.cursorXMax &&
          this.absY > this.cursorYMin &&
          this.absY < this.cursorYMax
        ) {
          this.click(this.cursor);

          this.touchedPoints = [];
        } else {
          this.touchedPoints = [];
        }
      });
    });
  }

  click(cursor) {
    this.raycaster.setFromCamera(cursor, this.camera.instance);

    this.intersectsButtons = this.raycaster.intersectObjects(
      this.clickableButtons,
      false
    );
    if (this.intersectsButtons.length) {
      this.selectedButton = this.intersectsButtons[0].object;

      switch (this.selectedButton) {
        //contact me buttons

        case this.instagramHitBox:
          this.controls.socialControls.instagram();
          break;

        case this.linkedInHitBox:
          this.controls.socialControls.linkedIn();
          break;

        case this.githubHitBox:
          this.controls.socialControls.github();
          break;

        case this.emailHitBox:
          this.controls.socialControls.email();
          break;
      }
    }
    this.intersectsMenuOptions = this.raycaster.intersectObjects(
      this.menuClickableObjects
    );
    if (this.intersectsMenuOptions.length) {
      this.selectedMachine = this.intersectsMenuOptions[0].object;

      switch (this.selectedMachine) {
        case this.cabinetHitBox:
          this.controls.menuControls.cabinetOpen();
          break;

        case this.computerHitBox:
          this.controls.menuControls.computerOpen();
          break;

        case this.phoneHitBox:
          this.controls.menuControls.phoneOpen();
          break;
      }
    }
  }

  hover(cursor) {

    const timeToClose = 333;

    this.hoverRaycaster.setFromCamera(cursor, this.camera.instance);
    this.intersectsFolders = this.hoverRaycaster.intersectObjects(
      this.cabinetFiles,
      false
    );

    if (this.intersectsFolders.length) {
      this.selectedFolder = this.intersectsFolders[0].object;
      switch (this.selectedFolder) {
        case this.folder1HitBox:
          if (this.hoveredFolder !== this.folder1HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder1HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder1HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder2HitBox:
          if (this.hoveredFolder !== this.folder2HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder2HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder2HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder3HitBox:
          if (this.hoveredFolder !== this.folder3HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder3HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder3HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder4HitBox:
          if (this.hoveredFolder !== this.folder4HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder4HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder4HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder5HitBox:
          if (this.hoveredFolder !== this.folder5HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder5HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder5HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder6HitBox:
          if (this.hoveredFolder !== this.folder6HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder6HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder6HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder7HitBox:
          if (this.hoveredFolder !== this.folder7HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder7HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder7HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder8HitBox:
          if (this.hoveredFolder !== this.folder8HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder8HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder8HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder9HitBox:
          if (this.hoveredFolder !== this.folder9HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder9HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder9HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder10HitBox:
          if (this.hoveredFolder !== this.folder10HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder10HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder10HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
        case this.folder11HitBox:
          if (this.hoveredFolder !== this.folder11HitBox) {
            setTimeout(() => {this.controls.selectFiles.closeFolders(this.folder11HitBox.name); }, timeToClose);
            this.hoveredFolder = this.folder11HitBox;
            this.controls.selectFiles.openFolders(this.hoveredFolder.name);
          }
          break;
      }
    } else {
      setTimeout(() => {this.controls.selectFiles.closeFolders(0); }, timeToClose);
      this.hoveredFolder = null;
    }
  }
}
import * as THREE from "three";

import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.preLoader = this.experience.preLoader;

    this.resources.on("ready", () => {
      this.room = this.experience.world.room;
    });


    this.setLogic();
    this.setMenuControls();
    this.setCamControls();
    this.setPhoneControls();
    this.setFolderControls();
    this.update();
    this.resize();

    //returns to menu
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if(this.logic.mode === "cabinet") {
          this.menuControls.cabinetClose();
        } else {
          this.menuControls.toHome()
        }
        
      }
    });
  }

  

  setLogic() {
    this.logic = {};
    this.logic.buttonsLocked = false;
    this.logic.mode = "menu";

    this.logic.lockButtons = async (lockDuration) => {
      this.logic.buttonsLocked = true;
      await this.sleep(lockDuration);
      this.logic.buttonsLocked = false;
    };
  }

  setMenuControls() {
    this.menuControls = {};
    this.menuControls.toHome = async () => {
      if (this.logic.buttonsLocked === false) {
        this.logic.mode = "menu";
        this.camControls.toDefault();
      }
    };
    this.menuControls.cabinetClose = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "cabinet") {
        this.logic.mode = "menu";
        this.camControls.awayCabinet();
        setTimeout(() => {this.selectFiles.closeFolders(0); }, 333);
      }
    };
    this.menuControls.cabinetOpen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.logic.mode = "cabinet";
        this.camControls.toCabinet();
      }
    };
    this.menuControls.computerOpen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.logic.mode = "computer";
        this.camControls.toComputer();
      }
    };
    this.menuControls.phoneOpen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.logic.mode = "phone";
        this.camControls.toPhone();
      }
    };
  }

  setPhoneControls() {
    this.socialControls = {};
    this.socialControls.instagram = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "phone") {
        this.room.animateObject.instagramDial();
        setTimeout(() => {
          window.open("https://instagram.com/tj_murphyy", "_blank");
        }, 500);
      }
    };

    this.socialControls.linkedIn = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "phone") {
        this.room.animateObject.linkedinDial();
        setTimeout(() => {
          window.open(
            "https://www.linkedin.com/in/tj-murphy-5696a9199/",
            "_blank"
          );
        }, 500);
      }
    };

    this.socialControls.github = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "phone") {
        this.room.animateObject.githubDial();
        setTimeout(() => {
          window.open("https://github.com/tjmurphyy", "_blank");
        }, 500);
        //console.log("animated github!")
      }
    };

    this.socialControls.email = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "phone") {
        this.room.animateObject.mailDial();
        setTimeout(() => {
          window.location.href = "mailto:murphytj0326@gmail.com";
        }, 500);
      }
    };
  }

  setFolderControls() {
    this.selectFiles = {};

    this.selectFiles.openFolders = async (hoveredFolder) => {
      this.room.animateObject.openFolder(hoveredFolder);
      await this.sleep(50);
    };

    this.selectFiles.closeFolders = async (hoveredFolder) => {
      for (let i = 1; i < 12; i++) {
        if (i != hoveredFolder) { this.room.animateObject.closeFolder(i); }
      }
      await this.sleep(50);
    };
  }

  setCamControls() {
    this.camControls = {};

    this.camControls.toDefault = async () => {
      this.logic.lockButtons(1500);
      this.camera.camAngle.unlocked();
      this.camera.transitions.default(1.5);
      await this.sleep(1500);
      this.camera.camAngle.default();
    };
    this.camControls.awayCabinet = async () => {
      this.logic.lockButtons(1500);
      this.camera.camAngle.unlocked();
      this.camera.transitions.default(1.5);
      this.room.animateObject.closeCabinet();
      await this.sleep(1500);
      this.camera.camAngle.default();
    };
    this.camControls.toCabinet = async () => {
      this.logic.lockButtons(1500);
      this.camera.camAngle.unlocked();
      this.camera.transitions.cabinet(1.5);
      this.room.animateObject.openCabinet();
      await this.sleep(1500);
      this.camera.camAngle.cabinet();
    };
    this.camControls.toComputer = async () => {
      this.logic.lockButtons(1500);
      this.camera.camAngle.unlocked();
      this.camera.transitions.computer(1.5);
      await this.sleep(1500);
      this.camera.camAngle.computer();
    };
    this.camControls.toPhone = async () => {
      this.logic.lockButtons(1500);
      this.camera.camAngle.unlocked();
      this.camera.transitions.phone(1.5);
      await this.sleep(1500);
      this.camera.camAngle.phone();
    };
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  update() {}

  resize() {}
}

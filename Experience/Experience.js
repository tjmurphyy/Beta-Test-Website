import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/time";
import assets from "./Utils/assets";
import Resources from "./Utils/Resources";
import Debugger from "./Utils/Debugger";

import Camera from "./Camera";
import Renderer from "./Renderer";
import RayCaster from "./RayCaster";
import PreLoader from "./PreLoader";

import World from "./World/World";
import Controls from "./World/Controls";


export default class Experience{
    static instance
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this;

        this.canvas = canvas;

        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.debugger = new Debugger();

        this.config = {};
        this.config.touch = false;
        this.config.vertical = false;
        window.addEventListener('touchstart', () => { this.config.touch = true }, { once: true })
        
        if(this.sizes.width / this.sizes.height > 1) {
            this.config.vertical = false
        } else {
            this.config.vertical = true
        }

        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.preLoader = new PreLoader()
        this.world = new World();
        this.controls = new Controls();
        this.rayCaster = new RayCaster();

        

        this.time.on("update", ()=>{
            this.update(); 
        });
        this.sizes.on("resize", ()=>{
            this.resize(); 
        });
        
    }


    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
}
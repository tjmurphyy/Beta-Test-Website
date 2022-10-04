
import * as THREE from "three";

import EventEmitter from "events";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader"
import Experience from "../Experience"
import { TextureLoader } from "three";

export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer

        this.assets = assets;
        
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.textureLoader = new TextureLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/")
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading() {
        for(const asset of this.assets){
            if(asset.type === "glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset, file);
                    console.log('loaded gltf');
                });

            } else if (asset.type === "videoTexture"){
                this.video = {};
                this.videoTexture = {};
            
                //video processing and adding through js instead of html
                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInLine = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
                this.videoTexture[asset.name].flipY = false;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;
            
                //loading video
                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
                console.log('loaded video');

            } else if (asset.type === "imageTexture"){
                this.loaders.textureLoader.load(asset.path, (file)=>{
                    file.flipY = false;
                    file.encoding = THREE.sRGBEncoding;
                    console.log('loaded image');
                    this.singleAssetLoaded(asset, file);
                })
            }
        }
    }
    

    singleAssetLoaded(asset, file){
        this.emit('itemLoaded');
        
        this.items[asset.name] = file;
        this.loaded++;
        
        if(this.loaded === this.queue){
            this.emit("ready");
        }
    }
}
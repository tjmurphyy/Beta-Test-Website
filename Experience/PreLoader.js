import * as THREE from 'three'
import Experience from './Experience'
import EventEmitter from 'events'

export default class PreLoader extends EventEmitter{
    constructor()
    {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.overlay = document.querySelector('.overlay')//. for call in HTML
        this.loading = document.querySelector('#loading') //# for id in HTML
        this.startButton = document.querySelector('.start') //. for class in HTML
    
        //progress
        this.resources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.resources.loaded + 1)/ this.resources.queue;

            document.getElementById("progressPercentage").innerHTML = Math.trunc(this.progressRatio * 100)
        });

        //Loaded
        this.resources.on('ready', () =>
        {

            window.setTimeout(() =>
            {
                this.loading.classList.add('fade');
            }, 1500);

            window.setTimeout(() =>
            {
                this.readyScreen();
            }, 2500);
        });
    }
    
    readyScreen()
    {
        this.loading.remove()
        this.startButton.style.display = "inline"
        this.startButton.classList.add('fadeIn')
        this.startButton.addEventListener("click", async () => {
            // Remove overlay and button
            this.overlay.classList.add('fade')
            this.startButton.classList.add('fadeOut')

            window.setTimeout(() =>
            {
                this.startButton.remove()
                this.overlay.remove()
            }, 2000)

            // Trigger start events
            this.controls = this.experience.controls
            //this.performance = this.experience.performance

            // Move Camera
            this.controls.camControls.toDefault()

            // Required for instagram brower compatibility
            this.sizes.resize()
            
            // Wait before performance Check
            await this.sleep(500)
            //this.performance.performanceCheck()  

            // Emit Event
            this.emit('start')

            await this.sleep(500)

        },{ once: true });
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
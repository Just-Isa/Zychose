import * as THREE from "three";
import type { Scene } from "three";
import { timestamp } from '@vueuse/core';



export class Car {
    direction = new THREE.Vector3();
    destination = new THREE.Vector3();
    keysPressed = new Map<string, boolean>();
    speed: number;
    maxspeed: number
    car: THREE.Group;
    renderer: THREE.Renderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    

    constructor(car: THREE.Group, scene: Scene, renderer: THREE.Renderer, camera: THREE.Camera) {

        this.speed = 0;
        this.car = car;
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.maxspeed = 2;
    

        
    
    }

    handleWithKeys() {

        document.addEventListener('keydown', (event) => {
            
            
            this.car.getWorldDirection(this.direction)
            this.keysPressed.set(event.key, true);
            console.log("keyPressed:", this.keysPressed)
            

        });

        document.addEventListener('keyup', (event) => {
            this.keysPressed.set(event.key, false);

        });

        const animate = () => {
            console.log("speed", this.speed)
            this.executeMovement1()
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(animate);
        
    
        };
        animate()
        
        
    }

    
    executeMovement1() {
        if(!this.keysPressed.get("ArrowUp") && !this.keysPressed.get("ArrowDown") && this.speed != 0){
            if(this.speed > 0){
                if((Math.round((this.speed + -0.15)*100)/100)<0){
                    this.speed = 0;
                }else{
                    this.speed = Math.round((this.speed - 0.15)*100)/100;
                }
            }else{
                if((Math.round((this.speed + 0.15)*100)/100)>0){
                    this.speed = 0;
                }else{
                    this.speed = Math.round((this.speed + 0.15)*100)/100;
                }
            }
        }

        if (this.keysPressed.get("ArrowUp")) {
            
            if((Math.round((this.speed + +0.1)*100)/100) >= this.maxspeed){
                this.speed = this.maxspeed;
            }else{
                this.speed = Math.round((this.speed + 0.1)*100)/100
            }
            
        }
        if(this.speed != 0){
            if (this.keysPressed.get("ArrowLeft")) {
                this.car.rotation.y += 0.15 //+ 0.1/Math.round(Math.abs(this.speed))

            }
            if (this.keysPressed.get("ArrowRight")) {
                this.car.rotation.y -= 0.15 //+ 0.1/Math.round(Math.abs(this.speed))

            }
        }
        if (this.keysPressed.get("ArrowDown")) {
            if((Math.round((this.speed + -0.1)*100)/100) <= -this.maxspeed){
                this.speed = -this.maxspeed;
            }else{
                this.speed = Math.round((this.speed - 0.1)*100)/100
            }
            // this.car.getWorldDirection(this.direction)
            // this.destination.add(this.direction.multiplyScalar(-1.7))
            // //car.position.add(direction.multiplyScalar(1))
            
            // this.car.position.lerpVectors(this.car.position,this.destination,0.5)
        }
        this.car.getWorldDirection(this.direction)
        this.destination.add(this.direction.multiplyScalar(this.speed))
        //car.position.add(direction.multiplyScalar(1))
        this.car.position.lerpVectors(this.car.position,this.destination,0.5)
    }

}
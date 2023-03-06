import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const renderer = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth,window.innerHeight)  

document.body.appendChild(renderer.domElement)


const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(
    45,                                        
    window.innerWidth / window.innerHeight,   
    0.1,                                       
    1000                                      
)


const orbit = new OrbitControls(camera,renderer.domElement)
orbit.update()


const axesHelper = new THREE.AxesHelper(3)  
scene.add(axesHelper)  


camera.position.set(-10,30,30)


const boxGeometry = new THREE.BoxGeometry(6,6,6,6)
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
const box = new THREE.Mesh(boxGeometry,boxMaterial)
scene.add(box)
box.position.set(10,10,0)


const planeGeometry = new THREE.PlaneGeometry(30,30)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI


// const gridHelper = new THREE.GridHelper(30,100)  
const gridHelper = new THREE.GridHelper(30)  
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4,25,25)
const sphereMaterial = new THREE.MeshBasicMaterial({
    color:"blue",
    wireframe: true
})

const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
scene.add(sphere)

sphere.position.set(-10,10,0)




const gui =  new dat.GUI()

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed:0.01
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
})

gui.add(options,'wireframe').onChange(function(e){
    sphere.material.wireframe = e
})

gui.add(options,'speed',0,0.1)


const Boptions = {
    boxColor: '#ffea00',
    wireframe: false,
    speed:0.01
}

gui.addColor(Boptions,'boxColor').onChange(function(e){
    box.material.color.set(e)
})

gui.add(Boptions,'wireframe').onChange(function(e){
    box.material.wireframe = e
})

gui.add(Boptions,'speed',0,0.1)



let step = 0
let Bstep = 0

function animate(time){
    box.rotation.x = time/1000
    box.rotation.y = time/1000

    step += options.speed
    Bstep += Boptions.speed
    box.position.y = 10 * Math.abs(Math.sin(Bstep))
    sphere.position.y = 10 * Math.abs(Math.sin(step))

    sphere.rotation.x = time/1000
    sphere.rotation.y = time/1000
    renderer.render(scene,camera)
}


renderer.setAnimationLoop(animate)

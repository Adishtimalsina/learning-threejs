
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();

//initialize the loader
const textureLoader = new THREE.TextureLoader();

//change scence background color
 scene.background = new THREE.Color('white');

const cube = new THREE.BoxGeometry(1,1,1);
const sphere = new THREE.SphereGeometry(.7,50,50)
const cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)

//create costume shapes (buffer geometry)
// const vertices = new Float32Array([0,0,0,0,2,0,2,0,0]);

// const bufferAttribute = new THREE.BufferAttribute(vertices,3);

// const geometry = new THREE.BufferGeometry()

// geometry.setAttribute('position', bufferAttribute);

// const matrial = new THREE.MeshPhongMaterial({
//   transparent:true,
//   shininess:90
// })

const url = "wispy-grass-meadow_albedo.png"

//initialize the texture
const textureTest = textureLoader.load(url)
textureTest.colorSpace = THREE.SRGBColorSpace;
console.log(textureTest)
//standart material
const material = new THREE.MeshBasicMaterial({
  map:textureTest
});

//material.map = textureTest;

const cylinderMesh = new THREE.Mesh(cylinder, material);
const sphereMesh = new THREE.Mesh(sphere, material);
const cubeMesh = new THREE.Mesh(cube, material)
const cubeMesh1 = new THREE.Mesh(cube, material)
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,16)
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material)
torusKnotMesh.position.x = -2
cubeMesh1.position.x=2
sphereMesh.position.y = 2
cylinderMesh.position.y = -2
// cubeMesh.scale.set(2,2,2)

// cubeMesh.position.y =1;

//rotation of the wmesh
// cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

// //create a parent group, which holds multiple meshes
// const cubeMesh1 = new THREE.Mesh(cube, matrial)
// const cubeMesh2 = new THREE.Mesh(cube, matrial)

// cubeMesh1.position.x = 2;
// cubeMesh2.position.x= -2;

// //create a group
 const group = new THREE.Group();
// group.add(cubeMesh, cubeMesh1, cubeMesh2)

// //scale the parent, which will scale all the children meshes
// group.scale.y = 2;

//create a fong
// const fog = new THREE.Fog('white', 1, 10);
// scene.fog = fog;


const light = new THREE.AmbientLight(0xffffff, 1)

const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(5,5,5);


scene.add(cubeMesh, cubeMesh1, torusKnotMesh, sphereMesh, cylinderMesh, light, pointLight);




//adding axises in the screen
//const axisesHelper = new THREE.AxesHelper(3);

//adding axises helper to the mesh
// cubeMesh.add(axisesHelper)

//adding axises helper to the scene
//scene.add(axisesHelper);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//position the camera
camera.position.z = 5;

const canvas = document.querySelector('canvas.threejs');

const renderer = new THREE.WebGLRenderer({
  canvas:canvas,
  antialias:true
})

renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

//inistatiate the orbit controll
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
// control.autoRotate=true;


window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)

})

//get the clock
const clock = new THREE.Clock();
let  previousTime = 0;


const renderLoop =()=>{

  //animation
  //get the crrent time
  const currentTime = clock.getElapsedTime();

  //time difference
  const delta = currentTime - previousTime;

  //assign previous time, the last time (time update)
  previousTime = currentTime;

 // cubeMesh.scale.x = (Math.sin(currentTime))+1;
  // group.position.y = (Math.sin(currentTime))+1

    //get each object of the scence (childeren)
    scene.children.forEach((child)=>{
      if(child instanceof THREE.Mesh){
        child.rotation.x +=0.01;
      }
    })
  
    

  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop)
}

console.log(window.devicePixelRatio);

renderLoop()


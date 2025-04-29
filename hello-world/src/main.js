
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();

const cube = new THREE.BoxGeometry(1,1,1);

const matrial = new THREE.MeshBasicMaterial({color:"red", wireframe:true})

const cubeMesh = new THREE.Mesh(cube, matrial)

cubeMesh.position.y =1;

//

// //create a parent group, which holds multiple meshes
// const cubeMesh1 = new THREE.Mesh(cube, matrial)
// const cubeMesh2 = new THREE.Mesh(cube, matrial)

// cubeMesh1.position.x = 2;
// cubeMesh2.position.x= -2;

// //create a group
// const group = new THREE.Group();
// group.add(cubeMesh, cubeMesh1, cubeMesh2)

// //scale the parent, which will scale all the children meshes
// group.scale.y = 2;

scene.add(cubeMesh);



//adding axises in the screen
const axisesHelper = new THREE.AxesHelper(3);

//adding axises helper to the mesh
cubeMesh.add(axisesHelper)

//adding axises helper to the scene
//scene.add(axisesHelper);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const light = new THREE.AmbientLight({color:'white'})

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
control.autoRotate = true;


window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)

})

const renderLoop =()=>{
  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop)
}

console.log(window.devicePixelRatio);

renderLoop()


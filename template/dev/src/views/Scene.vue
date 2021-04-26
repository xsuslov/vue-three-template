<template>
  <div class="page-scene" ref="scene">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three/build/three.module';
import Collision from '@/scene/collision';
import EventHandlers from '@/scene/eventHandlers';
import Physics from '@/scene/physics';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

const physics = new Physics();

let scene;
let camera;
let renderer;
let clock;

let box;
let ball;

let keyEvents;

// orbit control move object
const objects = [];

const mouse = new THREE.Vector2();

export default {
  methods: {
    startScene() {
      window.Ammo().then(this.start);
    },
    start() {
      physics.setupPhysicsWorld();
      this.setupGraphics();
      this.createBlock();
      this.createBall();
      this.createBox();
      // scene borders
      this.createBorders(-82, 6, 10, 5.4, 10, 90);
      this.createBorders(82, 6, 10, 5.4, 10, 90);
      this.createBorders(0, 6, -35, 164, 10, 5.4);
      this.createBorders(0, 6, 55, 164, 10, 5.4);
      // key events
      keyEvents = new EventHandlers('key');
      keyEvents.init();
      this.renderFrame();

      // move camera
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.target.y = 0.5;
      // controls.update();

      // move objects
      const controlsDrag = new DragControls([...objects], camera, renderer.domElement);
      controlsDrag.addEventListener('drag', this.dragObjects);
    },
    setupGraphics() {
      clock = new THREE.Clock();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
      /* camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2,
      window.innerHeight / 2, window.innerHeight / -2, -5000, 10000000) */
      camera.position.set(10, 180, 140);
      camera.updateProjectionMatrix();
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // lights
      scene.add(new THREE.AmbientLight(0x666666));
      const light = new THREE.DirectionalLight(0xdfebff, 1);
      light.position.set(50, 200, 100);
      light.position.multiplyScalar(1.3);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;

      const d = 300;
      light.shadow.camera.left = -d;
      light.shadow.camera.right = d;
      light.shadow.camera.top = d;
      light.shadow.camera.bottom = -d;
      light.shadow.camera.far = 1000;
      scene.add(light);

      // Setup the renderer
      const { canvas } = this.$refs;
      renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
      renderer.setClearColor(0xbfd1e5);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.scene.appendChild(renderer.domElement);
    },
    renderFrame() {
      const deltaTime = clock.getDelta();
      renderer.render(scene, camera);
      requestAnimationFrame(this.renderFrame);
      physics.updatePhysics(deltaTime);
      this.moveBall();
    },
    createBlock() {
      const position = {
        x: 0, y: 0, z: 10,
      };
      const scale = {
        x: 165, y: 2, z: 90,
      };
      const quaternion = {
        x: 0, y: 0, z: 0, w: 1,
      };
      const mass = 0;
      const blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(),
        new THREE.MeshPhongMaterial({ color: 0xFFFF00 }));

      blockPlane.position.set(position.x, position.y, position.z);
      blockPlane.scale.set(scale.x, scale.y, scale.z);

      scene.add(blockPlane);
      // objects.push(blockPlane);
      physics.addRigidBody(blockPlane, mass, position, scale, quaternion, 4, 10);
    },
    createBorders(posX, posY, posZ, scaleX, scaleY, scaleZ) {
      const quaternion = {
        x: 0, y: 0, z: 0, w: 1,
      };
      const mass = 0;
      const kObject = new THREE.Mesh(new THREE.BoxBufferGeometry(),
        new THREE.MeshPhongMaterial({ color: 0xFF0000 }));

      kObject.position.set(posX, posY, posZ);
      kObject.scale.set(scaleX, scaleY, scaleZ);

      scene.add(kObject);
      physics.addRigidBody(
        kObject,
        mass,
        { x: posX, y: posY, z: posZ },
        { x: scaleX, y: scaleY, z: scaleZ },
        quaternion,
        4,
        10,
      );
    },
    createBall() {
      const position = {
        x: -22, y: 4, z: 2,
      };
      const scale = {
        x: 1, y: 1, z: 1,
      };
      const radius = 3;
      const quaternion = {
        x: 0, y: 0, z: 0, w: 1,
      };
      const mass = 1;
      ball = new THREE.Mesh(new THREE.SphereGeometry(radius, 50, 50),
        new THREE.MeshBasicMaterial({ color: 0x0000FF }));
      ball.position.set(position.x, position.y, position.z);
      scene.add(ball);
      physics.addMoveBody(ball, mass, position, scale, quaternion, 4, 10);
    },
    createBox() {
      const position = {
        x: 25, y: 5, z: -17,
      };
      const scale = {
        x: 10, y: 10, z: 10,
      };
      const quaternion = {
        x: 0, y: 0, z: 0, w: 1,
      };
      const mass = 0;
      const collisionBox = new THREE.BoxBufferGeometry(scale.x, scale.y, scale.z);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      box = new THREE.Mesh(collisionBox, material);
      box.position.set(position.x, position.y, position.z);
      scene.add(box);
      // physics.addRigidBody(
      //   box, mass, position, scale, quaternion, 4, 10,
      // );
    },
    moveBall() {
      let moveX;
      let moveZ;
      let moveY;
      if (keyEvents) {
        moveX = keyEvents.direction.right - keyEvents.direction.left;
        moveZ = keyEvents.direction.back - keyEvents.direction.forward;
        moveY = 0;
      }
      if (moveX === 0 && moveY === 0 && moveZ === 0) return;
      physics.moveBody(25, moveX, moveY, moveZ);
      const collisionBall = new Collision(ball, box);
      collisionBall.getCollision(() => {
        console.log('collision detect');
      });
    },
    dragObjects(e) {
      console.log(e.object.position);
      this.renderFrame();
    },
  },
  mounted() {
    this.startScene();
  },
};
</script>

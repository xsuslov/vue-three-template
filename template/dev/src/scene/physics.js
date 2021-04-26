export default class Physics {
  constructor() {
    this.physicsWorld = null;
    this.rigidBodies = [];
    this.object = null;
    this.transform = null;
  }

  setupPhysicsWorld() {
    this.transform = new window.Ammo.btTransform();
    const collisionConfiguration = new window.Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new window.Ammo.btCollisionDispatcher(collisionConfiguration);
    const overlappingPairCache = new window.Ammo.btDbvtBroadphase();
    const solver = new window.Ammo.btSequentialImpulseConstraintSolver();

    this.physicsWorld = new window.Ammo.btDiscreteDynamicsWorld(dispatcher,
      overlappingPairCache, solver, collisionConfiguration);
  }

  updatePhysics(deltaTime) {
    // Step world
    this.physicsWorld.stepSimulation(deltaTime, 10);

    // Update rigid bodies
    for (let i = 0; i < this.rigidBodies.length; i++) {
      const objThree = this.rigidBodies[i];
      const objAmmo = objThree.userData.physicsBody;
      const ms = objAmmo.getMotionState();
      if (ms) {
        ms.getWorldTransform(this.transform);
        const p = this.transform.getOrigin();
        const q = this.transform.getRotation();
        objThree.position.set(p.x(), p.y(), p.z());
        objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
  }

  addRigidBody(object, mass, position, scale, quaternion) {
    this.transform.setIdentity();
    this.transform.setOrigin(new window.Ammo.btVector3(
      position.x, position.y, position.z,
    ));
    this.transform.setRotation(new window.Ammo.btQuaternion(
      quaternion.x, quaternion.y, quaternion.z, quaternion.w,
    ));
    const motionState = new window.Ammo.btDefaultMotionState(this.transform);
    const colShape = new window.Ammo.btBoxShape(new window.Ammo.btVector3(
      scale.x * 0.5, scale.y * 0.5, scale.z * 0.5,
    ));
    colShape.setMargin(0.05);
    const localInertia = new window.Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(mass, localInertia);
    const rbInfo = new window.Ammo.btRigidBodyConstructionInfo(
      mass, motionState, colShape, localInertia,
    );
    const body = new window.Ammo.btRigidBody(rbInfo);

    this.physicsWorld.addRigidBody(body);
  }

  addMoveBody(object, mass, position, scale, quaternion, friction, rollingFriction) {
    this.transform.setIdentity();
    this.transform.setOrigin(new window.Ammo.btVector3(
      position.x, position.y, position.z,
    ));
    this.transform.setRotation(new window.Ammo.btQuaternion(
      quaternion.x, quaternion.y, quaternion.z, quaternion.w,
    ));
    const motionState = new window.Ammo.btDefaultMotionState(this.transform);

    const colShape = new window.Ammo.btSphereShape(3);
    colShape.setMargin(0.05);

    const localInertia = new window.Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new window.Ammo.btRigidBodyConstructionInfo(
      mass, motionState, colShape, localInertia,
    );
    const body = new window.Ammo.btRigidBody(rbInfo);

    body.setFriction(friction);
    body.setRollingFriction(rollingFriction);

    this.physicsWorld.addRigidBody(body);
    this.object = object;
    this.object.userData.physicsBody = body;
    this.rigidBodies.push(this.object);
  }

  moveBody(scalingFactor, moveX, moveY, moveZ) {
    const resultantImpulse = new window.Ammo.btVector3(moveX, moveY, moveZ);
    resultantImpulse.op_mul(scalingFactor);
    this.object.userData.physicsBody.setLinearVelocity(resultantImpulse);
  }
}

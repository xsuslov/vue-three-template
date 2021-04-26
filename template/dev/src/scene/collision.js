import * as THREE from 'three/build/three.module';

export default class Collision {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getCollision(callback) {
    const d = [this.b];
    const e = this.a.position.clone();
    const f = this.a.geometry.vertices.length;
    const g = this.a.position;
    const h = this.a.matrix;
    const i = this.a.geometry.vertices;
    for (let vertexIndex = f - 1; vertexIndex >= 0; vertexIndex--) {
      const localVertex = i[vertexIndex].clone();
      const globalVertex = localVertex.applyMatrix4(h);
      const directionVector = globalVertex.sub(g);
      const ray = new THREE.Raycaster(e, directionVector.clone().normalize());
      const collisionResults = ray.intersectObjects(d);
      if (collisionResults.length > 0
        && collisionResults[0].distance < directionVector.length()) {
        return callback();
      }
    }
    return false;
  }
}

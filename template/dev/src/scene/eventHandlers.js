export default class EventHandlers {
  constructor(event) {
    this.event = event;
    this.direction = {
      left: 0,
      right: 0,
      forward: 0,
      back: 0,
    };
  }

  init() {
    if (this.event === 'key') {
      window.addEventListener('keydown', this.keydown.bind(this), false);
      window.addEventListener('keyup', this.keyup.bind(this), false);
    }
  }

  keydown(event) {
    const { keyCode } = event;
    switch (keyCode) {
      case 38:
        this.direction.forward = 1;
        break;
      case 40:
        this.direction.back = 1;
        break;
      case 37:
        this.direction.left = 1;
        break;
      case 39:
        this.direction.right = 1;
        break;
      case 87:
        this.direction.forward = 1;
        break;
      case 83:
        this.direction.back = 1;
        break;
      case 65:
        this.direction.left = 1;
        break;
      case 68:
        this.direction.right = 1;
        break;
      default:
        this.direction.forward = 1;
        break;
    }
  }

  keyup(event) {
    const { keyCode } = event;
    switch (keyCode) {
      case 38:
        this.direction.forward = 0;
        break;
      case 40:
        this.direction.back = 0;
        break;
      case 37:
        this.direction.left = 0;
        break;
      case 39:
        this.direction.right = 0;
        break;
      case 87:
        this.direction.forward = 0;
        break;
      case 83:
        this.direction.back = 0;
        break;
      case 65:
        this.direction.left = 0;
        break;
      case 68:
        this.direction.right = 0;
        break;
      default:
        this.direction.forward = 0;
        break;
    }
  }
}

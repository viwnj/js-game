import Entity from '../Entity';

import Rect from '../Components/Rect';

class PlayerEntity extends Entity {
  constructor() {
    super();
    this.AddComponent('Rect', new Rect(0, 0, 42, 42, 0x00ff00));
  }
}

export default PlayerEntity;

import * as PIXI from 'pixi.js';
import Component from '../Component';

export default class Tile extends Component {
  graphics: any;

  constructor(tilePositionX: number, tilePositionY: number, tileSize: number) {
    super();
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0xdeadbeef);
    this.graphics.drawRect(tilePositionX, tilePositionY, tileSize, tileSize);
    this.graphics.endFill();
  }

  Render(stage: any): void {
    stage.addChild(this.graphics);
  }

  Update(): void {}
}

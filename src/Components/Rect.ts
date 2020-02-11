import * as PIXI from 'pixi.js';
import Component from '../Component';

class Rect extends Component {
  graphics: any;

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    color: number
  ) {
    super();
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(color);
    this.graphics.drawRect(positionX, positionY, width, height);
    this.graphics.endFill();
  }

  Render(stage: any): void {
    stage.addChild(this.graphics);
  }

  Update(ticker: any) {}
}

export default Rect;

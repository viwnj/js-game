import Component from '../Component';
const Vec2 = require('vec2');

interface IVec2 {
  x: number;
  y: number;
  change(
    fn: (vec: { x: number; y: number }, prev: { x: number; y: number }) => void
  ): {
    x: number;
    y: number;
  };

  ignore(fn: Function): { x: number; y: number };
  set(x: number, y: number, notify?: boolean): { x: number; y: number };
  zero(): { x: number; y: number };
  clone(): { x: number; y: number };
  add(x: number, y: number, returnNew?: boolean): { x: number; y: number };
}

class Transform extends Component {
  position: IVec2;
  velocity: IVec2;
  scale: number;

  constructor(position: IVec2, velocity: IVec2, scale: number) {
    super();
    this.position = position;
    this.velocity = velocity;
    this.scale = scale;
  }

  Render(stage: any) {}

  Update(ticker: any) {}
}

export default Transform;

import Component from '../../Component';
import * as PIXI from 'pixi.js';
import Layer from 'src/Layer';

class Button extends Component {
  rect: any;
  container: any;
  text: any;
  label: string = '';
  backgroundColor: number;
  color: number;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  onClick: (layerContext: Layer) => void;

  constructor(
    label: string,
    backgroundColor: number,
    color: number,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    onClick: (layerContext: Layer) => void
  ) {
    super();
    this.label = label;
    this.backgroundColor = backgroundColor;
    this.color = color;
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.onClick = onClick;
    this.container = new PIXI.Container();
    this.Initialize();
  }

  Initialize(): void {
    this.container.interactive = true;
    this.container.buttonMode = true;
    this.container.y = this.positionY;
    this.container.x = this.positionX;
    this.container.width = this.width;
    this.container.height = this.height;

    // Draw rect
    this.rect = new PIXI.Graphics();
    this.rect.beginFill(this.backgroundColor);
    this.rect.drawRect(this.positionX, this.positionY, this.width, this.height);
    this.rect.endFill();

    // Draw text

    const textStyle = new PIXI.TextStyle({
      fill: this.color,
      fontSize: 20,
    });
    this.text = new PIXI.Text(this.label, textStyle);
    this.text.x = this.positionX + 5;
    this.text.y = this.positionY + this.text.height / 2;

    this.rect.addChild(this.text);

    this.container.addChild(this.rect);

    this.container.on('click', this.handleClick);
  }

  handleClick = () => {
    const layerContext: Layer = this.owner.ownerLayer;
    this.onClick(layerContext);
  };

  Render(stage: any) {
    stage.addChild(this.container);
  }

  Clear(stage: any) {
    stage.removeChild(this.container);
  }

  Update(ticker: any) {}
}

export default Button;

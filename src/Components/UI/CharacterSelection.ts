import EE from '../../EventEmitter';
import Component from '../../Component';
import * as PIXI from 'pixi.js';

export default class CharacterSelection extends Component {
  characterCount: number = 3;
  rectancleArray: Array<any> = [];
  rectSize: number = 200;
  circleSize: number = 16;
  rectangleBasePadding: number = 15;
  rectangleBorderRadius: number = 16;

  constructor(characterCount: number = 2) {
    super();
    this.Initialize();
  }

  Render(stage: any) {
    this.rectancleArray.forEach(rect => stage.addChild(rect));
  }

  Update(ticker: any) {}

  Initialize(): void {
    for (let i = 0; i < this.characterCount; i++) {
      const rect = new PIXI.Graphics();
      rect.lineStyle(2, 0xff00ff, 1);
      rect.beginFill(0x650a5a, 0.25);
      rect.drawRoundedRect(
        i * (this.rectSize + this.rectangleBasePadding),
        0,
        this.rectSize,
        this.rectSize,
        this.rectangleBorderRadius
      );
      rect.endFill();

      const textStyle = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 16,
      });

      const text = new PIXI.Text(`Character-${i}`, textStyle);
      text.x = i * 215 + this.rectangleBasePadding;
      text.y = 10;

      const circle = new PIXI.Graphics();
      circle.interactive = true;
      circle.buttonMode = true;
      circle.on('click', this.handleCharacterCreation);

      circle.x =
        i * (this.rectSize + this.rectangleBasePadding) +
        this.rectSize -
        this.circleSize * 1.5;
      circle.y = this.rectSize - this.circleSize * 2;
      circle.lineStyle(2, 0xff00ff, 1);
      circle.beginFill(0xff00ff);
      circle.drawCircle(0, 0, this.circleSize);

      const circleIconStyle = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 25,
      });

      rect.addChild(text);
      rect.addChild(circle);

      const circleIcon = new PIXI.Text(`+`, circleIconStyle);
      circleIcon.x = 0 - circleIcon.width / 2;
      circleIcon.y = 0 - circleIcon.height / 2;
      circle.addChild(circleIcon);

      this.rectancleArray.push(rect);
    }
  }

  handleCharacterCreation() {
    EE.emmit('GameStateChanged', 'CHARACTER_CREATION');
  }

  Destroy() {}
}

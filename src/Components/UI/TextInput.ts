import * as PIXI from 'pixi.js';
import Entity from '../../Entity';
import Component from '../../Component';
import FocusManager from '../../FocusManager';
import KeyboardInput from '../KeyboardInput';

interface Blacklist {
  [key: string]: boolean;
}

export interface ITextInput {
  id: string;
  container: any;
  rect: any;
  caret: any;
  text: any;
  rectPaddingY: number;
  rectPaddingX: number;
  caretBlinkingTime: number; //ms
  placeholder: string;
  isTyping: boolean;

  positionX: number;
  positionY: number;
  keyboardComponent: KeyboardInput;
  value: string;
  blacklist: Blacklist;
  onKeyup(e: any): void;
  onKeydown(e: any): void;
  onBlur(): void;
}

export interface ConstructableTextInput {
  new (): ITextInput;
}

class TextInput extends Component implements ITextInput {
  id: string;
  container: any;
  rect: any;
  caret: any;
  text: any;
  rectPaddingY: number = 5;
  rectPaddingX: number = 5;
  caretBlinkingTime: number = 500; //ms
  placeholder: string;
  isTyping: boolean;

  positionX: number;
  positionY: number;
  keyboardComponent: KeyboardInput;

  value: string = '';
  blacklist: Blacklist = {
    //: true,
    F1: true,
    F2: true,
    F3: true,
    F4: true,
    F5: true,
    F6: true,
    F7: true,
    F8: true,
    F9: true,
    F10: true,
    F11: true,
    F12: true,
    PrintScreen: true,
    Home: true,
    Delete: true,
    PageUp: true,
    PageDown: true,
    End: true,
    NumLock: true,
    Enter: true,
    Alt: true,
    Control: true,
    AltGraph: true,
    Meta: true,
    Shift: true,
    CapsLock: true,
    Insert: true,
    Pause: true,
    ContextMenu: true,
    ArrowUp: true,
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: true,
    Tab: true,
  };

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    backgroundColor: number,
    color: number,
    placeholder: string = 'Type something...'
  ) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.placeholder = placeholder;

    this.container = new PIXI.Container();
    this.container.y = positionY;
    this.container.x = positionX;
    this.container.width = width;
    this.container.height = height;

    this.container.interactive = true;

    // Draw rect
    this.rect = new PIXI.Graphics();
    this.rect.beginFill(backgroundColor);
    this.rect.drawRect(positionX, positionY, width, height);
    this.rect.endFill();

    // Draw caret
    this.caret = new PIXI.Graphics();
    this.caret.lineStyle(2, 0xffffff, 1);
    this.caret.moveTo(
      positionX + this.rectPaddingX,
      positionY + this.rectPaddingY
    );

    this.caret.lineTo(
      positionX + this.rectPaddingX,
      positionY + height - this.rectPaddingY
    );

    const textStyle = new PIXI.TextStyle({
      fill: color,
      fontSize: 14,
    });
    this.text = new PIXI.Text(placeholder, textStyle);
    this.text.x = positionX + this.rectPaddingX;
    this.text.y = positionY + this.text.height;

    this.rect.addChild(this.text);
    this.rect.addChild(this.caret);

    this.container.addChild(this.rect);

    this.container.on('click', () => {
      FocusManager.focus(this.owner, this);

      this.keyboardComponent = this.owner.GetComponent('KeyboardInput');

      // Hide placeholder
      if (!this.value.length) {
        this.text.text = '';
      }
      this.keyboardComponent.addListeners(this.onKeydown, this.onKeyup);
    });
  }

  onKeyup = (e: any): void => {
    this.isTyping = false;
  };

  onKeydown = (e: any): void => {
    if (FocusManager.focusedEntityName === this.owner.name) {
      const key: string = e.key;
      if (this.blacklist[key]) return;
      this.isTyping = true;

      if (e.key === 'Backspace') {
        this.setValue(this.value.slice(0, -1));
        return;
      }

      this.setValue(this.value + e.key);
    }
  };

  onBlur(): void {
    // Show placeholder if the user hasn't typed anything
    if (!this.value.length) {
      this.text.text = this.placeholder;
    }

    this.keyboardComponent.removeListeners();
  }

  Render(stage: any): void {
    stage.addChild(this.container);
  }

  setValue(newValue: string): void {
    this.value = newValue;
    this.text.text = this.value;
    this.caret.x = !this.value.length
      ? this.positionX - this.rectPaddingX
      : this.text.width;
  }

  Update(ticker: any): void {
    if (FocusManager.focusedEntityName === this.owner.name) {
      if (this.isTyping) {
        this.caret.alpha = 1;
        return;
      }

      const ticksLastTime = Math.floor(ticker.lastTime);

      if (Math.floor((ticksLastTime / this.caretBlinkingTime) % 2) === 0) {
        this.caret.alpha = 0;
      } else {
        this.caret.alpha = 1;
      }
    } else {
      this.caret.alpha = 0;
    }
  }
}

export default TextInput;

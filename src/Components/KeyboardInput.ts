import Component, { IComponent } from '../Component';

interface IKeyboardInput {
  keyupListener: any;
  keydownListener: any;
  Render(stage: any): void;
  Update(ticker: any): void;
  addListeners(keydown: (e: any) => any, keyup: (e: any) => any): void;
  removeListeners(): void;
}

class KeyboardInput extends Component implements IKeyboardInput {
  keyupListener: any;
  keydownListener: any;
  constructor() {
    super();
  }

  Render(stage: any): void {}

  Update(ticker: any): void {}

  addListeners(keydown: (e: any) => any, keyup: (e: any) => any) {
    this.keyupListener = window.addEventListener('keyup', keyup);
    this.keydownListener = window.addEventListener('keydown', keydown);
  }

  removeListeners() {
    window.removeEventListener('keyup', this.keyupListener);
    window.removeEventListener('keydown', this.keydownListener);
  }
}

export default KeyboardInput;

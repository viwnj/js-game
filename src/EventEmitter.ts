import * as PIXI from 'pixi.js';

class EventEmitter {
  static eventEmmiter: PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

  static emmit(eventName: string, ...args: any[]) {
    this.eventEmmiter.emit(eventName, ...args);
  }

  static on(eventName: string, handler: Function) {
    this.eventEmmiter.on(eventName, handler);
  }
}

export default EventEmitter;

import * as PIXI from 'pixi.js';
import Component, { IComponent } from './Component';
import Layer from './Layer';

export interface IEntity {
  name: string;

  componentMap: Map<string, IComponent>;
  AddComponent(componentId: string, component: IComponent): void;
  Render(stage: any): void;
  GetComponent(componentId: string): any;
}

export default class Entity extends PIXI.Container implements IEntity {
  ownerLayer: Layer;
  name: string;
  componentMap: Map<string, Component> = new Map();

  Render(stage: any): void {
    this.componentMap.forEach((component: Component, componentId: string) => {
      component.Render(stage);
    });
  }

  Update(ticker: any): void {
    this.componentMap.forEach((component: Component, componentId: string) => {
      component.Update(ticker);
    });
  }

  AddComponent(componentId: string, component: Component) {
    component.owner = this;
    this.componentMap.set(componentId, component);
  }

  GetComponent(componentId: string): any {
    return this.componentMap.get(componentId);
  }

  ClearComponents() {
    this.componentMap.clear();
  }
}

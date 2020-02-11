import * as PIXI from 'pixi.js';
import Layer from './Layer';
import Entity from './Entity';

export default class LayerManager {
  layerMap: Map<string, Layer> = new Map();
  focusedEntity: Entity;

  Render(stage: any): void {
    this.layerMap.forEach((layer: Layer): void => {
      layer.Render(stage);
    });
  }

  Update(ticker: any): void {
    this.layerMap.forEach((layer: Layer): void => {
      layer.Update(ticker);
    });
  }

  AddLayer(layerName: string): Layer {
    const newLayer = new Layer();

    this.layerMap.set(layerName, newLayer);
    return newLayer;
  }

  GetLayer(layerName: string): Layer {
    return this.layerMap.get(layerName);
  }

  ClearLayers() {
    this.layerMap.forEach((layer: Layer): void => {
      layer.ClearEntities();
    });
    this.layerMap.clear();
  }
}

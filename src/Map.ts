import * as PIXI from 'pixi.js';
import Layer from './Layer';
import Tile from './Components/Tile';
import Entity from './Entity';
import Component from './Component';

export default class Map {
  mapSizeX: number;

  mapSizeY: number;

  tileSize: number;

  scale: number;

  layer: Layer;

  map: Array<any> = [];

  graphics: any = new PIXI.Graphics();

  constructor(
    mapSizeX: number,
    mapSizeY: number,
    tileSize: number,
    scale: number,
    layer: Layer
  ) {
    this.mapSizeX = mapSizeX;
    this.mapSizeY = mapSizeY;
    this.tileSize = tileSize;
    this.scale = scale;
    this.layer = layer;
    this.LoadMap(this.mapSizeX, this.mapSizeY, this.tileSize, this.scale);
  }

  LoadMap(
    mapSizeX: number,
    mapSizeY: number,
    tileSize: number,
    scale: number
  ): void {
    for (let i: number = 0; i < mapSizeX * mapSizeY; i += 1) {
      const row = Math.floor(i / mapSizeX);
      const column = i % mapSizeY;
      const tilePositionY = tileSize * row;
      const tilePositionX = tileSize * column;
      const entity = new Entity();
      const tile = new Tile(tilePositionX, tilePositionY, tileSize);
      entity.AddComponent(`tile-${i}`, tile);
      this.layer.AddEntity(`tile-${i}`, entity);
    }
  }
}

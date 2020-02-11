import * as PIXI from 'pixi.js';
import LayerManager from './LayerManager';
import { Map, Entity as EntityD } from './data.declarations.ts';
import TileMap from './Map';
import Entity from './Entity';
import PlayerEntity from './Entities/PlayerEntity';
import Components from './Components';
import KeyboardInput from './Components/KeyboardInput';
import CharacterSelection from './Components/UI/CharacterSelection';
import AppData from './AppData';
import Component from './Component';

class Application extends PIXI.Application {
  app: any;

  layerManager: LayerManager;
  state: string;

  constructor() {
    super();
    this.init();
    return this;
  }

  init(): void {
    this.app = new PIXI.Application({
      width: 800,
      height: 600,
      antialias: true,
      transparent: false,
      resolution: 1,
    });

    this.layerManager = new LayerManager();
    this.Load('CHARACTER_SELECTION');
  }

  // Reads the JSON file to create the necessary Layers, Entities and Components
  Load(state: string) {
    const {
      layers,
    }: {
      layers: any;
    } = AppData[state];

    console.log('[DEBUG]: Loading State: ', state);
    this.Cleanup();
    layers.forEach((layer: { name: string; entities: [{ name: string }] }) => {
      this.layerManager.AddLayer(layer.name);
      if (layer.entities) {
        layer.entities.forEach((entity: EntityD) => {
          const newEntity = new Entity();
          entity.components.forEach(
            (component: { name: string; args: any }) => {
              switch (component.name) {
                case 'TextInput':
                  {
                    const { TextInput } = Components;

                    const {
                      backgroundColor,
                      width,
                      height,
                      top,
                      left,
                      color,
                      placeholder,
                    } = component.args;
                    newEntity.AddComponent(
                      'TextInput',
                      new TextInput(
                        left,
                        top,
                        width,
                        height,
                        Number(backgroundColor),
                        color,
                        placeholder
                      )
                    );
                  }

                  break;
                case 'KeyboardInput':
                  newEntity.AddComponent('KeyboardInput', new KeyboardInput());
                  break;
                case 'Button': {
                  const { Button } = Components;
                  const {
                    label,
                    backgroundColor,
                    color,
                    width,
                    height,
                    left,
                    top,
                    onClick,
                  } = component.args;
                  newEntity.AddComponent(
                    'Button',
                    new Button(
                      label,
                      backgroundColor,
                      color,
                      width,
                      height,
                      left,
                      top,
                      onClick
                    )
                  );
                  break;
                }

                case 'CharacterSelection': {
                  'CharacterSelection';
                  newEntity.AddComponent('Rect', new CharacterSelection());
                  break;
                }
                default:
                  break;
              }
            }
          );
          this.layerManager
            .GetLayer(layer.name)
            .AddEntity(entity.name, newEntity);
        });
      }
    });

    // if (map !== undefined) {
    //   const layer = this.layerManager.GetLayer(map.layerId);
    //   const tileMap = new TileMap(
    //     map.mapSizeX,
    //     map.mapSizeY,
    //     map.tileSize,
    //     map.scale,
    //     layer
    //   );
    //   this.layerManager.Render(this.stage);
    // }
  }

  Render(stage: any): void {
    this.layerManager.Render(stage);
  }

  Update(ticker: any): void {
    this.layerManager.Update(ticker);
  }

  Cleanup() {
    this.stage.removeChildren();
    this.layerManager.ClearLayers();
  }
}

export default Application;

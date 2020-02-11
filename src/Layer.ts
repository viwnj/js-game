import * as PIXI from 'pixi.js';
import Entity from './Entity';

export default class Layer {
  entityMap: Map<string, Entity> = new Map();

  Render(stage: any): void {
    this.entityMap.forEach((entity: Entity, eid: string): void => {
      entity.Render(stage);
    });
  }

  Update(ticker: any): void {
    this.entityMap.forEach((entity: Entity): void => {
      entity.Update(ticker);
    });
  }

  AddEntity(entityId: string, entity: Entity): void {
    entity.name = entityId;
    entity.ownerLayer = this;
    this.entityMap.set(entityId, entity);
  }

  GetEntity(entityId: string): Entity {
    return this.entityMap.get(entityId);
  }

  RemoveEntity(entityId: string) {
    if (this.entityMap.has(entityId)) {
      this.entityMap.delete(entityId);
    }
  }

  ClearEntities() {
    this.entityMap.forEach((entity: Entity): void => {
      entity.ClearComponents();
    });

    this.entityMap.clear();
  }
}

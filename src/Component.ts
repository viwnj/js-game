import Entity from './Entity';

export interface IComponent {
  owner: Entity;

  Render(stage: any): void;
  Update(ticker: any): void;
}

export default abstract class Component implements IComponent {
  owner: Entity;

  public abstract Render(stage: any): void;

  public abstract Update(ticker: any): void;
}

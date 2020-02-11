import Entity from './Entity';

class FocusManager {
  static focusedEntity: Entity;
  static callee: any;

  static focus(entity?: Entity, callee?: any) {
    // In case someone else gets the focus, we want to call the onBlur impl
    // of the callee
    const thisEntityName = entity?.name || null;

    if (this.focusedEntity && this.focusedEntityName !== thisEntityName) {
      if (this.callee.onBlur) {
        this.callee.onBlur();
      }
    }

    this.focusedEntity = entity;
    this.callee = callee;
  }

  static blur() {
    this.focus(null, null);
  }

  static get focusedEntityName() {
    return this.focusedEntity ? this.focusedEntity.name : null;
  }
}

export default FocusManager;

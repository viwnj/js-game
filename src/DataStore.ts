class DataStore {
  private static store: { [key: string]: any } = {};

  static getItem(key: string): any {
    return this.store[key];
  }

  static setItem(key: string, value: any) {
    this.store[key] = value;
  }
}

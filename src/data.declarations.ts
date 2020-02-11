export interface Map {
  mapSizeX: number;
  mapSizeY: number;
  tileSize: number;
  scale: number;
  layerId: string;
}

export interface Entity {
  name: string;
  components: Array<{ name: string; args: Array<any> }>;
}

export interface SareeMetadata {
  title: string;
  image: string;
  material: string;
  craft: string;
  color: string;
  collection: string;
  shortDescription: string;
}

export interface LookbookSpread {
  id: string;
  spreadNumber: number;
  title: string;
  leftItem: SareeMetadata;
  rightItem: SareeMetadata;
}

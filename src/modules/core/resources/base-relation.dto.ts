export interface IBaseRelation {
  id: number;
  name: string;
}

export class BaseRelationDto implements IBaseRelation {
  id: number;
  name: string;
}

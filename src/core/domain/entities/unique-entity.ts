import { Entity } from "./entity.base";

export abstract class UniqueEntity<Props, Id extends string = string> extends Entity<Props> {
  private readonly _id: Id;
  protected get id(): Id {
    return this._id;
  }
  protected constructor(props: Props, id: Id) {
    super(props);
    this._id = id;
  }

  equals(entity?: UniqueEntity<Props, Id>): boolean {
    return !!entity && this.id === entity.id;
  }
}

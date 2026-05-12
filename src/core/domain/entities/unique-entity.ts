import { Entity } from "./entity.base";

export abstract class UniqueEntity<Props, Id extends string = string> extends Entity<Props> {
  protected readonly id: Id;
  protected constructor(props: Props, id: Id) {
    super(props);
    this.id = id;
  }

  equals(entity?: UniqueEntity<Props, Id>): boolean {
    return !!entity && this.id === entity.id;
  }
}

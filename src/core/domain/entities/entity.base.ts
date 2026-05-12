export abstract class Entity<Props> {
  protected readonly props: Props;

  protected constructor(props: Props) {
    this.props = props;
  }

  get raw(): Props {
    return this.props;
  }
}

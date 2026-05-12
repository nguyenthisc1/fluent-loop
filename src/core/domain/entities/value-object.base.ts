export abstract class ValueObject<Props> {
  protected readonly props: Props;

  protected constructor(props: Props) {
    this.props = props;
  }

  equals(valueObject?: ValueObject<Props>): boolean {
    if (!valueObject) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }

  get raw(): Props {
    return this.props;
  }
}

export interface Policy<Subject, Context = unknown> {
  isSatisfiedBy(subject: Subject, context?: Context): boolean;
}

import type { DomainEvent } from "../events/domain-event.base";
import { UniqueEntity } from "./unique-entity";

export abstract class AggregateRoot<Props, Id extends string = string> extends UniqueEntity<Props, Id> {
  private readonly domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  pullDomainEvents(): DomainEvent[] {
    return this.domainEvents.splice(0);
  }
}

export type DomainEventName = string;

export interface DomainEvent<Payload = unknown> {
  id: string;
  name: DomainEventName;
  occurredAt: Date;
  payload: Payload;
}

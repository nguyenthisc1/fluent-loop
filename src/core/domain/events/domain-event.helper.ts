import type { DomainEvent } from "./domain-event.base";

export function createDomainEvent<Payload>(name: string, payload: Payload): DomainEvent<Payload> {
  return {
    id: crypto.randomUUID(),
    name,
    occurredAt: new Date(),
    payload,
  };
}

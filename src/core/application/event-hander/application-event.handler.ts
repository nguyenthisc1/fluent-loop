export interface EventHandler<Event, Output = void> {
  handle(event: Event): Promise<Output>;
}

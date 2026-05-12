export interface Mapper<Persistence, Domain, Response = Persistence> {
  toDomain(persistence: Persistence): Domain;
  toPersistence(domain: Domain): Persistence;
  toResponse?(domain: Domain): Response;
}

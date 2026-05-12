import { ConflictException } from "@/core/exceptions/exception";
import type { UpdateVocabularyItemInput, VocabularyItemProps } from "./vocabulary.types";

export class VocabularyItemEntity {
  private constructor(private readonly props: VocabularyItemProps) {}

  static create(props: VocabularyItemProps): VocabularyItemEntity {
    return new VocabularyItemEntity(props);
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get term() {
    return this.props.term;
  }

  get meaning() {
    return this.props.meaning;
  }

  get example() {
    return this.props.example;
  }

  get note() {
    return this.props.note;
  }

  get status() {
    return this.props.status;
  }

  get source() {
    return this.props.source;
  }

  get tags() {
    return [...this.props.tags];
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get learnedAt() {
    return this.props.learnedAt;
  }

  isLearned(): boolean {
    return this.props.status === "learned";
  }

  update(input: Omit<UpdateVocabularyItemInput, "itemId">): VocabularyItemEntity {
    return new VocabularyItemEntity({
      ...this.props,
      ...input,
      updatedAt: new Date(),
    });
  }

  markLearned(learnedAt = new Date()): VocabularyItemEntity {
    if (this.isLearned()) {
      throw new ConflictException("Vocabulary item is already learned.");
    }

    return new VocabularyItemEntity({
      ...this.props,
      status: "learned",
      learnedAt,
      updatedAt: learnedAt,
    });
  }

  toJSON(): VocabularyItemProps {
    return {
      ...this.props,
      tags: [...this.props.tags],
    };
  }
}

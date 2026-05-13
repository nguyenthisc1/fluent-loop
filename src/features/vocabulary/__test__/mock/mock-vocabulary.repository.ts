import { NotFoundException } from "@/core/exceptions/exception";
import { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";
import type { DeleteVocabularyItemInput, GetVocabularyItemsInput, MarkVocabularyLearnedInput, SaveVocabularyItemInput, UpdateVocabularyItemInput, VocabularyItemId } from "../../domain/entities/vocabulary.types";
import type { VocabularyRepository } from "../../domain/repositories/vocabulary.repository";
import { mockVocabularyItem } from "./mock-vocabulary.data";

export class MockVocabularyRepository implements VocabularyRepository {
  private readonly items = new Map<VocabularyItemId, VocabularyItemEntity>();

  constructor(initialItems: VocabularyItemEntity[] = [mockVocabularyItem]) {
    for (const item of initialItems) {
      this.items.set(item.id, item);
    }
  }

  async saveItem(input: SaveVocabularyItemInput): Promise<VocabularyItemEntity> {
    const now = new Date();

    const item = VocabularyItemEntity.create({
      id: crypto.randomUUID(),
      userId: input.userId,
      term: input.term,
      meaning: input.meaning,
      example: input.example,
      note: input.note,
      status: "new",
      source: input.source,
      tags: input.tags ?? [],
      createdAt: now,
      updatedAt: now,
    });

    this.items.set(item.id, item);

    return item;
  }

  async getItem(itemId: VocabularyItemId): Promise<VocabularyItemEntity | null> {
    return this.items.get(itemId) ?? null;
  }

  async getItems(input: GetVocabularyItemsInput): Promise<VocabularyItemEntity[]> {
    return Array.from(this.items.values())
      .filter((item) => item.userId === input.userId)
      .filter((item) => (input.status ? item.status === input.status : true))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateItem(input: UpdateVocabularyItemInput): Promise<VocabularyItemEntity> {
    const item = this.items.get(input.itemId);

    if (!item) {
      throw new NotFoundException("Vocabulary item not found.");
    }

    const updatedItem = item.update(input);

    this.items.set(updatedItem.id, updatedItem);

    return updatedItem;
  }

  async markLearned(input: MarkVocabularyLearnedInput): Promise<VocabularyItemEntity> {
    const item = this.items.get(input.itemId);

    if (!item) {
      throw new NotFoundException("Vocabulary item not found.");
    }

    const updatedItem = item.markLearned();

    this.items.set(updatedItem.id, updatedItem);

    return updatedItem;
  }

  async deleteItem(input: DeleteVocabularyItemInput): Promise<void> {
    this.items.delete(input.itemId);
  }
}

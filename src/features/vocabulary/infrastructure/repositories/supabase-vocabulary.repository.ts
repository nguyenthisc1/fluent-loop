import { NotFoundException } from "@/core/exceptions/exception";
import { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";
import type { DeleteVocabularyItemInput, GetVocabularyItemsInput, MarkVocabularyLearnedInput, SaveVocabularyItemInput, UpdateVocabularyItemInput, VocabularyItemId } from "../../domain/entities/vocabulary.types";
import type { VocabularyRepository } from "../../domain/repositories/vocabulary.repository";
import { VocabularyItemMapper } from "../mapper/vocabulary.mapper";
import type { VocabularyItemModel } from "../models/vocabulary.model";

type SupabaseLikeClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: (table: string) => any;
};

export class SupabaseVocabularyRepository implements VocabularyRepository {
  constructor(
    private readonly supabase: SupabaseLikeClient,
    private readonly mapper = new VocabularyItemMapper(),
  ) {}

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

    const { data, error } = await this.supabase.from("vocabulary_items").insert(this.mapper.toPersistence(item)).select().single();

    if (error) throw error;

    return this.mapper.toDomain(data as VocabularyItemModel);
  }

  async getItem(itemId: VocabularyItemId): Promise<VocabularyItemEntity | null> {
    const { data, error } = await this.supabase.from("vocabulary_items").select("*").eq("id", itemId).maybeSingle();

    if (error || !data) return null;

    return this.mapper.toDomain(data as VocabularyItemModel);
  }

  async getItems(input: GetVocabularyItemsInput): Promise<VocabularyItemEntity[]> {
    let query = this.supabase.from("vocabulary_items").select("*").eq("user_id", input.userId).order("created_at", { ascending: false });

    if (input.status) {
      query = query.eq("status", input.status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return ((data ?? []) as VocabularyItemModel[]).map((model) => this.mapper.toDomain(model));
  }

  async updateItem(input: UpdateVocabularyItemInput): Promise<VocabularyItemEntity> {
    const item = await this.getRequiredItem(input.itemId);
    const updatedItem = item.update(input);

    const { data, error } = await this.supabase.from("vocabulary_items").upsert(this.mapper.toPersistence(updatedItem)).select().single();

    if (error) throw error;

    return this.mapper.toDomain(data as VocabularyItemModel);
  }

  async markLearned(input: MarkVocabularyLearnedInput): Promise<VocabularyItemEntity> {
    const item = await this.getRequiredItem(input.itemId);
    const updatedItem = item.markLearned();

    const { data, error } = await this.supabase.from("vocabulary_items").upsert(this.mapper.toPersistence(updatedItem)).select().single();

    if (error) throw error;

    return this.mapper.toDomain(data as VocabularyItemModel);
  }

  async deleteItem(input: DeleteVocabularyItemInput): Promise<void> {
    const { error } = await this.supabase.from("vocabulary_items").delete().eq("id", input.itemId);

    if (error) throw error;
  }

  private async getRequiredItem(itemId: VocabularyItemId): Promise<VocabularyItemEntity> {
    const item = await this.getItem(itemId);

    if (!item) {
      throw new NotFoundException("Vocabulary item not found.");
    }

    return item;
  }
}

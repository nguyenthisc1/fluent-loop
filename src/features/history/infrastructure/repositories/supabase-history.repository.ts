import type { HistoryItemEntity } from "../../domain/entities/history.entity";
import type { GetHistoryItemsInput, GetRecentHistoryInput } from "../../domain/entities/history.types";
import type { HistoryRepository } from "../../domain/repositories/history.repository";
import { HistoryItemMapper } from "../mapper/history.mapper";
import type { HistoryItemModel } from "../models/history.model";

type SupabaseLikeClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: (table: string) => any;
};

export class SupabaseHistoryRepository implements HistoryRepository {
  constructor(
    private readonly supabase: SupabaseLikeClient,
    private readonly mapper = new HistoryItemMapper(),
  ) {}

  async getItems(input: GetHistoryItemsInput): Promise<HistoryItemEntity[]> {
    let query = this.supabase.from("practice_history").select("*").eq("user_id", input.userId).order("created_at", { ascending: false });

    if (input.mode) {
      query = query.eq("mode", input.mode);
    }

    if (input.status) {
      query = query.eq("status", input.status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return ((data ?? []) as HistoryItemModel[]).map((model) => this.mapper.toDomain(model));
  }

  async getRecent(input: GetRecentHistoryInput): Promise<HistoryItemEntity[]> {
    const { data, error } = await this.supabase
      .from("practice_history")
      .select("*")
      .eq("user_id", input.userId)
      .order("created_at", { ascending: false })
      .limit(input.limit ?? 5);

    if (error) throw error;

    return ((data ?? []) as HistoryItemModel[]).map((model) => this.mapper.toDomain(model));
  }
}

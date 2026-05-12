import type { DashboardSummaryProps } from "./dashboard.types";

export class DashboardSummaryEntity {
  private constructor(private readonly props: DashboardSummaryProps) {}

  static create(props: DashboardSummaryProps): DashboardSummaryEntity {
    return new DashboardSummaryEntity(props);
  }

  get userId() {
    return this.props.userId;
  }

  get displayName() {
    return this.props.displayName;
  }

  get englishLevel() {
    return this.props.englishLevel;
  }

  get learningGoal() {
    return this.props.learningGoal;
  }

  get recommendedPractice() {
    return this.props.recommendedPractice;
  }

  get progress() {
    return this.props.progress;
  }

  get recentSessions() {
    return [...this.props.recentSessions];
  }

  get vocabularyPreview() {
    return [...this.props.vocabularyPreview];
  }

  get createdAt() {
    return this.props.createdAt;
  }

  hasRecentSessions(): boolean {
    return this.props.recentSessions.length > 0;
  }

  hasVocabularyPreview(): boolean {
    return this.props.vocabularyPreview.length > 0;
  }

  toJSON(): DashboardSummaryProps {
    return {
      ...this.props,
      recentSessions: [...this.props.recentSessions],
      vocabularyPreview: [...this.props.vocabularyPreview],
    };
  }
}

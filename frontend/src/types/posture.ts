export interface FeedbackItem {
  frame: number;
  timestamp: number;
  back_angle: number;
  knee_over_toe: boolean;
  issues: string[];
}
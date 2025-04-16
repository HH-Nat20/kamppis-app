import { create } from "./request";

export const postFeedback = async (
  userId: number,
  feedback: string
): Promise<{ feedback: string }> => {
  const feedbackMessage = `Feedback from user ${userId}: ${feedback}`;
  const response = await create("feedback", { feedback: feedbackMessage });
  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }
  return response.json();
};

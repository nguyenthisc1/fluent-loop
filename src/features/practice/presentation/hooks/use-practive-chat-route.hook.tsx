import { usePracticeSessionRoute } from "./use-practice-session-route.hook";

export function usePracticeChat() {
  const practice = usePracticeSessionRoute();

  async function send(content: string) {
    if (!practice.session) {
      throw new Error("Practice session is required.");
    }

    await practice.sendMessage({
      sessionId: practice.session.id,
      content,
    });
  }

  async function finish() {
    if (!practice.session) {
      throw new Error("Practice session is required.");
    }

    return practice.finishSession({
      sessionId: practice.session.id,
    });
  }

  return {
    ...practice,
    send,
    finish,
  };
}

import { IMailAdapter } from "../adapters/mailAdapter";
import { IFeedbackRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}
export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: IFeedbackRepository,
    private mailAdapter: IMailAdapter
  ) {}
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required.");
    }
    if (!comment) {
      throw new Error("Comment is required.");
    }
    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid sceenshot format.");
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans0serif;font-size:16px;color:#111;">`,
        `<p> Tipo do feedback: ${type}.</p>`,
        `<p> Comentário do feedback: ${comment}.</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}

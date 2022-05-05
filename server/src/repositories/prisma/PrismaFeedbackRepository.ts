import { prisma } from "../../prisma";
import {
  FeedbackCreateData,
  IFeedbackRepository,
} from "../FeedbacksRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}

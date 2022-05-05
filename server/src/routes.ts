import express from "express";
import { SubmitFeedbackUseCase } from "./useCases/SubmitFeedbackUseCases";
import { PrismaFeedbackRepository } from "./repositories/prisma/PrismaFeedbackRepository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/NodemailerMailAdapter";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ message: "hello world" });
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
export { routes };

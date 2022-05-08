import { IMailAdapter, ISendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "603a3aa5adfb26",
    pass: "b00021e104262a",
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body, screenshot }: ISendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com",
      to: "Marcelo Camacho <marcelocamacho.ufpa@gmail.com",
      subject,
      html: body,
    });
  }
}

import { IMailProvider, IMessage } from '../IMailProvider'
import Mail from 'nodemailer/lib/mailer'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export class NodemailerMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_TRANSPORTER_HOST,
      secure: true,
      port: Number(process.env.NODEMAILER_TRANSPORTER_PORT),
      auth: {
        user: process.env.NODEMAILER_TRANSPORTER_USERNAME,
        pass: process.env.NODEMAILER_TRANSPORTER_PASSWORD,
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
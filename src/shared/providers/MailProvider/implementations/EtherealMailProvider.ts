import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";
import { injectable, inject } from "tsyringe";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client : Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider : IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(({user, pass, smtp}) => {
      const transporter = nodemailer.createTransport({
        ...smtp,
        auth: {
          user,
          pass
        }
      });
      this.client = transporter
    })
  }

  public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<void> {
    const html = await this.mailTemplateProvider.parse(templateData)
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html,
    })
    console.log('Message sent: %s', message.id)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }

}

import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import Handlebars from 'handlebars';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from '@domain/entities';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  private async getTemplate(templateName: string): Promise<string> {
    const templatePath = path.join(
      __dirname,
      `../../../../src/infrastructure/email/templates/${templateName}.hbs`,
    );
    return fs.promises.readFile(templatePath, 'utf8');
  }

  /**
   * Sends an email with a verification link to the user
   * @param user The user to send the email to
   * @param url The verification link
   * @param logoUrl The URL of the logo of the application
   * @param subject The subject of the email
   * @param templateName The name of the template to use
   */
  async sendEmailWithTokenVerification(
    user: Partial<User>,
    url: string,
    logoUrl: string,
    subject: string,
    templateName: string,
  ) {
    const template = await this.getTemplate(templateName);
    const compiledTemplate = Handlebars.compile(template);

    const fullName = `${user.name} ${user.last_name}`;
    const message = compiledTemplate({
      name: fullName,
      verificationUrl: url,
      logoUrl,
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: subject,
      html: message,
    });
  }
}

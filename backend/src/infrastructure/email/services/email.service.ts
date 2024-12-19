import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@domain/entities/user.entity';
import Handlebars from 'handlebars';

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

  async sendVerificationEmail(
    user: Partial<User>,
    url: string,
    logoUrl: string,
  ) {
    const template = await this.getTemplate('verify-email');
    const compiledTemplate = Handlebars.compile(template);

    const fullName = `${user.name} ${user.last_name}`;
    const message = compiledTemplate({
      name: fullName,
      verificationUrl: url,
      logoUrl,
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify your email',
      html: message,
    });
  }
}

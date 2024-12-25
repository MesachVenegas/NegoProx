import { Module } from '@nestjs/common';

import { envs } from '@shared/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '@infrastructure/email/services/email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: envs.email.host,
        port: envs.email.port,
        secure: envs.email.secure,
        auth: {
          user: envs.email.user,
          pass: envs.email.password,
        },
      },
      defaults: {
        from: `NegoProx <${envs.email.user}>`,
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class MailModule {}

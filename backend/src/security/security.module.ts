import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { doubleCsrf } from 'csrf-csrf';

import { SecurityService } from './security.service';

@Global()
@Module({
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {
  static forRoot() {
    return {
      module: SecurityModule,
      providers: [
        {
          provide: 'CSRF_UTILITIES',
          useFactory: (config: ConfigService) => {
            const secret =
              config.get<string>('security.csrfSecret') ||
              '820cbc9641ec98d4d4b49cf9794bf8fce0b428a1f8d42d3bf3b4f7698b4ac2b1c834b2dec62ac7f2f4c06d0e7ce54be4e410293a403c7d85ed12b757a9b6b0eb';
            if (!config.get<string>('security.csrfSecret'))
              throw new Error(
                `CSRF secret not found ${config.get('security.csrfSecret')}`,
              );
            const options = {
              getSecret: () => secret,
              cookieName: 'X-NGX',
              cookieOptions: {
                httpOnly: true,
                secure: config.get<string>('app.environment') === 'production',
              },
              size: 64,
              ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
            };
            const csrf = doubleCsrf(options);
            return csrf;
          },
          inject: [ConfigService],
        },
        SecurityService,
      ],
    };
  }
}

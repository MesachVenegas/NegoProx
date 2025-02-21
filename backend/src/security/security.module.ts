import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { doubleCsrf } from 'csrf-csrf';

import { SecurityService } from './security.service';

@Global()
@Module({
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {
  static forRoot(): DynamicModule {
    return {
      module: SecurityModule,
      providers: [
        {
          provide: 'CSRF_UTILITIES',
          useFactory: (config: ConfigService) => {
            const secret = config.get<string>('security.csrfSecret') as string;
            if (!config.get<string>('security.csrfSecret'))
              throw new Error(
                `CSRF secret not found ${config.get('security.csrfSecret')}`,
              );
            const options = {
              getSecret: () => secret,
              cookieName: '__ngx_csrf__',
              cookieOptions: {
                httpOnly: false,
                secure: config.get<string>('app.environment') === 'production',
                sameSite: 'strict' as const,
                path: '/',
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
      exports: [SecurityService, 'CSRF_UTILITIES'],
    };
  }
}

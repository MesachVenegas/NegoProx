import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class UtilsService {
  static slugify(text: string) {
    return slugify(text, {
      lower: true,
      strict: true,
      locale: 'es',
      trim: true,
    });
  }

  camelCaseToSlug(text: string): string {
    const normalizedText = slugify(text, {
      strict: true,
      locale: 'es',
      trim: true,
    });

    return normalizedText
      .split('_')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}

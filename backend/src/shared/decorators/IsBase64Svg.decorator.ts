import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsBase64Svg(validationOptions: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBase64Svg',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const svgBase64Prefix = 'data:image/svg+xml;base64,';
          if (!value.startsWith(svgBase64Prefix)) return false;

          try {
            const base64Data = value.slice(svgBase64Prefix.length);
            const decoded = Buffer.from(base64Data, 'base64').toString();

            return decoded.includes('<svg');
          } catch {
            return false;
          }
        },
        defaultMessage() {
          return 'svg_icon must be a valid base64 encoded SVG image';
        },
      },
    });
  };
}

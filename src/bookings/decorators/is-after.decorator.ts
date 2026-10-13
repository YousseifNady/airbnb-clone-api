import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsAfter(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAfter',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ];

          if (value == null || relatedValue == null) {
            return true;
          }

          const date = new Date(value as string | number | Date);
          const relatedDate = new Date(
            relatedValue as string | number | Date,
          );

          if (
            Number.isNaN(date.getTime()) ||
            Number.isNaN(relatedDate.getTime())
          ) {
            return false;
          }

          return date > relatedDate;
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;

          return `${args.property} must be later than ${relatedPropertyName}`;
        },
      },
    });
  };
}
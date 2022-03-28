import { ValidationError } from 'class-validator';

export interface IValidationError {
  property: string;
  errors: string[];
}

export const formatValidationErrors = (
  errors: ValidationError[]
): IValidationError[] =>
  errors.length > 0
    ? errors.map(({ property, constraints, children }) => ({
        property,
        errors: constraints ? Object.values(constraints) : null,
        children: children
          .map(({ children }) =>
            children.map((child) => ({
              property: child.property,
              errors: Object.values(child.constraints),
            }))
          )
          .flat(),
      }))
    : [];

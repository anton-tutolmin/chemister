import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ElementList } from "src/elements/element.constants";
import { AddElementsDto } from "./list.dto";

@ValidatorConstraint({ name: 'ExistsElement' })
export class ExistsElementConstraint implements ValidatorConstraintInterface {
  async validate(elements: number[], args: ValidationArguments) {
    return elements.every(
      elementNumber => ElementList.find(element => element.number === elementNumber)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'One of element numbers is not valid';
  }
}

export const ExistsElement = (validationOptions?: ValidationOptions) => (
  elements: AddElementsDto,
  propertyName: string
) => {
  registerDecorator({
    target: elements.constructor,
    propertyName,
    constraints: [],
    options: validationOptions,
    validator: ExistsElementConstraint,
  });
}
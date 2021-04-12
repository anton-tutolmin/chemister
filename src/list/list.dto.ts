import { IsNumber } from "class-validator";

export class AddElementsDto {
  @IsNumber({}, { each: true })
  elements: number[];
}

export class RemoveElementsDto extends AddElementsDto {}
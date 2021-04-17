import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ExistsElement } from "./list.decorator";

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class AddElementsDto {
  @IsNumber({}, { each: true })
  @ExistsElement()
  elements: number[];
}

export class RemoveElementsDto extends AddElementsDto {}
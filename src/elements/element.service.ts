import { Inject, Injectable } from "@nestjs/common";
import { IElement } from "./element.interface";

@Injectable()
export class ElementService {
  constructor(
    @Inject('ElementList')
    private readonly elementList: IElement[]
  ) {}

  findElements(numbers: number[]) {
    return this.elementList.filter(
      element => numbers.includes(element.number)
    );
  }

  findElement(elementNumber: number) {
    return this.elementList.find(element => element.number === elementNumber);
  }
}
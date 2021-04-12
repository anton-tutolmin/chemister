import { Module } from "@nestjs/common";
import { ElementService } from "./element.service";
import { ElementList } from './element.constants';

@Module({
  imports: [],
  providers: [
    ElementService,
    {
      provide: 'ElementList',
      useFactory: () => ElementList,
    }
  ],
  exports: [],
})
export class ElementsModule {}
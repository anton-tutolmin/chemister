import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lists } from "./list.entity";
import * as _ from 'lodash';
import { AddElementsDto, RemoveElementsDto } from "./list.dto";

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(Lists)
    private readonly listRepository: Repository<Lists>
  ) {}

  async findById(listId: Lists['id']) {
    return this.listRepository.findOne(listId);
  }

  async addElements(listId: Lists['id'], addElementsDto: AddElementsDto) {
    const list = await this.listRepository.findOne(listId, { select: ['elements'] });
    return this.listRepository.update(listId, {
      elements: _.sortedUniq([...list.elements, ...addElementsDto.elements]),
    });
  }

  async removeElements(listId: Lists['id'], removeElementsDto: RemoveElementsDto) {
    const list = await this.listRepository.findOne(listId, { select: ['elements'] });
    return this.listRepository.update(listId, {
      elements: _.difference([...list.elements, ...removeElementsDto.elements]),
    });
  }
}
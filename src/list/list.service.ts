import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Lists } from "./list.entity";
import * as _ from 'lodash';
import { AddElementsDto, CreateListDto, RemoveElementsDto } from "./list.dto";
import { Users } from "src/user/user.entity";
import { getNumberForDuplicatedName } from "src/utils/functions";

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(Lists)
    private readonly listRepository: Repository<Lists>
  ) {}

  async findById(listId: Lists['id']) {
    return this.listRepository.findOne(listId);
  }

  async findByUserId(userId: Users['id']) {
    return this.listRepository.find({ userId });
  }

  async create(userId: Users['id'], createListDto: CreateListDto) {
    const listName = await this.getNewListNameIfDuplicated(userId, createListDto.name);
    return this.listRepository.save({ ...createListDto, userId, name: listName });
  }

  async addElements(listId: Lists['id'], addElementsDto: AddElementsDto) {
    const list = await this.listRepository.findOne(listId);
    return this.listRepository.update(listId, {
      elements: _.uniq([...list.elements, ...addElementsDto.elements]),
    });
  }

  async removeElements(listId: Lists['id'], removeElementsDto: RemoveElementsDto) {
    const list = await this.listRepository.findOne(listId, { select: ['elements'] });
    return this.listRepository.update(listId, {
      elements: _.difference([...list.elements, ...removeElementsDto.elements]),
    });
  }

  async getNewListNameIfDuplicated(userId: Users['id'], listName: string) {
    const lists = await this.listRepository.find({ name: Like(`${listName}%`), userId });
    
    if (lists.length) {
      const suffix = getNumberForDuplicatedName(lists, listName);
      return listName + suffix;
    }
    
    return listName;
  }
}
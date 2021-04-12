import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDto } from "src/auth/auth.dto";
import { Repository } from "typeorm";
import { UserUpdateDto } from "./user.dto";
import { Users } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  async findById(userId: Users['id']) {
    return this.usersRepository.findOne(userId, {
      where: {
        authorize: true
      }
    });
  }

  async authorizeUser(signUpDto: SignUpDto) {
    const user = await this.findByEmail(signUpDto.email);
    return this.usersRepository.save({ ...user, ...signUpDto, authorize: true });
  }

  async findByEmail(email: Users['email']) {
    return this.usersRepository.findOne({ email });
  }

  async findByUsername(username: Users['username']) {
    return this.usersRepository.findOne({ username });
  }

  async updateById(userId: Users['id'], updateDto: UserUpdateDto) {
    return this.usersRepository.update(userId, { ...updateDto });
  }

  async deleteById(userId: Users['id']) {
    return this.usersRepository.update(userId, { authorize: false });
  }
}
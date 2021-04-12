import { Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from 'bcrypt';
import { HASH_SALT_ROUNDS } from "src/constants";

@Injectable()
export class CryptService {
  async hashPassword(password: string) {
    const salt = await genSalt(HASH_SALT_ROUNDS);
    return hash(password, salt);
  }

  async comparePassword(password: string, hash: string) {
    return compare(password, hash);
  }
}
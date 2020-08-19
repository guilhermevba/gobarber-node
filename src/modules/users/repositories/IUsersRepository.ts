import User from "@users/infra/http/typeorm/entities/User";
import ICreateUserDTO from "@users/dto/ICreateUserDTO";
import { IFindAllUsersDTO } from "@users/dto/IFindAllUsersDTO";

export default interface IUsersRepository{
  findByEmail(email: string): Promise<User | undefined>
  findAllUsers(data: IFindAllUsersDTO): Promise<User[]>
  findById(user_id: string): Promise<User | undefined>
  create(createUserDTO: ICreateUserDTO): Promise<User>
  update(user: User): Promise<User>
}

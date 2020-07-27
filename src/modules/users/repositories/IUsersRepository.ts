import User from "@users/infra/typeorm/entities/users.model";
import ICreateUserDTO from "@users/dto/ICreateUserDTO";

export default interface IUsersRepository{
  findByEmail(email: string): Promise<User | undefined>
  findById(user_id: string): Promise<User | undefined>
  create(createUserDTO: ICreateUserDTO): Promise<User>
  update(user: User): Promise<User>
}

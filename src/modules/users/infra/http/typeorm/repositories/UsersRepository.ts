import {getRepository, Repository, Not} from 'typeorm'
import User from '../entities/User'
import IUsersRepository from "@users/repositories/IUsersRepository";
import ICreateUserDTO from '@users/dto/ICreateUserDTO';
import { IFindAllUsersDTO } from '@users/dto/IFindAllUsersDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor(){
    this.ormRepository = getRepository(User)
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({where : {email}})
  }
  public async findById(user_id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(user_id)
  }
  public async create(createUserDTO: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(createUserDTO)
    await this.ormRepository.save(user)
    return user
  }
  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

  public async findAllUsers({except_user_id}: IFindAllUsersDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: Not(except_user_id)
    })
    return users;
  }

}

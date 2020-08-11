import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm'
@Entity('user_tokens')
export default class UserToken{
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Generated('uuid')
  public token: string;

  @Column()
  public user_id: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

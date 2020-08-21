import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from '@users/infra/http/typeorm/entities/User'

@Entity('appointments')
export default class Appointment{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({name: 'provider_id', referencedColumnName: 'id'})
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

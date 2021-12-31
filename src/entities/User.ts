import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { v4 } from 'uuid'

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public avatar: string;

  constructor(props: Omit<User, 'id'>) {
    Object.assign(this, props);
    this.id = v4();
  }
}
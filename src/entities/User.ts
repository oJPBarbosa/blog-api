import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  public readonly user_id: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public avatar: string;

  @Column('boolean')
  public authorized: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  constructor(props: Omit<User, 'user_id'>) {
    Object.assign(this, props);
    this.user_id = v4();
  }
}
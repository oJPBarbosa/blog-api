import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Post } from './Post'
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

  @OneToMany(() => Post, (post) => post.author_id)
  public posts: Post[];

  constructor(props: Omit<User, 'user_id' | 'created_at' | 'updated_at'>) {
    Object.assign(this, props);
    this.user_id = v4();
  }
}
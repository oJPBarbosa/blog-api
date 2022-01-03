import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Post } from './Post'
import { v4 } from 'uuid'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column('boolean')
  authorized: boolean;

  @Column('boolean')
  verified: boolean;

  @Column('boolean')
  root: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.author_id)
  posts: Post[];

  constructor(props: Omit<User, 
    'user_id' |
    'authorized' |
    'verified' |
    'root' |
    'created_at' |
    'updated_at' |
    'posts' >) {
    Object.assign(this, props);
    this.user_id = v4();
  }
}
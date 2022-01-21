import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './Post';
import { v4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  biography_en: string;

  @Column({ nullable: true })
  biography_pt: string;

  @Column({ type: 'boolean', default: false })
  authorized: boolean;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'boolean', default: false })
  root: boolean;

  @Column({ nullable: true })
  secret: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.author_id)
  posts: Post[];

  constructor(
    props: Omit<
      User,
      | 'user_id'
      | 'avatar'
      | 'biography_en'
      | 'biography_pt'
      | 'authorized'
      | 'verified'
      | 'root'
      | 'secret'
      | 'created_at'
      | 'updated_at'
      | 'posts'
    >,
  ) {
    Object.assign(this, props);
    this.user_id = v4();
  }
}

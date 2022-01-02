import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'
import { v4 } from 'uuid'

@Entity('posts')
export class Post {

  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column({ type: 'uuid', name: 'author_id' })
  author_id!: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author?: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tags: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(props: Omit<Post, 'post_id' | 'created_at' | 'updated_at'>) {
    Object.assign(this, props);
    this.post_id = v4();
  }
}
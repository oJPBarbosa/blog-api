import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Post } from './Post'
import { v4 } from 'uuid'

@Entity('comments')
export class Comment {

  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column({ type: 'uuid', name: 'post_id' })
  post_id!: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  provider: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(props: Omit<Comment, 
    'comment_id' |
    'post' |
    'created_at' |
    'updated_at'>) {
    Object.assign(this, props);
    this.comment_id = v4();
  }
}
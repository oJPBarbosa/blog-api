import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { v4 } from 'uuid';

@Entity('posts')
export class Post {
  @PrimaryColumn('uuid')
  post_id: string;

  @Column('uuid')
  author_id: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'bigint', default: 0 })
  views: number;

  @Column()
  slug_en: string;

  @Column()
  slug_pt: string;

  @Column()
  title_en: string;

  @Column()
  title_pt: string;

  @Column()
  description_en: string;

  @Column()
  description_pt: string;

  @Column()
  tags_en: string;

  @Column()
  tags_pt: string;

  @Column()
  reading_time_en: string;

  @Column()
  reading_time_pt: string;

  @Column()
  content_en: string;

  @Column()
  content_pt: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  constructor(
    props: Omit<
      Post,
      'post_id' | 'author' | 'views' | 'created_at' | 'updated_at' | 'comments'
    >,
  ) {
    Object.assign(this, props);
    this.post_id = v4();
  }
}

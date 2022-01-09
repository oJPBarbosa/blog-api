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
  author: User;

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

  @UpdateDateColumn()
  updated_at: Date;

  constructor(props: Omit<Post,
    'post_id' |
    'author' |
    'created_at'|
    'updated_at'>) {
    Object.assign(this, props);
    this.post_id = v4();
  }
}
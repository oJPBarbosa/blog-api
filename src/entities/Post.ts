import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'
import { v4 } from 'uuid'

@Entity('posts')
export class Post {

  @PrimaryGeneratedColumn('uuid')
  public readonly post_id: string;

  @Column({ type: 'uuid', name: 'author_id' })
  public author_id!: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  public user?: User;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public tags: string;

  @Column()
  public content: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  constructor(props: Omit<Post, 'post_id' | 'created_at' | 'updated_at'>) {
    Object.assign(this, props);
    this.post_id = v4();
  }
}
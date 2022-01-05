import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class Posts1641411025126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {
          name: 'post_id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'author_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'title_en',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'title_pt',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'description_en',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'description_pt',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'tags_en',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'tags_pt',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'content_en',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'content_pt',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'votes',
          type: 'int',
          default: 0,
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'NOW()',
          isNullable: false,
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'NOW()',
          isNullable: false,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
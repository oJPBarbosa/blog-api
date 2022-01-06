import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Users1641430663030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false,
          isPrimary: true,
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'avatar',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'biography_pt',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'biography_en',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'authorized',
          type: 'boolean',
          default: false,
          isNullable: false,
        },
        {
          name: 'verified',
          type: 'boolean',
          default: false,
          isNullable: false,
        },
        {
          name: 'root',
          type: 'boolean',
          default: false,
          isNullable: false,
        },
        {
          name: 'secret',
          type: 'varchar',
          isNullable: true,
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
    await queryRunner.dropTable('users');
  }
}

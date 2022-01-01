import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Users1641048817223 implements MigrationInterface {
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
        },
        {
          name: 'authorized',
          type: 'boolean',
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
    await queryRunner.dropTable('users');
  }
}

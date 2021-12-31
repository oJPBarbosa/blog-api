import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Users1640983926979 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
		await queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'user_id',
					type: 'uuid',
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
				},
				{
					name: 'updated_at',
					type: 'timestamp',
					default: 'NOW()',
				},
			],
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Users1640911610252 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'id',
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
			],
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}

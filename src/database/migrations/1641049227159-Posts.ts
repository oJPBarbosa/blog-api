import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class Posts1641049227159 implements MigrationInterface {
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
					isUnique: true,

				},
				{
					name: 'title',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'description',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'tags',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'content',
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

		await queryRunner.createForeignKey('posts', new TableForeignKey({
			columnNames: [
				'author_id'
			],
			referencedColumnNames: [
				'user_id'
			],
			referencedTableName: 'users',
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('posts');
	}
}

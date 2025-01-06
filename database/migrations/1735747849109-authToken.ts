import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AuthToken1735747849109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'token',
            type: 'string',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'integer',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tokens',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}

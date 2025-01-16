import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Article1736180141483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'content',
            type: 'varchar',
            length: '65536',
            isNullable: false,
          },
          {
            name: 'image',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
  }
}

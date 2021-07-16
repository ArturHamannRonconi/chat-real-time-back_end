import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTokens1626284606835 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'token', type: 'varchar' },
          { name: 'expires_date', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' },
          { name: 'updated_at', type: 'timestamp', default: 'NOW()' }
        ],
        foreignKeys: [
          {
            name: 'fk_user_tokens_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.dropTable('user_tokens')
  }
}

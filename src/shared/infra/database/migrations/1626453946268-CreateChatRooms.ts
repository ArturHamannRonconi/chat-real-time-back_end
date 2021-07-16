import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateChatRooms1626453946268 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'chat_rooms',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'owner', type: 'uuid' },
          { name: 'chat_scope', type: 'enum', enum: ['public', 'private'], default: 'public' },
          { name: 'max_amount_users', type: 'int', default: 10 },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' }
        ],
        foreignKeys: [
          {
            name: 'fk_chat_rooms_user_id',
            columnNames: ['owner'],
            referencedTableName: 'users',
            referencedColumnNames: ['id']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.dropTable('chat_rooms')
  }
}

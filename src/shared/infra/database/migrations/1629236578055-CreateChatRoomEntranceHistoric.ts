import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateChatRoomEntranceHistoric1629236578055 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'chat_room_entrance_historic',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'chat_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'entry_date', type: 'timestamp', default: 'NOW()' },
          { name: 'departure_date', type: 'timestamp', isNullable: true }
        ],
        foreignKeys: [
          { 
            name: 'fk_chat_room_historic_chat_id',
            referencedTableName: 'chat_rooms',
            referencedColumnNames: ['id'],
            columnNames: ['chat_id']
          },
          { 
            name: 'fk_chat_room_historic_user_id',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.dropTable('chat_room_historic')
  }
}

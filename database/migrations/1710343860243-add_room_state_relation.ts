import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomStateRelation1710343860243 implements MigrationInterface {
    name = 'AddRoomStateRelation1710343860243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room_state\` (\`id\` varchar(36) NOT NULL, \`public\` tinyint NOT NULL DEFAULT 1, \`chat_active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`room_state\``);
    }

}

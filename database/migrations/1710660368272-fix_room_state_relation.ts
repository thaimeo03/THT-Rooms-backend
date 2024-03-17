import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRoomStateRelation1710660368272 implements MigrationInterface {
    name = 'FixRoomStateRelation1710660368272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_state\` ADD \`roomId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`room_state\` ADD UNIQUE INDEX \`IDX_fc14b20fddda61822081c83d8a\` (\`roomId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fc14b20fddda61822081c83d8a\` ON \`room_state\` (\`roomId\`)`);
        await queryRunner.query(`ALTER TABLE \`room_state\` ADD CONSTRAINT \`FK_fc14b20fddda61822081c83d8aa\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_state\` DROP FOREIGN KEY \`FK_fc14b20fddda61822081c83d8aa\``);
        await queryRunner.query(`DROP INDEX \`REL_fc14b20fddda61822081c83d8a\` ON \`room_state\``);
        await queryRunner.query(`ALTER TABLE \`room_state\` DROP INDEX \`IDX_fc14b20fddda61822081c83d8a\``);
        await queryRunner.query(`ALTER TABLE \`room_state\` DROP COLUMN \`roomId\``);
    }

}

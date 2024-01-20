import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRoomTable1705722184165 implements MigrationInterface {
    name = 'FixRoomTable1705722184165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` CHANGE \`username\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room\` CHANGE \`name\` \`username\` varchar(255) NOT NULL`);
    }

}

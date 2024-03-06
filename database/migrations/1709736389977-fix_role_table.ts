import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRoleTable1709736389977 implements MigrationInterface {
    name = 'FixRoleTable1709736389977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`room_id\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`room_id\``);
    }

}

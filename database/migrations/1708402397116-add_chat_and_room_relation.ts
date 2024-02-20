import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatAndRoomRelation1708402397116 implements MigrationInterface {
    name = 'AddChatAndRoomRelation1708402397116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD CONSTRAINT \`FK_52af74c7484586ef4bdfd8e4dbb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_52af74c7484586ef4bdfd8e4dbb\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`userId\``);
    }

}

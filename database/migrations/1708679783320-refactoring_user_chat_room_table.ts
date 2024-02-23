import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactoringUserChatRoomTable1708679783320 implements MigrationInterface {
    name = 'RefactoringUserChatRoomTable1708679783320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`roomId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD CONSTRAINT \`FK_873f1938e2afb7758cf302a58af\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_873f1938e2afb7758cf302a58af\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`roomId\``);
    }

}

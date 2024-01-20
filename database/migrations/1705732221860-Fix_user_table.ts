import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserTable1705732221860 implements MigrationInterface {
    name = 'FixUserTable1705732221860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9a5b6e98e76999b2c6778a30eec\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9a5b6e98e76999b2c6778a30eec\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9a5b6e98e76999b2c6778a30eec\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9a5b6e98e76999b2c6778a30eec\` FOREIGN KEY (\`roomId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

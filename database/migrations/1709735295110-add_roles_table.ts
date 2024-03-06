import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesTable1709735295110 implements MigrationInterface {
    name = 'AddRolesTable1709735295110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`name\` enum ('USER', 'HOST', 'BANNED') NOT NULL DEFAULT 'USER', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD CONSTRAINT \`FK_3e02d32dd4707c91433de0390ea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP FOREIGN KEY \`FK_3e02d32dd4707c91433de0390ea\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'HOST', 'BANNED') NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}

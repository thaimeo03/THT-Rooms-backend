import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomTable1705674447779 implements MigrationInterface {
    name = 'AddRoomTable1705674447779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`host_user_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roomId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9a5b6e98e76999b2c6778a30eec\` FOREIGN KEY (\`roomId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9a5b6e98e76999b2c6778a30eec\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`DROP TABLE \`room\``);
    }

}

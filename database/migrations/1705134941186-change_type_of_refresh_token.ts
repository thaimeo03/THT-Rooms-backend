import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeOfRefreshToken1705134941186 implements MigrationInterface {
    name = 'ChangeTypeOfRefreshToken1705134941186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a2deb244eda661a007db72f0db\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a2deb244eda661a007db72f0db\` ON \`user\` (\`refresh_token\`)`);
    }

}

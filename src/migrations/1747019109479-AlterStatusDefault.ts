import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterStatusDefault1747019109479 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE tb_usuario ADD CONSTRAINT DF_tb_usuario_status_id DEFAULT 0 FOR status_id;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE tb_usuario DROP CONSTRAINT DF_tb_usuario_status_id;
        `);
    }
}
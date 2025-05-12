import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1747016395701 implements MigrationInterface {
    name = 'Default1747016395701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "transfer_control.dbo.tb_usuario.nm_usuario", "nm_usu"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "transfer_control.dbo.tb_usuario.nm_usu", "nm_usuario"`);
    }

}

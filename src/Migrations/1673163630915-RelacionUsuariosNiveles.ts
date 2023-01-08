import { MigrationInterface, QueryRunner } from "typeorm"

export class RelacionUsuariosNiveles1673163630915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Usuarios ADD nivel INTEGER DEFAULT 1 REFERENCES niveles(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE Usuarios DROP COLUMN nivel;`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm"

export class Usuarios1673163108620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE Usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName NOT NULL TEXT,
            email NOT NULL TEXT UNIQUE,
            password NOT NULL TEXT,
            avatar NOT NULL TEXT,
            exp INTEGER DEFAULT 0,
            status BOOLEAN NOT NULL DEFAULT TRUE,
        );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE Usuarios;`);
    }

}

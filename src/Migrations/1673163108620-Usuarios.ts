import { MigrationInterface, QueryRunner } from "typeorm"

export class Usuarios1673163108620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE Usuarios (
            id SERIAL PRIMARY KEY,
            userName text NOT NULL,
            email text NOT NULL UNIQUE,
            password text NOT NULL,
            avatar text NOT NULL,
            exp integer DEFAULT 0,
            status integer NOT NULL DEFAULT 1,
        );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE Usuarios;`);
    }

}

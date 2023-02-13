# rif

MIGRACIONES
npm run typeorm ./src/migrations/<MIGRACION>   



DB POSTGRES
docker run --name rif -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -e POSTGRES_DB=rif -d postgres

DB Tables Gen
nodemon .\src\Migrations\MigrationsTables.ts

DB models
npx typeorm-model-generator -h localhost -p 5432 -d rif -u root -x 'root' -e postgres -o ./src

DB Foregin Keys Get
nodemon .\src\Migrations\MigrationsForeginKeys.ts

 SEEDERS
nodemon .\src\seeders\DefaultSeeder.ts

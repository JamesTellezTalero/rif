# rif
ROAD TO RUN

1ST
DB POSTGRES
docker run --name rif -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -e POSTGRES_DB=rif -d postgres

2ND
DB Tables Gen
nodemon .\src\Migrations\MigrationsTables.ts

3TH
DB models
npx typeorm-model-generator -h localhost -p 5432 -d rif -u root -x 'root' -e postgres -o ./src

4TH
DB Foregin Keys Get
nodemon .\src\Migrations\MigrationsForeginKeys.ts

5TH
DB models
npx typeorm-model-generator -h localhost -p 5432 -d rif -u root -x 'root' -e postgres -o ./src

6TH
 SEEDERS
nodemon .\src\seeders\DefaultSeeder.ts

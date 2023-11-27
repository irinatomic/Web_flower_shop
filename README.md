## Cvećara

Irina Tomic RN 72/2022

Grupa 205 (Igor Ciganovic)

### Running the app
From the api_servis and app_servis folders run <br>
```npm install``` <br>
```node app```

### Deploying the database
Database schema can be seen in [database.sql](api_servis/database/database.sql).

From the api_servis run <br>
```sequelize db:migrate``` <br>
```sequelize db:seed:all```

If you wish to delete the tables run <br>
```sequelize db:migrate:undo:all```
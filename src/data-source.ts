import { DataSource, DataSourceOptions } from 'typeorm'
require('dotenv').config()

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.RDS_HOSTNAME,
    port: parseInt(<string>process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    // entities: [__dirname + './db/entities/*.entity{.ts,.js}'], //__dirname + '/**/*.entity{.ts,.js}'],
    // migrations: [__dirname + '/./db/migrations/*{.ts}'],
    logging: true,
    synchronize: true
    // migrationsTableName: 'history'
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource

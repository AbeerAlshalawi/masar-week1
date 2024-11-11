import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'postgres',
  // entities: [Episode],
  //   autoLoadEntities: true,
  "synchronize": true,  // Enable auto sync (for development)
  "logging": true,  
  migrations: ['src/migration/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
};


const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;

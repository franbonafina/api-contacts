import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'sqlite',
  database: './database/contact-list.db',
  synchronize: false,
  entities: [],
  migrations: [],
});

export default dataSource;

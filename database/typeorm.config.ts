import { DataSource } from 'typeorm';
import { ApiContacts1720261548485 } from './migrations/1720261548485-api-contacts';

const dataSource = new DataSource({
  type: 'sqlite',
  database: './database/contact-list.db',
  synchronize: false,
  entities: [],
  migrations: [ApiContacts1720261548485],
});

export default dataSource;

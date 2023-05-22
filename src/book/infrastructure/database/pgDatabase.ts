import { Pool } from 'pg';
import dbConfig from './dbConfig';

const pool = new Pool(dbConfig);

export default pool;
// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   password: '203440',
//   host: 'localhost',
//   port: 5432,
//   database: 'libreria',
// });

// export default pool;

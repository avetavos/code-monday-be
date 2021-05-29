import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_POST!, 10),
  database: process.env.DB_NAME,
  sync: {
    force: true
  },
});

export default sequelize;
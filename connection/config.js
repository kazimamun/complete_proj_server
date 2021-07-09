const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'sql6.freesqldatabase.com',
    user: env.DB_USER || 'sql6423865',
    password: env.DB_PASSWORD || 'KyN3JI5WNN',
    database: env.DB_NAME || 'sql6423865',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;
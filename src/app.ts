import { DB } from './lib/model/db';

// build db connections when starting APP
export = app => {
  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...');

    await DB.initDB(app.config.sequelize);
    if (process.env.NODE_ENV === 'create-db') { await DB.sequelize.sync({ force: true }); }
    console.log('✅  Your awesome APP launched');
  });
};

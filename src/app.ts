import { DB } from './lib/model/db';

// build db connections when starting APP
export = (app) => {
    app.beforeStart(async () => {
        console.log('🚀 Your awesome APP is launching...');

        try {
            await DB.initDB(app.config.sequelize);
        } catch (ex) {
            console.error('db init error');
        }
        console.log('✅  Your awesome APP launched');
    });
};

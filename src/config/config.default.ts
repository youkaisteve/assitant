import * as path from 'path';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

const nunjucks = require('nunjucks');

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1579685299925_143';

    // add your config here
    config.middleware = ['errorHandler'];

    config.errorHandler = {
        match: '/',
    };

    config.customLogger = {
        bizLogger: {
            file: path.join(appInfo.root, 'logs/biz.log'),
        },
    };

    config.security = {
        csrf: {
            enable: false,
        },
    };

    config.view = {
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.nj',
    };

    config.session = {
        key: 'assitant',
        maxAge: 1000 * 30,
    };

    config.sequelize = {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '111111',
        database: 'midway',
        dialect: 'mysql',
    };

    config.biz = {
        appName: 'tutorial',
    };

    config.multipart = {
        mode: 'file',
    };

    nunjucks.configure('/views');
    nunjucks.configure({ noCache: true });

    return config;
};

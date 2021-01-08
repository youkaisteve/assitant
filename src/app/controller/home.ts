import { Context, inject, controller, provide, get, config } from 'midway';
import { IEventService } from '../../interface';
const fs = require('fs');

@provide()
@controller('/')
export class HomeController {
    @inject()
    ctx: Context;

    @inject()
    eventService: IEventService;

    @config('biz')
    biz;

    @get('/')
    async index() {
        await this.ctx.render('home/index.nj', { name: '日常助手' });
    }

    @get('/bigscreen/download')
    async download() {
        this.ctx.set({
            'Content-Disposition': `attachment; filename=${encodeURI('正式环境数据状态')}.jpg`,
        });
        this.ctx.body = fs.createReadStream('/Users/steve.k.you/ibuild/tmp/正式环境数据状态.jpg');
    }
}

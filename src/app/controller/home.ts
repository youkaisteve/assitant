import { Context, inject, controller, provide, get, post, config } from 'midway';
import { IEventService } from '../../interface';
const fs = require('fs');
const path = require('path');
const images = require('images');

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

    @post('/bigscreen/imagesplit')
    async imagesplit() {
        let downloadFile;
        try {
            for (const file of this.ctx.request.files) {
                console.log('field: ' + file.field);
                console.log('filename: ' + file.filename);
                console.log('encoding: ' + file.encoding);
                console.log('mime: ' + file.mime);
                console.log('tmp filepath: ' + file.filepath);
                downloadFile = file.filepath;
            }

            const fileName = path.basename(downloadFile);
            const extension = path.extname(downloadFile);
            this.ctx.set({
                'Content-Disposition': `attachment; filename=${encodeURI(fileName.replace(extension, '-s.jpg'))}`,
            });
            this.ctx.body = images(downloadFile).size(256);
        } finally {
            // 需要删除临时文件
            await this.ctx.cleanupRequestFiles();
        }
    }

    @get('/bigscreen/download')
    async download() {
        this.ctx.set({
            'Content-Disposition': `attachment; filename=${encodeURI('正式环境数据状态')}.jpg`,
        });
        this.ctx.body = fs.createReadStream('/Users/steve.k.you/ibuild/tmp/正式环境数据状态.jpg');
    }
}

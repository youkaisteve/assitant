import { Context, inject, controller, provide, get, post, config } from 'midway';
import { v4 as uuidv4 } from 'uuid';

const fs = require('fs');
const path = require('path');
const images = require('images');
const archiver = require('archiver');

@provide()
@controller('/bigscreen')
export class BigScreenController {
    @inject()
    ctx: Context;
    @config('biz')
    biz;

    @get('/')
    async index() {
        await this.ctx.render('bigscreen/index.nj');
    }

    @post('/imagesplit')
    async imagesplit() {
        const tempFile = path.resolve(this.biz.tempPath, uuidv4() + '.zip');
        const createdFiles: string[] = await this.zipFiles(this.ctx.request.files, tempFile);
        try {
            this.ctx.set({
                'Content-Disposition': `attachment; filename=${encodeURI('转换后的文件.zip')}`,
            });
            const readStream = fs.createReadStream(tempFile);
            readStream.on('end', () => {
                fs.unlinkSync(tempFile);
            });
            this.ctx.body = readStream;
        } finally {
            this.ctx.cleanupRequestFiles();
            for (const file of createdFiles) {
                fs.unlinkSync(file);
            }
        }
    }
    async zipFiles(sourceFiles, zipFile): Promise<string[]> {
        const createdFiles: string[] = [];
        return new Promise((resolve, reject) => {
            const archive = archiver('zip');
            var output = fs.createWriteStream(zipFile);

            output.on('close', () => {
                resolve(createdFiles);
            });

            output.on('error', (err) => {
                reject(err);
            });

            for (const file of sourceFiles) {
                const fileName = path.basename(file.filename);
                const extension = path.extname(fileName);
                const tmpFileLarge = path.resolve(this.biz.tempPath, fileName.replace(extension, '-l.jpg'));
                const tmpFileSmall = path.resolve(this.biz.tempPath, fileName.replace(extension, '-s.jpg'));
                images(file.filepath).size(256).save(tmpFileSmall);
                archive.file(file.filepath, { name: path.basename(tmpFileLarge) });
                archive.file(tmpFileSmall, { name: path.basename(tmpFileSmall) });
                createdFiles.push(tmpFileSmall);
            }

            archive.pipe(output);
            archive.finalize();
        });
    }
}

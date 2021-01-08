import { Context, inject, controller, provide, get, post, config } from 'midway';
const { Readable } = require('stream');
const XLSX = require('xlsx');

@provide()
@controller('/excel')
export class ExcelController {
    @inject()
    ctx: Context;
    @config('biz')
    biz;

    @get('/')
    async index() {
        await this.ctx.render('excel/index.nj');
    }

    @post('/template')
    async template() {
        const templateStr = this.ctx.request.body.template;
        let placeholders = templateStr.match(/\#\{.*?\}/gim);
        // 去重
        placeholders = placeholders.filter((a, index) => placeholders.indexOf(a) === index);
        const workbook = XLSX.readFile(this.ctx.request.files[0].filepath);
        const orgs = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        const strList: string[] = [];
        for (const org of orgs) {
            let innerStr = templateStr.replace(/\s+/g, ' ');
            for (const placeholder of placeholders) {
                const fieldName = placeholder.replace('#{', '').replace('}', '');
                const regExp = new RegExp(placeholder, 'g');
                innerStr = innerStr.replace(regExp, `'${org[fieldName].trim()}'`);
            }
            strList.push(innerStr);
        }
        this.ctx.set({
            'Content-Disposition': `attachment; filename=${encodeURI('输出结果.txt')}`,
        });
        this.ctx.body = Readable.from(strList.join('\n'));
    }
}

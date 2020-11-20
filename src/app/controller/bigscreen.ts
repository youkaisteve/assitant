import { Context, inject, controller, provide, get } from 'midway';

@provide()
@controller('/bigscreen')
export class BigScreenController {
    @inject()
    ctx: Context;

    @get('/')
    async index() {
        await this.ctx.render('bigscreen/index.nj');
    }
}

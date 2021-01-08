import { CreateOptions } from 'sequelize/types/lib/model';
import { EventModel } from './lib/model/event';
export interface IEventService {
    add(values: object[], options?: CreateOptions & { returning: false }): Promise<void>;
    list(): Promise<EventModel[]>;
}
export interface EventEntity {
    id: number;
    eventName: string;
    eventContent?: string;
    eventTime: Date;
}

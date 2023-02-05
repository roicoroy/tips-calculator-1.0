import { IHours } from './hours.interface';
import { IPoint } from './point.interface';
import { IWaiter } from './waiters.interface';

export class Waiter implements IWaiter {
    id?: number | any;
    name?: string | any;
    pointsList?: IPoint[] | any;
    totalPoints?: number | any;
    hours?: number | any;
    tipsShare?: number | any;
    avatar?: string | any;

    constructor(waiter: IWaiter) {
        this.id = waiter?.id;
        this.name = waiter.name;
        this.pointsList = waiter.pointsList;
        this.totalPoints = waiter.totalPoints;
        this.hours = waiter.hours;
        this.tipsShare = waiter.tipsShare;
        this.avatar = waiter.avatar;
    }
}

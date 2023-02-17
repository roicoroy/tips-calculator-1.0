/* eslint-disable @typescript-eslint/no-namespace */
import { Point } from 'src/app/models';

export namespace PointActions {

    export class AddPoint {
        static readonly type = '[Point] Add Point';
        constructor(public payload: Point) {
        }
    }
    export class GetPoints {
        static readonly type = '[Point] Get Point';
    }
    export class UpdatePoint {
        static readonly type = '[Point] Update Point';
        constructor(public payload: Point, public id: string | any) {
        }
    }
    export class DeletePoint {
        static readonly type = '[Point] Delete Point';
        constructor(public point: Point) {
        }
    }
    export class SetSelectedPoint {
        static readonly type = '[Point] Set Point';
        constructor(public payload: Point[]) {
        }
    }
}

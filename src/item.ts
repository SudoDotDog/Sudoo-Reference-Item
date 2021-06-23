/**
 * @author WMXPY
 * @namespace ReferenceItem
 * @description Item
 */

export class ReferenceItem<T extends any = any> {

    public static create<T extends any = any>(initial?: T): ReferenceItem<T> {

        return new ReferenceItem<T>(initial);
    }

    private _item?: T;

    private constructor(initial?: T) {

        this._item = initial;
    }
}

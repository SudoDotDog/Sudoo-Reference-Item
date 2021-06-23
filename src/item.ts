/**
 * @author WMXPY
 * @namespace ReferenceItem
 * @description Item
 */

import { EmptyItemSymbol } from "./symbol";

export class ReferenceItem<T extends any = any> {

    public static create<T extends any = any>(initial?: T): ReferenceItem<T> {

        return new ReferenceItem<T>(initial);
    }

    private _item?: T | typeof EmptyItemSymbol;

    private constructor(initial?: T) {

        this._item = initial;
    }

    public addFulfiller(): this {

        return this;
    }

    public getItemOrDefault(defaultItem: T): T {

        if (this._item === EmptyItemSymbol) {
            return defaultItem;
        }
        return this._item;
    }

    public getItemOrUndefined(): T | undefined {

        if (this._item === EmptyItemSymbol) {
            return undefined;
        }
        return this._item;
    }

    public getItemOrNull(): T | null {

        if (this._item === EmptyItemSymbol) {
            return null;
        }
        return this._item;
    }
}

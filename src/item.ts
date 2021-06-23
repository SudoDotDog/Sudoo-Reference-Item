/**
 * @author WMXPY
 * @namespace ReferenceItem
 * @description Item
 */

import { ReferenceItemFulfiller } from "./fulfiller";
import { EmptyItemSymbol } from "./symbol";

export class ReferenceItem<T extends any = any> {

    public static create<T extends any = any>(): ReferenceItem<T> {

        return new ReferenceItem<T>();
    }

    private _item: T | typeof EmptyItemSymbol;

    private readonly _fulfillers: Array<ReferenceItemFulfiller<T>>;
    private _fulfilled: boolean;

    private constructor() {

        this._item = EmptyItemSymbol;

        this._fulfillers = [];
        this._fulfilled = false;
    }

    public fulfillWith(fulfiller: ReferenceItemFulfiller<T>): this {

        this._fulfillers.push(fulfiller);
        return this;
    }

    public ensureItemOrDefault(defaultItem: T): T {

        if (this._item === EmptyItemSymbol) {
            return defaultItem;
        }
        return this._item;
    }

    public ensureItemOrUndefined(): T | undefined {

        if (this._item === EmptyItemSymbol) {
            return undefined;
        }
        return this._item;
    }

    public ensureItemOrNull(): T | null {

        if (this._item === EmptyItemSymbol) {
            return null;
        }
        return this._item;
    }

    public async getItemOrDefault(defaultItem: T): Promise<T> {

        await this.fulfillItem();
        if (this._item === EmptyItemSymbol) {
            return defaultItem;
        }
        return this._item;
    }

    public async getItemOrUndefined(): Promise<T | undefined> {

        await this.fulfillItem();
        if (this._item === EmptyItemSymbol) {
            return undefined;
        }
        return this._item;
    }

    public async getItemOrNull(): Promise<T | null> {

        await this.fulfillItem();
        if (this._item === EmptyItemSymbol) {
            return null;
        }
        return this._item;
    }

    public async fulfillItem(): Promise<void> {

        if (this._fulfilled) {
            return;
        }

        fulfillers: for (const fulfiller of this._fulfillers) {

            const shouldUse: boolean = await fulfiller.shouldFulfillWith();

            if (shouldUse) {

                this._item = await fulfiller.execute();
                break fulfillers;
            }
        }

        this._fulfilled = true;
        return;
    }
}

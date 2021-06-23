/**
 * @author WMXPY
 * @namespace ReferenceItem
 * @description Fulfiller
 */

export type FulfillItemFulfillFunction<T> = () => T | Promise<T>;
export type FulfillItemVerifyFunction = () => boolean | Promise<boolean>;

export class ReferenceItemFulfiller<T extends any = any> {

    public static create<T extends any = any>(fulfiller: FulfillItemFulfillFunction<T>): ReferenceItemFulfiller<T> {

        return new ReferenceItemFulfiller(fulfiller);
    }

    private readonly _fulfiller: FulfillItemFulfillFunction<T>;
    private _verifier?: FulfillItemVerifyFunction;

    private constructor(fulfiller: FulfillItemFulfillFunction<T>) {

        this._fulfiller = fulfiller;
    }

    public withVerify(verifier: FulfillItemVerifyFunction): this {

        this._verifier = verifier;
        return this;
    }

    public async shouldFulfillWith(): Promise<boolean> {

        if (typeof this._verifier !== 'function') {
            return true;
        }

        const verifyResult: boolean = await Promise.resolve(this._verifier());
        return Boolean(verifyResult);
    }

    public async execute(): Promise<T> {

        const result: T = await Promise.resolve(this._fulfiller());
        return result;
    }
}

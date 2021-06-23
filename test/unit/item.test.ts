/**
 * @author WMXPY
 * @namespace ReferenceItem
 * @description Placeholder
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { ReferenceItem, ReferenceItemFulfiller } from "../../src";

describe('Given {ReferenceItem} Class', (): void => {

    const chance: Chance.Chance = new Chance('reference-item-item');

    it('should be able to get empty item', (): void => {

        const item: ReferenceItem = ReferenceItem.create();

        expect(item.ensureItemOrNull()).to.be.equal(null);
    });

    it('should be able to fulfill item', async (): Promise<void> => {

        const value: string = chance.string();

        const item: ReferenceItem = ReferenceItem.create();
        item.fulfillWith(ReferenceItemFulfiller.create(() => {
            return value;
        }));

        await item.fulfillItem();

        expect(await item.getItemOrNull()).to.be.equal(value);
    });

    it('should be able to fulfilled item before head', async (): Promise<void> => {

        const value: string = chance.string();

        const item: ReferenceItem = ReferenceItem.create();
        item.fulfillWith(ReferenceItemFulfiller.create(() => {
            return value;
        }));

        await item.fulfillItem();

        expect(item.ensureItemOrNull()).to.be.equal(value);
    });

    it('should be able to skip fulfilled item', async (): Promise<void> => {

        const value: string = chance.string();

        const item: ReferenceItem = ReferenceItem.create();
        item.fulfillWith(ReferenceItemFulfiller.create(() => {
            return value;
        }));

        expect(item.ensureItemOrNull()).to.be.equal(null);
    });
});

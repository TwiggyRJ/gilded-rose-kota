import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it("Brie should age", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Aged Brie");
        gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(1);
        expect(items[0].quality).toEqual(1);
    });

});
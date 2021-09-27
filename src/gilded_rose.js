export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const maxQuality = 50;
const minQuality = 0;
const qualityStep = 1;
const sellInStep = 1;
  
export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  getTicketsQualityMultiplier(sellIn) {
    if (sellIn <= 5) {
      return 3;
    } else if (sellIn <= 10) {
      return 2;
    }

    return qualityStep;
  }
  getItemsQualityMultiplier(sellIn) {
    if (sellIn < 0) {
      return qualityStep * 2;
    }

    return qualityStep;
  }
  getQuality(quality) {
    if (quality > maxQuality) {
      return maxQuality;
    } else if (quality < minQuality) {
      return minQuality;
    }

    return quality;
  }
  updateQuality() {
    const updatedItems = this.items.map((item) => {
      const updatedItem = Object.assign({}, item);

      if (item.name === 'Aged Brie') {
        // handles cheese step sellIn - step, quality + step

        updatedItem.sellIn = updatedItem.sellIn - sellInStep;
        if (item.quality < maxQuality) {
          const quality = updatedItem.quality + qualityStep;
          updatedItem.quality = this.getQuality(quality);
        }
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        // handles lengendary use case - no changes

      } else if (item.name.toLowerCase().includes('backstage passes')) {
        // handles passes
        updatedItem.sellIn = updatedItem.sellIn - sellInStep;
        if (item.quality < maxQuality) {
          const qualityMultiplier = this.getTicketsQualityMultiplier(item.sellIn);
          const quality = item.sellIn <= 0 ? 0 : item.quality + qualityMultiplier;

          updatedItem.quality = this.getQuality(quality); 
        }
      } else if (item.name.toLowerCase().includes('conjured')) {
        // handles conjured items
        const baseMultiplier = qualityStep * 2;

        updatedItem.sellIn = updatedItem.sellIn - sellInStep;
        if (item.quality > minQuality) {
          const step = this.getItemsQualityMultiplier(item.sellIn);
          const quality = item.quality - step * baseMultiplier;
          updatedItem.quality = this.getQuality(quality);
        }
      } else {
        // handles everything else

        updatedItem.sellIn = updatedItem.sellIn - sellInStep;
        if (item.quality > minQuality) {
          const step = this.getItemsQualityMultiplier(item.sellIn);
          const quality = item.quality - step;
          updatedItem.quality = this.getQuality(quality);
        }
      }

      return updatedItem;
    });

    this.items = updatedItems;
    return this.items;
  }
}
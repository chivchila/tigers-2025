import { Injectable } from '@nestjs/common';
import { Cat, Greeting } from '../../../shared/types';
import { DBService } from '../db-service/index';
import { priceMapping, freeGiftThreshold } from '../consts';

@Injectable()
export class DataService {
    constructor(private readonly dbService: DBService) {}

    getYourNextDeliveryMesgById(userId: string): Greeting | undefined {
        let customer = this.dbService.getCustomerById(userId);
        if (!customer) {
            return undefined;
        }
        let activeCats = customer.cats.filter(cat => cat.subscriptionActive);
        let catNames = this.formatCatNames(activeCats);
        let totalPrice = this.calculateTotalPrice(activeCats);

        let greeting: Greeting = {
            "title": `Your next delivery for ${catNames}`,
            "message": `Hey ${customer.firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
            "totalPrice": totalPrice,
            "freeGift": totalPrice > freeGiftThreshold ? true : false 
        };
        return greeting;
    }

    formatCatNames(cats: Cat[]): string {
        if (!cats || cats.length === 0) return "";
        const catNames = cats.map(cat => cat.name);
        if (catNames.length === 1) return catNames[0]; // Only one cat
        if (catNames.length === 2) return catNames.join(' and '); // Two cats, joined with "and"
        return `${catNames.slice(0, -1).join(', ')} and ${catNames[catNames.length - 1]}`; // More than two cats
    }

    calculateTotalPrice(cats: Cat[]): number {
        let total = 0;
        cats.forEach(cat => {
            total += priceMapping[cat.pouchSize];
        });
        return total;
    }   
}


import { PriceReduction } from './price-reduction';
import { User } from './user';
import { Supplier } from './supplier';
import { EnumProductState } from '../enums/enum-product-state.enum';

export class Product {
    id: Number;
    code: String;
    description: String;
    creationDate: Date;
    price: Number;
    priceReductions: PriceReduction[];
    state: EnumProductState;
    creator: User;
    suppliers: Supplier[];
}

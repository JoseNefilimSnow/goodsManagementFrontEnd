import { User } from './user';
import { Product } from './product';

export class Report {
    id: Number;
    reason: String;
    creator: User;
    productCode: String;
}

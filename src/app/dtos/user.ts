import { EnumPermission } from '../enums/enum-permission.enum';

export class User {
    public id: Number;
    public username: String;
    public password: String;
    public permission: EnumPermission;
    public enabled: Boolean;
}

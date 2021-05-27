export class User {
    UserID : string;
    Email : string;
    Name : string;
    Password : string;
    ConfirmPassword : string;
    VehicleRegistration : string;
    RegistrationCountry : string;
    PhoneNumber : string;
    token?: string;
    ClaimDate : Date;
    //Roles : string;
    IsDeleted : boolean
}


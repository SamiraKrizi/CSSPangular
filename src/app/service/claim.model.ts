
enum FileType {
    PoliceReport,
    AccidentPhotos ,
    Invoices ,
    Other 
}
export class Claim {
    ClaimID : number;
    UserID : number;

    DocumentsID : number;
    File : File; 
    Type : String;
    Size : number

    otherPartyID : number;
    VehicleRegistration : String;
    DriverName : String;
    PolicyHolderName : string;
    RegistrationCountry : String;
    
    DetailsID : number;
    Location   : string;
    AccidentDate   : string;
    BodilyInjury  : string;
    Description  : string;

}

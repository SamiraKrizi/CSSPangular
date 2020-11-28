
/*enum FileType {
    PoliceReport,
    AccidentPhotos ,
    Invoices ,
    Other 
}*/

export class Claim {
    
    ClaimID : number;
    UserID : number = 1;
    ClaimDate : string;

     
    DetailsID : number;
    Location   : string;
    AccidentDate   : string;
    BodilyInjury  : string;
    Description  : string;

    DocumentsID : number;
    File : File; 
    Type : String;
    Size : number

    otherPartyID : number;
    DriverName : String;
    PolicyHolderName : string;
    RegistrationCountry : String;
    VehicleRegistration : String;


}

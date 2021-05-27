

export class Claim {
    
    ID : number;
    UserID : string;
    claimUploadedBy : string;
    claimUploadDate : string;
     
    Location  : string;
    AccidentDate   : string;
    BodilyInjury  : string;
    Description  : string;
  
    File : string; 
    Status: string;
    Reply : string;
    
    DriverName : string;
    PolicyHolderName : string;
    RegistrationCountry : string;
    VehicleRegistration : string;
    
}
//[formGroup]="editClaim" (ngSubmit)="onSubmit()"
//(click)="openToEdit(contentReply)"
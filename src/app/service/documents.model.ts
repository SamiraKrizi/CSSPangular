enum FileType {
    PoliceReport,
    AccidentPhotos ,
    InjuryReport,
    Invoices ,
    Other 
}
enum InjuryReportType
    {
        EngineersReport,
        MedicalReport 
    }
 enum InvoicesType
    {
        CarHireInvoice ,
        TowingInvoice ,
        RepairInvoice ,
        EngineersInvoice ,
        DoctorsInvoice ,
        OtherInvoice 
    }
enum OtherType 
    {
        AccidentReportForm ,
        AgreedStatementOfFacts ,
        InsuredStatement ,
        LegalDocuments ,
        RepairCompanyQuotation,
        ReleaseForm ,
        WitnessStatement ,
        Other
    }


export class Documents {
    DocumentsID : number;
    Type : String;
    File : File; 
    Size : number;
    ClaimId : number

}

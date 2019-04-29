

export class NewReturn { 
    location: string="Miyapur";
    billNo: string;
    regId:string
    paymentType: string="Cash";
    total?: number;
    refSalesReturns:SaleDetail[]=[];
}

export class SaleDetail { 
    billNo: string;
    paymentType:string
    batchNo?: string;
     NetAmount:number
    MedId:string
    medicineName: string;
    mrp?: number;
    discount:number;
    org_quantity?: number;
    quantity:number
    Paid:string
    amount:number
    constructor(
        billNo:string,MedId:string,MedName: string,mrp:number,org_quantity:number,Quantity: number,discount:number,Paid:string,amount:number,NetAmount: number,batchNo: string,paymentType:string) { 
        this.medicineName = MedName;
        this.paymentType=paymentType;
        this.mrp = +(mrp);
        this.batchNo= batchNo;
      this.billNo=billNo
      this.quantity = Quantity;
      this.org_quantity=org_quantity
       
        this.NetAmount = NetAmount;
      this.MedId=MedId;
      this.Paid=Paid
      this.discount=discount
      this.amount=amount
    }
}
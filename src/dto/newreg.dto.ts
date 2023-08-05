

export class VehicleDTO {
       registrationNo: string;
       ownerName: string;
       ownershipDetails: string;
       modelName: string;
       rcStatus: boolean;
       isCriminal :boolean;
       isStolen :boolean;
       registrationDate: Date;
       data: VehicleData;
  }
  
   export class VehicleData {
    
       vehicleClass: string;
       bodyType: string;
       fuelType: string;
       makerName: string;
       fuelNorms: string;
       engineNumber: string;
       chassisNumber: string;
       puccNo: string;
       color: string;
       insuranceCompany: string;
       financeBy: string;
       seatCapacity: string;
       unloadWeightValue: number;
  
  }
  
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export class VehicleDetails{
    @Prop()
    vehicleClass: string;
    @Prop()
    bodyType: string;
    @Prop()
    fuelType: string;
    @Prop()
    makerName: string;
    @Prop()
    fuelNorms: string;
    @Prop()
    engineNumber: string;
    @Prop()
    chassisNumber: string;
    @Prop()
    puccNo: string;
    @Prop()
    color: string;
    @Prop()
    insuranceCompany: string;
    @Prop()
    financeBy: string;
    @Prop()
    seatCapacity: string;
    @Prop()
    unloadWeightValue: number;
    
  
  }
  
  export class request {
    @Prop({ required: true,unique: true,}) 
    registrationNo: string;

    @Prop()
    cameraTagNo:string;

    @Prop()
    location: string[]
    

  }
  
  @Schema({})
  export class CameraInput
  {
     
      @Prop()
      request :request;
  
      @Prop()
      date: Date;
  
      @Prop()
      data : VehicleDetails;
  
      
  }
  
  
  export const CameraInputScehma = SchemaFactory.createForClass(CameraInput);
  export const CAMERAINPUT_MODEL = CameraInput.name;
  export type CameraInputDocument = CameraInput & Document;
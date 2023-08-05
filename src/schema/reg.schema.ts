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


@Schema({})
export class Registration
{
   
    @Prop({ required: true,unique: true,}) 
    registrationNo: string;

    @Prop()
    ownerName: string;

    @Prop()
    ownershipDetails: string;

    @Prop()
    modelName: string;

    @Prop()
    isCriminal :boolean;

    @Prop()
    isStolen :boolean;
  
    @Prop()
    rcStatus: boolean;

    @Prop()
    registrationDate: Date;

    @Prop()
    data : VehicleDetails;

    
}


export const RegistrationScehma = SchemaFactory.createForClass(Registration);
export const REGISTRATION_MODEL = Registration.name;
export type RegistrationDocument = Registration & Document;
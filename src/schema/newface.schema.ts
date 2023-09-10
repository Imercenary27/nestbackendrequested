import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { Date } from "mongoose";
@Schema({})
export class Facify{
    
    @Prop()
    recId :string;
    
    @Prop()
    criminalId :string;
    
    @Prop()
    recordName :string;
    
    @Prop()
    Department :string;
    @Prop()
    location :string[];

    
    @Prop()
    Message :string;



}


export const FacifyScehma = SchemaFactory.createForClass(Facify);
export const Facify_MODEL =Facify.name;
export type FacifyDocument = Facify & Document;
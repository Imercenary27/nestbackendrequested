import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class Fregis{

    @Prop()
    recId :string;
    
    @Prop()
    criminalId :string;
    
    @Prop()
    recordName :string;
    
    @Prop()
    Department :string;
}


export const FaceDataScehma = SchemaFactory.createForClass(Fregis);
export const FACEDATA_MODEL =Fregis.name;
export type FaceDataDocument = Fregis & Document;
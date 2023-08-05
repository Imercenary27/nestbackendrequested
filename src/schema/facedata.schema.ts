import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class FaceData{

    @Prop()
    recId :string;
    
    
    @Prop()
    criminalId :string;
    
    @Prop()
    recordName :string;
    
    @Prop()
    Department :string;
}


export const FaceDataScehma = SchemaFactory.createForClass(FaceData);
export const FACEDATA_MODEL = FaceData.name;
export type FaceDataDocument = FaceData & Document;
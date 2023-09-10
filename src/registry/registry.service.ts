import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RabbitMQService } from 'rabbitmq/rabbitmq';
import { REGISTRATION_MODEL, Registration, RegistrationDocument } from '../schema/reg.schema';
import { Model } from 'mongoose';
import { request } from 'http';
import { VehicleDTO, VehicleData } from '../dto/newreg.dto';
import { numberplate } from 'src/dto/numberplate.dto';
import { PythonRequestDto } from 'src/dto/pythonapi.dto';
import { CAMERAINPUT_MODEL, CameraInputDocument } from 'src/schema/camera.schema';
import { FACEDATA_MODEL, Fregis, FaceDataDocument } from 'src/schema/facedata.schema';
import { faceData } from 'src/dto/face.dto';
import { newfaceDto } from 'src/dto/newFace.dto';
import { Facify, FacifyDocument, Facify_MODEL } from 'src/schema/newface.schema';


@Injectable()
export class RegistryService {
  constructor(
    @InjectModel(REGISTRATION_MODEL) private readonly newModel: Model<RegistrationDocument>,
    @InjectModel(CAMERAINPUT_MODEL) private readonly camera: Model<CameraInputDocument>,
    @InjectModel(FACEDATA_MODEL) private readonly faceModel: Model<FaceDataDocument>,
    @InjectModel(Facify_MODEL) private readonly newFaceModel: Model<FacifyDocument>,

    private readonly rabbitMQService: RabbitMQService,
    
    ) {}

  async onApplicationBootstrap() {
    await this.rabbitMQService.listenToQueue('numberplaterec', (message) => {
      // Handle the received message  
      console.log('Registration Number :', message);
    });
  
  }

  async addNewDataToDatabase(request :VehicleDTO):Promise <Registration>{
    let today= new Date()
    let createPayload={
       registrationNo:request.registrationNo,
       ownerName:request.ownerName,
       ownershipDetails:request.ownershipDetails,
       modelName:request.modelName,
       rcStatus:request.rcStatus,
       isCriminal:request.isCriminal,
       isStolen:request.isStolen ,
       registrationDate: today,
       data:request.data 
    }
    return this.newModel.create(createPayload) 
  }

  async addNewFace(request :newfaceDto):Promise <Facify>{
    try {
      const today = new Date();
      const createPayload = {
          recId: request.recId,
          criminalId: request.criminalId,
          recordName: request.recordName,
          Department: request.Department,
          Message: "done"
      };
      
      const result = await this.newFaceModel.create(createPayload);
      return result;
  } catch (error) {
      console.error("Error while adding new face:", error);
      throw error; // Rethrow the error for higher-level handling
  }  }


  async findCarByNumber(request:numberplate){
   const details=this.newModel.findOne(request)
   return details;
  }
  

  async findRequestCarId(request:string){
    
    const details=await this.newModel.findOne({registrationNo:request})
    const requestload={
      request:{
        registrationNo: request,
        cameraTagNo: "r2",
        location: [
            "19.1545",
            "87.2134"
        ]
      },
      date:new Date(),data:details
    }

    await this.camera.create(requestload)
    return details;
    
  }
  async addNewFaceDb(){
    return this.newFaceModel.find()
  }
  async displayAllCars(){
    const displayAll=this.newModel.find()
    return displayAll;
  }

  async criminalDataSearch({rcStatus:boolean}){
    const criminal= this.newModel.find({rcStatus:false})
    return criminal;
  }
  async countFalseValues(): Promise<number> {
    const count = await this.newModel.countDocuments({ isCriminal: false }).exec();
    return count;
  }
  async counttrueValues(): Promise<number> {
    const count = await this.newModel.countDocuments({ rcStatus: true }).exec();
    return count;
  }

  async getStolenVehicle(): Promise<number>{
    const count = await this.newModel.countDocuments({isStolen:true}).exec();
    return count;
  }

  async findOneFromCameraInput(request :numberplate) {
    const lookfor = this.camera.findOne({registrationNo:request})
 
    return lookfor;
  }

  async justAddToDB(request:faceData):Promise<Fregis>{
    console.log(request.recId)
    const payload={
      recId :request.recId,
      criminalId:request.criminalId,
      recordName:request.recordName,
      Department : request.Department
    }
    return  this.faceModel.create(request) 
  }
  async getfromDBCamera(){
    const result= this.camera.find()
    return result
  }

}
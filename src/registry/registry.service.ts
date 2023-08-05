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
import { FACEDATA_MODEL, FaceData, FaceDataDocument } from 'src/schema/facedata.schema';
import { faceData } from 'src/dto/face.dto';


@Injectable()
export class RegistryService {
  constructor(
    @InjectModel(REGISTRATION_MODEL) private readonly newModel: Model<RegistrationDocument>,
    @InjectModel(CAMERAINPUT_MODEL) private readonly camera: Model<CameraInputDocument>,
    @InjectModel(FACEDATA_MODEL) private readonly face: Model<FaceDataDocument>,
    
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
  async displayAllCars(){
    const displayAll=this.newModel.find()
    return displayAll;
  }

  async criminalDataSearch({RCstatus:boolean}){
    const criminal= this.newModel.find({RCstatus:false})
    return criminal;
  }
  async countFalseValues(): Promise<number> {
    const count = await this.newModel.countDocuments({ isCriminal: false }).exec();
    return count;
  }
  async counttrueValues(): Promise<number> {
    const count = await this.newModel.countDocuments({ RCstatus: true }).exec();
    return count;
  }

  async getStolenVehicle(): Promise<number>{
    const count = await this.newModel.countDocuments({isStolen:true}).exec();
    return count;
  }

  async findOneFromCameraInput(request :numberplate) {
    const lookfor =await this.camera.findOne({registrationNo:request})
 
    return lookfor;
  }

  async justAddToDB(request:faceData):Promise<FaceData>{
    let today= new Date()
    const payload={
      recId :request.recId,
      criminalId:request.criminalId,
      recordName:request.recordName,
      Department : request.Department
    }
    const result =await this.face.create(request)
    
    return result ;
  }


}
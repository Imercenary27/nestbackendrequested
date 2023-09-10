import { Controller } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { Body,  Get, Inject, Post } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { numberplate } from '../dto/numberplate.dto';
import { VehicleDTO, VehicleData } from '../dto/newreg.dto';
import { request } from 'http';
import { Registration } from 'src/schema/reg.schema';
import { PythonRequestDto } from 'src/dto/pythonapi.dto';
import { combineLatest, map } from 'rxjs';
import { faceData } from 'src/dto/face.dto';
import { Fregis } from 'src/schema/facedata.schema';
import { newfaceDto } from 'src/dto/newFace.dto';
import { Facify } from 'src/schema/newface.schema';

@Controller('api')//changes made here 'registry'
export class RegistryController {


    constructor(private readonly service: RegistryService,
        @Inject('number_service') private readonly client :ClientProxy,
        
        ) {}
     
      
      @Post('/newregistration')
      async newvehicleregistration(@Body() request:VehicleDTO
       ): Promise<Registration>{
        return this.service.addNewDataToDatabase(request)
     
      }
      @Post('/newFace')
      async newFace(@Body() request:newfaceDto):Promise<Facify>{
        return this.service.addNewFace(request);
      }

      @Post('/newFaceDatabase')
      async newFaceDb( ){
        return this.service.addNewFaceDb();
      }
      
      

      @Post('/facerecog')
      async getdataintodb(@Body() request :faceData):Promise<Fregis>{
        console.log(request)
        const result =await this.service.justAddToDB(request)
        return result ;  
      }

      @Post('/findcar')
      findVehicle(@Body() request:numberplate){
        const findcar=this.service.findCarByNumber(request)
        return findcar;
      }

      @Post('/getAllDatabase')
      async findAll (@Body()request :any){
        const displayAll=this.service.displayAllCars()
        return displayAll;
      }

    

      @Post('/criminalDatabase')
      async findCriminal(@Body() rcStatus:boolean){
        const criminal =this.service.criminalDataSearch({rcStatus:false})
        return criminal;
      }
      @Get('/getnumbercriminal')
      async getCriminal(): Promise<number>{
        const getCriminal = this.service.countFalseValues();
        return getCriminal;
      }
      @Get('/getValid')
      async getValid(): Promise<number>{
        const gettrue = this.service.counttrueValues();
        return gettrue;
      }
      @Get('/getStolenCars')
      async getStolen(): Promise<number>{
        const gettrue = this.service.getStolenVehicle();
        return gettrue;
      }

      @Post('/vehicletracker')
      async trackvehicle(@Body() request:PythonRequestDto): Promise<any> {
        let requestnew=request.registrationNo
        const findcar=await this.service.findRequestCarId(requestnew)
        // return findcar;
        // console.log(findcar)
          
        
        return {request,date:new Date(), data:findcar};
       

      }

      @Post('/rabbitmqWithTagNum') /// code more here
      
      async getRabbitmqWithTagNum(){
        const addToDb= "hello";
        return addToDb;

      }

      @Post('/camerafindings')
      async getcamerasearch( request :numberplate){
        const search =await this.service.findOneFromCameraInput(request);
        return search;
      }

    
      
      @Post('/getDBCameraAll')
      async cameraAll(){
        return this.service.getfromDBCamera()
      }



    
      @EventPattern("vehicle_detected")
      getreply(){
        console.log("searching")
    
      }
    
      @MessagePattern({"event":"vehicle_detected"})
      getAttention(){
        console.log("Success")
      }
      
    
}

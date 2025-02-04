import { Controller, Get, Post, Delete, Query, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppServiceController, AppServiceControllerMethods, GetDataRequest, GetDataResponse, GetAllDataRequest, GetAllDataResponse, PostDataRequest, PostDataResponse, DeleteDataRequest, DeleteDataResponse } from './proto/generated/app';
import { AppService } from './app.service';
import { PostDataRequestDto } from './dto/post-data.dto';
import { validate } from 'class-validator';

@Controller('app')
@AppServiceControllerMethods()
export class AppController implements AppServiceController {
  constructor(private readonly appService: AppService) {}

  @Get('getData')
  getData(@Query() request: GetDataRequest): GetDataResponse {
    return this.appService.getData(request.id);
  }

  @Get('getAllData')
  getAllData(@Query() request: GetAllDataRequest): GetAllDataResponse {
    return this.appService.getAllData();
  }

  @Post('postData')
  @UsePipes(new ValidationPipe({ transform: true })) 
  async postData(@Body() request: PostDataRequestDto): Promise<PostDataResponse> {
    const errors = await validate(request);
    if (errors.length > 0) {
      throw new Error('Validation failed!');
    }
    return this.appService.postData(request.data);
  }

  @Delete('deleteData')
  deleteData(@Query() request: DeleteDataRequest): DeleteDataResponse {
    return this.appService.deleteData(request.id);
  }
}

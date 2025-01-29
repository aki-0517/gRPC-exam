import { Controller, Get, Post, Delete, Query, Body } from '@nestjs/common';
import { AppServiceController, AppServiceControllerMethods, GetDataRequest, GetDataResponse, GetAllDataRequest, GetAllDataResponse, PostDataRequest, PostDataResponse, DeleteDataRequest, DeleteDataResponse } from './proto/generated/app';
import { AppService } from './app.service';

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
  postData(@Body() request: PostDataRequest): PostDataResponse {
    return this.appService.postData(request.data);
  }

  @Delete('deleteData')
  deleteData(@Query() request: DeleteDataRequest): DeleteDataResponse {
    return this.appService.deleteData(request.id);
  }
}

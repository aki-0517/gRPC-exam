import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  async getData(@Body() body: { id: string }) {
    return this.appService.sendGrpcRequest('getData', { id: body.id });
  }

  @Post('data')
  async postData(@Body() body: { data: string }) {
    return this.appService.sendGrpcRequest('postData', { data: body.data });
  }
}

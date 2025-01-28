import { Injectable, Logger } from '@nestjs/common';
import { createPromiseClient } from '@connectrpc/connect';
import { createGrpcTransport } from '@connectrpc/connect-node';
import { AppService as GrpcAppService } from './proto/generated/app_connect';
import {
  GetDataRequest,
  GetDataResponse,
  PostDataRequest,
  PostDataResponse,
} from './proto/generated/app_pb';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private client: ReturnType<typeof createPromiseClient<typeof GrpcAppService>>;

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    try {
      const transport = createGrpcTransport({
        baseUrl: 'http://localhost:50051',
        httpVersion: '2',
      });
      this.client = createPromiseClient(GrpcAppService, transport);
    } catch (error) {
      this.logger.error('Failed to initialize gRPC client', error);
      throw new Error('gRPC client initialization failed');
    }
  }

  async sendGrpcRequest<T extends 'getData' | 'postData'>(
    method: T,
    data: T extends 'getData' ? GetDataRequest : PostDataRequest,
  ): Promise<T extends 'getData' ? GetDataResponse : PostDataResponse> {
    try {
      if (!this.client) {
        throw new Error('gRPC client not initialized');
      }

      if (method === 'getData') {
        const response = await this.client.getData(data as GetDataRequest);
        return response as T extends 'getData' ? GetDataResponse : PostDataResponse;
      } else {
        const response = await this.client.postData(data as PostDataRequest);
        return response as T extends 'getData' ? GetDataResponse : PostDataResponse;
      }
    } catch (error) {
      this.logger.error(`Error in ${method}:`, error);
      throw new Error(`gRPC ${method} request failed: ${error.message}`);
    }
  }
}

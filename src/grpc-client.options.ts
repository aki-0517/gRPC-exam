import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app', // protoで定義したpackage名
    protoPath: join(__dirname, './proto/app.proto'), // protoファイルのパス
  },
} as ClientOptions;

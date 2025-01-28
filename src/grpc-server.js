const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, './proto/app.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const appProto = grpc.loadPackageDefinition(packageDefinition).app;

const server = new grpc.Server();

server.addService(appProto.AppService.service, {
  GetData: (call, callback) => {
    const id = call.request.id;
    callback(null, { data: `Received ID: ${id}` });
  },
  PostData: (call, callback) => {
    const data = call.request.data;
    callback(null, { message: `Data saved: ${data}` });
  },
});

const PORT = 50051;
server.bindAsync(
  `localhost:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`gRPC server running on http://localhost:${PORT}`);
    server.start();
  },
);

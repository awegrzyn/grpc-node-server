const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./../proto/kv.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition).o2bookkeeping;

const options = {
  'grpc.max_connection_idle_ms': 86400000, // 12h, default 2h
  'grpc.max_receive_message_length': 1024 * 1024 * 10 // 10MB, default 64 MB
};

const server = new grpc.Server(options);
server.addService(proto.KeyValueService.service, {
  UpdateValues: (call, callback) => {
    console.log('UpdateValues', call.request.kv);
    callback();
  },
  UpdateValue: (call, callback) => {
    console.log('UpdateValue', call.request);
    callback();
  }
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server is running with options', options);
  server.start();
});

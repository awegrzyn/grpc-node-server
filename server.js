const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./kv.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition).o2bookkeeping;


const server = new grpc.Server();
server.addService(proto.KeyValueService.service, {
  UpdateValues: (call, response) => {
    console.log(call.request);
    response(null, null);
  }
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
	console.log("Server running");
	server.start();
});

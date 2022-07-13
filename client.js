const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./kv.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition).o2bookkeeping;

const client = new proto.KeyValueService('127.0.0.1:50051', grpc.credentials.createInsecure());

client.UpdateValues({kv: [{key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'}]}, (err, response) => {
 if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(response));
	}
});

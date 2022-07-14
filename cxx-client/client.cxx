#include <iostream>
#include <grpc++/grpc++.h>
#include "kv.grpc.pb.h"

using grpc::Channel;
using grpc::ClientContext;
using grpc::Status;

using o2bookkeeping::KeyValueService;
using o2bookkeeping::KeyValue;
using o2bookkeeping::Empty;

class BookkeepingClient {
 public:
  BookkeepingClient(std::shared_ptr<Channel> channel) : mStub(KeyValueService::NewStub(channel)) {}

  void updateValue(const KeyValue& kv) {
    Empty reply;
    ClientContext context;
    Status status = mStub->UpdateValue(&context, kv, &reply);
    if (status.ok()) {
      std::cout << "ok" << std::endl;
    } else {
      std::cout << status.error_code() << ": " << status.error_message() << std::endl;
    }
  }

 private:
  std::unique_ptr<KeyValueService::Stub> mStub;
};


int main(int argc, char** argv) {
  BookkeepingClient client(grpc::CreateChannel("127.0.0.1:50051", grpc::InsecureChannelCredentials()));
  KeyValue kv; 
  kv.set_key("key1");
  kv.set_value("val1");
  client.updateValue(kv);
  return 0;
}

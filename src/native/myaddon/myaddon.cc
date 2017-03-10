//hello.cc
#include <node.h>
#include <nan.h>

using namespace v8;


// #include <node.h>

// namespace demo {

// using v8::FunctionCallbackInfo;
// using v8::Isolate;
// using v8::Local;
// using v8::Object;
// using v8::String;
// using v8::Value;

NAN_METHOD(Print) {
  Nan::MaybeLocal<String> maybeString = Nan::To<String>(info[0]);
  if (maybeString.IsEmpty() == false) {
    Local<String> str = maybeString.ToLocalChecked();
    printf("%s\n", *String::Utf8Value(str));
  }
}

NAN_METHOD(Length) {
  Nan::MaybeLocal<String> mStr = Nan::To<String>(info[0]);
  if (!mStr.IsEmpty()) {
    Local<String> str = mStr.ToLocalChecked();
    int len = strlen(*String::Utf8Value(str));
    //printf("length: %d\n", len);

    Local<Number> length = Nan::New<Number>(len);
    info.GetReturnValue().Set(length);
  }
}

NAN_METHOD(Hello) {
  MaybeLocal<String> mMsg = Nan::New("Hello Native World!");
  Local<String> msg = mMsg.ToLocalChecked();

  info.GetReturnValue().Set(msg);
}

// void Method(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
// }

NAN_MODULE_INIT(Init) {
  Nan::Set(target, 
           Nan::New("print").ToLocalChecked(),
           Nan::GetFunction(Nan::New<FunctionTemplate>(Print)).ToLocalChecked());
  
  Nan::Set(target,
           Nan::New("length").ToLocalChecked(),
           Nan::GetFunction(Nan::New<FunctionTemplate>(Length)).ToLocalChecked());
  
  Nan::Set(target,
           Nan::New("hello").ToLocalChecked(),
           Nan::GetFunction(Nan::New<FunctionTemplate>(Hello)).ToLocalChecked());
}

// void Init(Local<Object> exports) {
//   NODE_SET_METHOD(exports, "hello", Method);
//}

NODE_MODULE(myaddon, Init)

//}  // namespace demo
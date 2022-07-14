#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RnContacts, NSObject)

RCT_EXTERN_METHOD(getAllContacts: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end

import Foundation
import Contacts

@objc(RnContacts)
class RnContacts: NSObject {
    struct Contact : Identifiable {
        var id = UUID()
        var firstName: String
        var lastName: String
        var phoneNumber: CNPhoneNumber?
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc(getAllContacts:withRejecter:)
    func getAllContacts(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        var contacts = [Contact]()
        let contactStore = CNContactStore()
        
        contactStore.requestAccess(for: .contacts) { (granted, error) in
            if (error != nil) {
                let error = NSError(domain: "error-failed-request", code: 200)
                reject("ERROR", "Failed to request.", error)
                return
            }
            
            if granted {
                let keys = [CNContactGivenNameKey, CNContactFamilyNameKey, CNContactPhoneNumbersKey]
                let request = CNContactFetchRequest(keysToFetch: keys as [CNKeyDescriptor])
                
                do {
                    try contactStore.enumerateContacts(with: request, usingBlock: { (contact, stopPointer) in
                        if (contact.phoneNumbers.first?.value.stringValue) != nil {
                            contacts.append(Contact(
                                firstName: contact.givenName,
                                lastName: contact.familyName,
                                phoneNumber: contact.phoneNumbers.first?.value
                            ))
                        }
                    })
                    
                    let formattedContacts = self.formatResult(contactList: contacts)
                    
                    resolve(formattedContacts)
                } catch {
                    let error = NSError(domain: "error-get-contacts", code: 200, userInfo: nil)
                    reject("ERROR", "Failed to get contacts.", error)
                }
            } else {
                let error = NSError(domain: "error-access-denied", code: 200, userInfo: nil)
                reject("ERROR", "Access denied.", error)
                return
            }
        }
    }
    
    private func formatResult(contactList: [Contact]) -> NSMutableArray {
        let result: NSMutableArray = [];
        
        for contact in contactList {
            let finalContact: NSMutableDictionary = [:]
            finalContact["id"] = contact.id.uuidString
            finalContact["firstName"] = contact.firstName
            finalContact["lastName"] = contact.lastName
            finalContact["phoneNumber"] = contact.phoneNumber?.stringValue
            
            result.add(finalContact)
        }
        
        return result
    }
}

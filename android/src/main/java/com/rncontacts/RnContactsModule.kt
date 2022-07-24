package com.rncontacts

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.rncontacts.models.Contact

@ReactModule(name = RnContactsModule.TAG)
class RnContactsModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val contactsManager = ContactsManager()
  private val utils = Util()
  private var allContactsList = ArrayList<Contact>()

  companion object {
    const val TAG = "RnContactsModule"
  }

  override fun getName(): String {
    return "RnContacts"
  }

  @ReactMethod
  fun getAllContacts(promise: Promise) {

    if (allContactsList.isEmpty() && utils.checkPermission(reactApplicationContext)) {
      allContactsList = contactsManager.getPhoneContacts(currentActivity)
    }

    promise.resolve(utils.formatContacts(allContactsList.distinctBy { it.id } as ArrayList<Contact>))
  }
}

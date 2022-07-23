package com.rncontacts

import android.app.Activity
import android.database.Cursor
import android.provider.ContactsContract
import android.util.Log
import com.rncontacts.models.Contact

class ContactsManager {

  private var allContactsList = ArrayList<Contact>()

  fun getPhoneContacts(activity: Activity?): ArrayList<Contact> {
    Log.d("ContactsManager", "getPhoneContacts")
    val currentActivity: Activity =
      activity ?: throw Exception("Failed to request contacts.")

    val contactsCursor: Cursor? = currentActivity.contentResolver?.query(
      ContactsContract.Data.CONTENT_URI,
      null,
      null,
      null,
      ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME + " ASC"
    )

    if (contactsCursor != null && contactsCursor.count > 0) {
      val idIndex =
        contactsCursor.getColumnIndex(ContactsContract.CommonDataKinds.StructuredName._ID)
      val firstNameIndex =
        contactsCursor.getColumnIndex(ContactsContract.CommonDataKinds.StructuredName.GIVEN_NAME)
      val lastNameIndex =
        contactsCursor.getColumnIndex(ContactsContract.CommonDataKinds.StructuredName.FAMILY_NAME)

      while (contactsCursor.moveToNext()) {
        val id = contactsCursor.getString(idIndex)
        val firstName = contactsCursor.getString(firstNameIndex)
        val lastName = contactsCursor.getString(lastNameIndex)
        val phoneNumber =
          this.getPhoneByID((id.toInt() - 1).toString(), currentActivity)

        if (firstName != null && lastName != null) {
          allContactsList.add(Contact(id, firstName, lastName, phoneNumber))
        }
      }

      contactsCursor.close()
    }

    return allContactsList
  }

  private fun getPhoneByID(id: String, activity: Activity?): String? {
    val currentActivity: Activity =
      activity ?: throw Exception("Failed to request contacts.")
    val selection: String = ContactsContract.Contacts._ID + " =?"

    val phoneCursor: Cursor? = currentActivity.contentResolver?.query(
      ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
      null,
      selection,
      arrayOf(id),
      null
    )

    if (phoneCursor != null) {
      val phoneNumberIndex = phoneCursor.getColumnIndex("data1")

      while (phoneCursor.moveToNext()) {
        return phoneCursor.getString(phoneNumberIndex)
      }

      phoneCursor.close()
    }

    return null
  }
}

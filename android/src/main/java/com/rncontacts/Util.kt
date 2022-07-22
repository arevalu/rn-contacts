package com.rncontacts

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.google.gson.Gson
import com.rncontacts.models.Contact
import org.json.JSONObject

class Util {
  fun checkPermission(reactContext: ReactApplicationContext): Boolean {
    return ContextCompat.checkSelfPermission(
      reactContext,
      Manifest.permission.READ_CONTACTS
    ) == PackageManager.PERMISSION_GRANTED
  }

  private fun convertJsonToMap(jsonObject: JSONObject): WritableMap {
    val map: WritableMap = WritableNativeMap()
    val iterator: Iterator<String> = jsonObject.keys()

    while (iterator.hasNext()) {
      val key = iterator.next()
      when (val value: Any = jsonObject.get(key)) {
        is JSONObject -> {
          map.putMap(key, convertJsonToMap(value))
        }
        is Boolean -> {
          map.putBoolean(key, value)
        }
        is Int -> {
          map.putInt(key, value)
        }
        is Double -> {
          map.putDouble(key, value)
        }
        is String -> {
          map.putString(key, value)
        }
        else -> {
          map.putString(key, value.toString())
        }
      }
    }
    return map
  }

  fun formatContacts(list: ArrayList<Contact>): WritableNativeArray {
    val contactList = WritableNativeArray()
    val gson = Gson()

    for (contact in list) {
      val jsonObject = JSONObject(gson.toJson(contact))
      contactList.pushMap(this.convertJsonToMap(jsonObject))
    }

    return contactList
  }
}

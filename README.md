# rn-contacts

React Native custom module to get contact list with Kotlin (Android) and Swift (iOS)

## 📱 Screenshots

| iOS | Android |
| --- | --- |
| ![Simulator Screen Shot - iPhone 13 - 2022-07-24 at 11 41 38](https://user-images.githubusercontent.com/39446983/180652656-9343ae50-8475-431f-8f2c-d542f694fb9f.png) | ![Screenshot_1658596729](https://user-images.githubusercontent.com/39446983/180652679-48d4e910-3ef2-4804-a49b-0f604c0a57c1.png) |

## 🚀 Installation

```sh
npm install rn-contacts
```

## 🤓 Usage

```js
import { getAllContacts } from "rn-contacts";

// ...

const fetchContacts = async () => {
  try {
    const result = await getAllContacts();
  } catch(e) {
    console.log(e);
  }
}
```

> You can also check the 👉 [example](https://github.com/arevalu/rn-contacts/tree/master/example) 👈 implementation 

## ✅ Permissions

### iOS

Add kit specific **"permission"** keys to your Xcode `Info.plist` file, in order to make requestPermission work. Otherwise your app **crashes** when requesting the specific permission. 
* Open `Info.plist`. 
* Add key `Privacy - Contacts Usage Description` with your kit specific permission. 
  * The value for the key is optional in development. If you submit to the App Store the value must explain why you need this permission.
  
### Android - API 23+

Android requires allowing [permissions](https://facebook.github.io/react-native/docs/permissionsandroid.html) with the `READ_CONTACTS` permission must be added to your main application's `AndroidManifest.xml`.

```xml
  <uses-permission android:name="android.permission.WRITE_CONTACTS" />
```


## 🗒 TO DO

- [x] iOS module (Swift)
- [x] Android module (Kotlin)
- [x] Example with Typescript

## 🤝 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## 📃 License

MIT

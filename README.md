# rn-contacts

React Native custom module to get contact list with Kotlin (Android) and Swift (iOS)

## 📱 Screenshots

| iOS | Android |
| --- | --- |
| ![Simulator Screen Shot - iPhone 13 - 2022-07-14 at 14 39 02](https://user-images.githubusercontent.com/39446983/179048646-ab179768-f6b1-406c-b01e-690107041cb3.png) | TBD |

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

## 🗒 TO DO

- [x] iOS module (Swift)
- [ ] Android module (Kotlin)
- [x] Example with Typescript

## 🤝 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## 📃 License

MIT

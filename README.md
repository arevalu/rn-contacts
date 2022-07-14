# rn-contacts

React Native custom module to get contact list with Kotlin (Android) and Swift (iOS)

## Installation

```sh
npm install rn-contacts
```

## Usage

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

## Permissions

### iOS

Add kit specific **"permission"** keys to your Xcode `Info.plist` file, in order to make requestPermission work. Otherwise your app **crashes** when requesting the specific permission. 
* Open `Info.plist`. 
* Add key `Privacy - Contacts Usage Description` with your kit specific permission. 
  * The value for the key is optional in development. If you submit to the App Store the value must explain why you need this permission.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

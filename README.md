# iLeader App

## Getting Started

*Note: The following setup presumes that you are running OS X 10.8
(Mountain Lion) or greater and have XCode and its Command Line Tools
installed.*

The application is built in [React Native] and a good guide for getting
started can be found [here], including how to run the application in
simulators and on devices.

Once you have a fully up-and-running development machine, you can clone
the repository and install a development instance.

# Installation #
In OS X Terminal git clone this repository into a folder using

```
git clone [git repository url] [folder]
```

Change directory to the root folder of the app and to install the
contents of the `package.json`

```
npm install
```

Please see the documentation of each package for further details about usage
and implementation.

## Views

There are views for:

##### Organisation login

##### User authentication
* sign in, sign out, forgot password

##### User profile
* setup and update

##### Animated “push” transitions (slide rom right) with back button support

##### iOS styles NavBar with (animated separately to main body)

##### TabBar

##### Custom UI controls for select menus (iOS Picker style)

## Engine
* Built using React Native on a base of Redux (State, Reducer, Action principle), the app is in a position where much of the underlying logic and libraries are in place to start Sprint 4 “Fleshing Out”.
* One code base for both iOS and Android with device logic to handle cases
* Discrete error handling
* A DRY and RESTful Backend Factory to communicate to API endpoints (set, get and delete)
* A local Store (frontend “database”)
* Unit tests written (approx 80% coverage).

## ToDo
* If App.js screen is going to show (could just delay splash for longer?) then it needs to match the splash screen.

* Make sure all fetch calls check if internet connection present and if not pull existing data from the store.

* Make sure everything from iOS is mirrors for Android as well:
  * App icon, splash screen etc
  * React Native Image Picker: https://github.com/marcshilling/react-native-image-picker#android
  * React Native Mail: https://github.com/chirag04/react-native-mail#add-it-to-your-android-project
  * Status Bar styles for each page
  * GiftedSpinner renders ActivityIndicatorIOS OR ProgressBarAndroid, do they have the same props?
  * Push notifications: https://github.com/Neson/react-native-system-notification

* Open email client from within app

* Can't set an initial user in a Tool

## Issues

* Be aware that we're building for Android from source: <http://facebook.github.io/react-native/docs/android-building-from-source.html>.
* `secureTextEntry={true}` flicker: <https://github.com/facebook/react-native/issues/7936>
* Hot reload broken: <https://github.com/gcanti/tcomb-form-native/issues/132>
* Not able to get current scene: <https://github.com/aksonov/react-native-router-flux#reduxflux> (see focus-event branch of this repository)
* React Native Router Flux is not working with React Native > v0.22: <https://github.com/aksonov/react-native-router-flux/issues/525>
* Using <https://github.com/mat2maa/react-native-button.git> until <https://github.com/APSL/react-native-button/pull/29> is merged.
* Using `components/ParallaxView.js`
 until <https://github.com/lelandrichardson/react-native-parallax-view/pull/28/commits/b7b8bc6349bb5c7844ce83c796d80edd95c44d2f> is merged.
* Using <https://github.com/mat2maa/react-native> and <https://github.com/mat2maa/react-native-keyboard-aware-scroll-view/commit/f04c5eb9ef7700d1dd81049cba6656a0ea7cabeb> until <https://github.com/APSL/react-native-keyboard-aware-scroll-view/pull/41> is sorted. Also, beyond that, have increased `_KAM_EXTRA_HEIGHT` in `KeyboardAwareMixin.js`.
* Using <https://github.com/mat2maa/react-native-push-notification> until <https://github.com/zo0r/react-native-push-notification/pull/134> is merged.
* Using <https://github.com/mat2maa/react-native-image-picker.git> as without the commit, tapping a notification with the app open would crash it. Pull request not yet submitted.

## Similar Projects
iLeader: <https://bitbucket.org/account/user/WeAreApps/projects/IL>

## Contributing
Matthew Ager (mat2maa, [mattew@weareapps.com], [matthew.a.ager@googlemail.com])

## Credits
Matthew Ager, Development

## License
Copyright (c) 2016 We Are Apps

[React Native]: https://facebook.github.io/react-native/ "React Native"
[here]: https://facebook.github.io/react-native/docs/getting-started.html#content "Initial Setup Instructions"
[mattew@weareapps.com]: mailto:mattew@weareapps.com "Matthew Ager: We Are Apps"
[matthew.a.ager@googlemail.com]: mailto:matthew.a.ager@googlemail.com "Matthew Ager: Home"

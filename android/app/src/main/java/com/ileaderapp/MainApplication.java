package com.ileaderapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.burnweb.rnsimplealertdialog.RNSimpleAlertDialogPackage;

import android.content.Intent; // <--- Import Intent
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package

import com.chirag.RNMail.RNMail;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.Tracker;

public class MainApplication extends Application implements ReactApplication {

  private Tracker mTracker; // Google Analytics

  /**
   * Gets the default {@link Tracker} for this {@link Application}.
   * @return tracker
   */
  synchronized public Tracker getDefaultTracker() {
    if (mTracker == null) {
      GoogleAnalytics analytics = GoogleAnalytics.getInstance(this);
      // To enable debug logging use: adb shell setprop log.tag.GAv4 DEBUG
      mTracker = analytics.newTracker(R.xml.global_tracker);
    }
    return mTracker;
  }

  private ReactNativePushNotificationPackage mReactNativePushNotificationPackage; // <------ Add Package Variable

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public String getJSMainModuleName() {
      return "index.android";
    }

    @Override
    public @Nullable String getBundleAssetName() {
      return "index.android.bundle";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {

        mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(); // <------ Initialize the Package

        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CookieManagerPackage(),
            new VectorIconsPackage(),
            new RNSimpleAlertDialogPackage(),
            mReactNativePushNotificationPackage, // <---- Add the Package,
            new RNMail(),
            new LinearGradientPackage(),
            new ImagePickerPackage()
        );
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
/*
  // Add onNewIntent
  public void onNewIntent(Intent intent) {
    if ( mReactNativePushNotificationPackage != null ) {
      mReactNativePushNotificationPackage.newIntent(intent);
    }
  }
*/
}
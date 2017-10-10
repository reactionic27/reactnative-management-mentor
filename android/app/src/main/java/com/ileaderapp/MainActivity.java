package com.ileaderapp;

import com.facebook.react.ReactActivity;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Tracker;

import android.content.Intent; // <--- Import Intent
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Obtain the shared Tracker instance.
        MainApplication application = (MainApplication) getApplication();
        Tracker mTracker = application.getDefaultTracker();
        mTracker.setScreenName("Main Screen");
        mTracker.send(new HitBuilders.ScreenViewBuilder().build());
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        //getWindow().getDecorView().setBackground(getResources().getDrawable(R.drawable.splash));
        return "iLeaderApp";
    }
/*
    // Add onNewIntent
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        ((MainApplication) getApplication()).onNewIntent(intent);
    }*/
}

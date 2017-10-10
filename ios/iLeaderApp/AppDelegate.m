/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"
#import "RCTBundleURLProvider.h"
#import "RCTPushNotificationManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [application setStatusBarHidden:NO];
  [application setStatusBarStyle:UIStatusBarStyleLightContent];
  
  NSURL *jsCodeLocation;
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"iLeaderApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  /**
   * Custom script to extend launch screen and avoid white flash
   * https://github.com/facebook/react-native/issues/1402
   */
  
  // Get screen height
  CGRect screenBound = [[UIScreen mainScreen] bounds];
  CGSize screenSize = screenBound.size;
  CGFloat screenHeight = screenSize.height;

  // Get launch image
  NSString *launchImageName = nil;
  if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone) {
    if (screenHeight == 480) launchImageName = @"Default"; // iPhone 4/4s
    else if (screenHeight == 568) launchImageName = @"Default-568h"; // iPhone 5/5s
    else if (screenHeight == 667) launchImageName = @"Default-667h"; // iPhone 6
    else if (screenHeight == 736) launchImageName = @"Default-Portrait-736h"; // iPhone 6+
  }

  NSLog(@" Image: %@", launchImageName);

  UIImage *image = [UIImage imageNamed: launchImageName];
  if (image) {
    // Create loading view
    UIImageView *launchScreenView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"Default"]];
    launchScreenView.frame = self.window.bounds;
    launchScreenView.contentMode = UIViewContentModeScaleAspectFill;
    rootView.loadingView = launchScreenView;
    rootView.loadingViewFadeDelay = 2.50;
    rootView.loadingViewFadeDuration = 0.50;
  }
  
  return YES;
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
{
  [RCTPushNotificationManager didReceiveRemoteNotification:notification];
}

// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
}

@end

//THANK YOU LORD. YOU HELPED ME.
import React from 'react';
import {
  Text,
  NativeModules,
  AppRegistry,
  requireNativeComponent,
  View,
} from 'react-native';
import App from './App';
import { Header, Navigation, Button, Touchable } from 'react-native-kindle';
const KPPWindow = requireNativeComponent('KPPWindow');

const WinMgrDrawMode = {
  NORMAL: 0,
  FASTEST: 1,
  KB: 2,
  PAN_ZOOM: 3,
  HIGHLIGHT: 4,
  ANIMATION_BURST: 5,
};

const WinMgrSensitiveLevel = {
  FLASH_NEXT_UPDATE: 0,
  NONE: 1,
  DEFAULT_VALUE: 2,
  READER: 3,
  MID_GRAYS: 4,
  MODE_FLASHPAGES: 5,
  MODE_DIALOG: 6,
  MODE_FLASHFASTPAGES: 7,
  MODE_READER_IMAGE_HEAVY: 8,
};

function Home(props){
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          height: '90%',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 80,
            margin: 80,
            fontWeight: '900',
            fontFamily: 'serif',
          }}
        >
          Chess
        </Text>
        <Touchable
          onPress={() => {
            props.pushView({
              title: 'Single Player Game',
              view: <App isSinglePlayer={true} />,
            });
          }}
          style={{
            flexDirection: 'row',
            padding: 10,
            borderWidth: 2,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
          }}
        >
          <Text
            style={{
              fontFamily: 'serif',
              fontSize: 40,
              fontWeight: 'bold',
              paddingHorizontal: 10,
            }}
          >
            ♔
          </Text>
          <Text
            style={{ fontFamily: 'serif', fontSize: 22, fontWeight: 'bold',paddingRight:10 }}
          >
            Play Agianst AI
          </Text>
        </Touchable>
        <Touchable
          onPress={() => {
            props.pushView({
              title: 'Single Player Game',
              view: <App isSinglePlayer={false} />,
            });
          }}
          style={{
            flexDirection: 'row',
            padding: 10,
            borderWidth: 2,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
          }}
        >
          <Text
            style={{
              fontFamily: 'serif',
              fontSize: 40,
              fontWeight: 'bold',
              paddingHorizontal: 10,
            }}
          >
            ♔♛
          </Text>
          <Text
            style={{ fontFamily: 'serif', fontSize: 22, fontWeight: 'bold',paddingRight:10 }}
          >
            Play Agianst A Friend
          </Text>
        </Touchable>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: 120,
            fontSize: 18,
          }}
        >
          By Lukas Hahn (luketheduke)
        </Text>
      </View>
    </>
  );

}

function ReactNativeFrontEnd() {
  const initalStack = [{ title: 'Chess', view: <Home /> }];

  return (
    <KPPWindow
      key="mainWindow"
      title="com.lab126.testWindow"
      windowType="full_screen"
      style={{
        width: '100%',
        height: '100%',
      }}
      winMgr={{
        // drawMode: WinMgrDrawMode.NORMAL,        //TODO: Figure out good refresh settings. Untill then, defaults work good.
        // sensitiveLevel: WinMgrSensitiveLevel.NONE,
        A: 'mainWindow',
      }}
      testID="demoApp"
      accessibilityLabel="Sample Application"
      accessibilityHint="Sample Application shows component features that K Plus Plus foundation provides."
      defaultFocus="demoNextWidgetButton"
    >
      <Navigation initalStack={initalStack} />
    </KPPWindow>
  );
}

AppRegistry.registerComponent('ReactNativeFrontEnd', () => ReactNativeFrontEnd);

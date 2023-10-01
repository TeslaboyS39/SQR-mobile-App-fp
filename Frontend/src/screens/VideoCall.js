import React, { useState, useEffect } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { Button, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [username, setUsername] = useState('');
    const navigation = useNavigation()
  /**
   * @type {import('agora-rn-uikit').ConnectionData}
   */
  const connectionData = {
    appId: '0e845f2392ce4cd1bd4452802b0e3bc8',
    channel: 'extraordinary-channel',
    username: username,
  };

  /**
   * @type {import('agora-rn-uikit').rtmCallbacks}
   */
  const rtcCallbacks = {
    EndCall: () => {
      setTimeout(() => {
        navigation.goBack()
        setVideoCall(false);
      }, 200);
    },
  };

  /**
   * @type {import('agora-rn-uikit').Settings}
   */
  const settings = {
    displayUsername: true,
  };

  const handleJoin = () => {
    setVideoCall(true);
  };

  useEffect(() => {
    SecureStore.getItemAsync('username')
      .then((storedUsername) => {
        if (storedUsername) {
          setUsername(storedUsername);
          handleJoin();
        }else {
            setUsername("User")
            handleJoin()
        }
      })
      .catch((error) => {
        console.error('Error retrieving stored username:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
        <AgoraUIKit settings={settings} connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

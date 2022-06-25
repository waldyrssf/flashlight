import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, TouchableOpacity, StatusBar} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

export default function App() {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle)

  //it turns the flashlight on/off by clicking
  useEffect(() => {
   Torch.switchState(toggle);
  }, [toggle]);

  //it turns the flashlight on/off by shaking
  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle)
    });
    return () => subscription.remove();
  }, []);

  return (
    
    <View style={toggle ? styles.containerLight : styles.container}>
      <StatusBar />
      <TouchableOpacity onPress={handleChangeToggle}>
      <Image 
      style={toggle ? styles.lightingOn : styles.lightingOff}
      source={
        toggle
        ? require('./assets/eco-light.png')
        : require('./assets/eco-light-off.png')
      }
      />
      <Image 
      style={ styles.dioLogo}
      source={
        toggle
        ? require('./assets/logo-dio.png')
        : require('./assets/logo-dio-white.png')
      }
      />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
    lightingOn:{
      resizeMode: 'contain',
      alignSelf:'center',
      width: 150,
      height: 150,
    },
    lightingOff:{
      resizeMode: 'contain',
      alignSelf:'center',
      tintColor: 'white',
      width: 150,
      height: 150,
    },
    dioLogo:{
      resizeMode: 'contain',
      alignSelf:'center',
      width: 250,
      height: 250,
    },

});

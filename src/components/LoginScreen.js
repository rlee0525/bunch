import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import { 
  Text, 
  View, 
  Image, 
  Button, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginBtn: {
    padding: 3,
    paddingLeft: 12,
    paddingRight: 30,
    backgroundColor: '#4868AC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  loginBtnImg: {
    width: 40,
    height: 40,
    marginRight: 20
  },
  loginBtnText: {
    color: '#fff',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 16
  }
});

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={logIn} style={styles.loginBtn}>
      <Image 
        style={styles.loginBtnImg} 
        source={require('../../assets/images/facebook_logo.png')}
      />
      <Text style={styles.loginBtnText}>Log in With Facebook</Text>
    </TouchableOpacity>
    {/* <Button
      onPress={() => navigation.dispatch({ type: 'Login' })}
      title="Log in"
    /> */}
  </View>
);

async function logIn() {
  const {
    type,
    token,
  } = await Expo.Facebook.logInWithReadPermissionsAsync('126078211437639', {
      permissions: ['public_profile'],
      behavior: 'web'
    });

  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

export default LoginScreen;
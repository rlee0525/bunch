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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
  }

  async logIn() {
    const { navigation } = this.props;
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('126078211437639', {
      permissions: ['public_profile'],
      behavior: 'web'
    });

    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,first_name,last_name,email,birthday,education,gender,picture&access_token=${token}`
      );
      console.log(await response.json());
      navigation.dispatch({ type: 'Login' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logIn} style={styles.loginBtn}>
          <Image
            style={styles.loginBtnImg}
            source={require('../../assets/images/facebook_logo.png')}
          />
          <Text style={styles.loginBtnText}>Log in With Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

export default LoginScreen;
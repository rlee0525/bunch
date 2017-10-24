import React from 'react';
import { Font } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, 
         Navigator, AppRegistry } from 'react-native';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ec008c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingFont: {
    color: 'white',
    fontFamily: 'agb',
    fontSize: 30
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      loading: true
    };

    this.store = createStore(AppReducer);
  }

  async componentDidMount() {
    await Font.loadAsync({ 'agb': require('./assets/fonts/agb.ttf') });
    this.setState({ fontLoaded: true });

    await this.resolveAfter2Seconds(20);
    this.setState({ loading: false });
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  render() {
    if (!this.state.fontLoaded) return null;

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingFont}>BUNCH</Text>
        </View>
      );
    }
    
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;
import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, View, Navigator } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'agb': require('./assets/fonts/agb.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) return null;
    
    return (
      <View style={styles.container}>
        <Text style={styles.whiteFont}>BUNCH</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ec008c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteFont: {
    color: 'white',
    fontFamily: 'agb',
    fontSize: 30
  }
});

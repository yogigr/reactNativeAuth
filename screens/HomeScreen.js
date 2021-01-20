import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends Component {
  logout() {
    this.props.onLoggedOut(true)
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="LOGOUT" onPress={this.logout.bind(this)} />
      </View>
    )
  }
}

export default HomeScreen
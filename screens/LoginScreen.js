import React, { Component } from 'react';
import { View, Button } from 'react-native';

class LoginScreen extends Component {

  login() {
    this.props.onLoggedIn(true);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Login" onPress={this.login.bind(this)} />
      </View>
    )
  }
}

export default LoginScreen
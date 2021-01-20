import React, {Component} from 'react';
import { View, Button } from 'react-native';

class RegisterScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Register" onPress={() => this.props.navigation.navigate('Login')} />
      </View>
    )
  }
}

export default RegisterScreen
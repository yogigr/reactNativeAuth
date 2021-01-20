import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './RegisterScreen'
import LoginScreen from './LoginScreen'

class AuthScreen extends Component {
  constructor(props) {
    super(props)
  }

  handleOnLoggedIn() {
    this.props.onLoggedIn(true);
  }

  loginScreen = () => (
    <LoginScreen onLoggedIn={this.handleOnLoggedIn.bind(this)} />
  )

  render() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={this.loginScreen.bind(this)} />
        <Tab.Screen name="Register" component={RegisterScreen} />
      </Tab.Navigator>
    )
  }
}

export default AuthScreen
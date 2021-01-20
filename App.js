import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false, 
    };
  }

  authCheck() {
    setInterval(() => {
      if (this._isMounted) {
        this.setState({loading: false})
      }
    }, 3000);
  }

  handleOnLoggedIn() {
    this.setState({authenticated: true})
  }

  handleOnLoggedOut() {
    this.setState({authenticated: false})
  }

  componentDidMount() {
    this._isMounted = true
    this.authCheck()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  authScreen = () => (
    <AuthScreen onLoggedIn={this.handleOnLoggedIn.bind(this)} />
  )

  homeScreen = () => (
    <HomeScreen onLoggedOut={this.handleOnLoggedOut.bind(this)} />
  )

  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {
            this.state.loading ? (
              <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
            ) : this.state.authenticated ? (
              <Stack.Screen name="Home" component={this.homeScreen} />
            ) : (
              <Stack.Screen name="Auth" component={this.authScreen} options={{headerShown: false}} />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

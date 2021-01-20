import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'

import { getToken, getAuthUser } from './utils/auth'

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      token: null,
      user: null 
    };
  }

  authCheck = async () => {
    var authUser = null
    var token = null
    if (this._isMounted) {
      token = await getToken()
      if (token !== null) {
        authUser = await getAuthUser(token)
        this.setState({token: token})
        if (authUser !== null) {
          this.setState({user: authUser})
          setTimeout(() => {
            this.setState({authenticated: true})
            this.setState({loading: false})
          }, 3000)
        } else {
          this.setState({loading: false})
        }
      } else {
        this.setState({loading: false})
      }
    }
  }

  handleOnLoggedIn({token, authUser}) {
    this.setState({
      authenticated: true,
      token: token,
      user: authUser
    })
  }

  handleOnLoggedOut() {
    this.setState({
      authenticated: false,
      token: null,
      user: null
    })
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
    <HomeScreen
      user={this.state.user}
      token={this.state.token}
      onLoggedOut={this.handleOnLoggedOut.bind(this)} 
    />
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

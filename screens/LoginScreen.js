import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity 
} from 'react-native';

import { loginUser, getAuthUser, setToken } from '../utils/auth'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: {},
      loading: false,
      email: '',
      password: ''
    }
  }

  login = async () => {
    if (this.state.email != '' && this.state.password != '') {
      try {
        this.setState({loading: true})
        const {token, errorMessage} = await loginUser(this.state.email, this.state.password)
        if (errorMessage != null) {
          this.setState({error: errorMessage})
          setTimeout(() => {
            this.setState({error: {}})
            this.setState({loading: false})
          }, 3000)
        }
        if (token != null) {
          const authUser = await getAuthUser(token);
          if (authUser != null) {
            successSaveToken = setToken(token)
            if (successSaveToken) {
              this.props.onLoggedIn({token, authUser});
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>
          Auth Starter
        </Text>
        <View style={styles.form}>

          <TextInput style={styles.textInput}
            placeholder="Email..." 
            onChangeText={text => this.setState({email:text})}/>
            
            {
              this.state.error && this.state.error.email ? (
                <Text style={styles.errorText}>
                  { this.state.error.email[0] }
                </Text>
              ) : null
            }
          

          <TextInput style={styles.textInput} 
            placeholder="Password..." 
            secureTextEntry
            onChangeText={text => this.setState({password:text})}/>
          <TouchableOpacity
            disabled={this.state.loading} 
            style={styles.loginButton} 
            onPress={this.login.bind(this)}>
            <Text style={styles.loginText}>
              {
                this.state.loading ? 'Loading...' : 'Login'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 30,
    marginBottom: 15
  },
  form: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  textInput: {
    backgroundColor: '#eee',
    marginVertical: 15,
    padding: 15,
    fontSize: 15
  },
  loginButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 15,
    padding: 15
  },
  loginText: {
    color: '#fff',
    fontSize: 15
  },
  errorText: {
    color: 'red'
  }
})

export default LoginScreen
import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {getToken, logoutServer, removeToken} from '../utils/auth'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  logout = async () => {
    this.setState({loading: true})
    //logout server
    let token = await getToken()
    let successLogout = await logoutServer(token)
    if (successLogout) {
      let successRemoveToken = await removeToken()
      if (successRemoveToken) {
        this.props.onLoggedOut(true)
      }
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={{textAlign: 'center'}}>Selamat datang {this.props.user.name}</Text>
          <TouchableOpacity
            disabled={this.state.loading} 
            style={styles.logoutButton} 
            onPress={this.logout.bind(this)}>
            <Text style={styles.logoutText}>
              {
                this.state.loading ? 'Loading...' : 'Logout'
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
    
  },
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  logoutButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 15,
    padding: 15
  },
  logoutText: {
    color: '#fff',
    fontSize: 15
  }
})

export default HomeScreen
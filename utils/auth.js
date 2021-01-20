import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import config from './config.json'

export const setToken = async (token) => {
  let result = false
  try {
    await AsyncStorage.setItem('token', token)
    result = true
  } catch (e) {
    console.log(e)
  }

  return result;
}

export const getToken = async () => {
  let result = null;

  try {
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
      result = token
    }
  } catch (e) {
    console.log(e)
  }

  return result
}

export const removeToken = async () => {
  let result = false
  try {
    await AsyncStorage.removeItem('token')
    result = true
  } catch (e) {
    console.log(e)
  }
  return result
}

export const loginUser = async (email, password) => {
  
  var token = null
  var errorMessage = null

  await axios.post(config.API_URL+'/login', {
    email: email,
    password: password
  }, {
    headers: {
      'Accept': 'Application/json'
    }
  }).then(response => {
    token = response.data.data
  }).catch(error => {
    if (error.response.status == 422) {
      errorMessage = error.response.data.errors
    } else {
      console.log(error.response.data)
    }
  })

  return {token, errorMessage}
}

export const getAuthUser = async (token) => {
  var user = null
  await axios.get(config.API_URL+'/me', {headers: {
    'Accept': "application/json",
    'Authorization': 'Bearer ' + token
  }}).then(response => {
    user = response.data.data
  }).catch(error => {
    console.log(error.response.data)
  })
  return user
}

export const logoutServer = async (token) => {
  var result = false
  await axios.post(config.API_URL+'/logout', {}, {headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + token
  }}).then(response => {
    if (response.data.message == 'success') {
      result = true
    }
  }).catch(error => {
    console.log(error.response.data)
  })

  return result
}
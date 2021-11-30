import axios from 'axios';

const API_URL = "https://examine-it-back.herokuapp.com/api/";

class DeviceService {

  
  registerDevice(title, username, timeZone) {
    return axios.post(API_URL + "addDevice", {
      title,
      username,
      timeZone
    });
  }

  deleteDevice(token){
    return axios.delete(API_URL + "deleteDevice/" + token)
  }

  addUserPermitted(username, token){
    return axios.get(API_URL + "addUserPermitted/" + token + "/" + username)
  }

  deleteUserPermitted(username, token){
    return axios.delete(API_URL + "deleteUser/" + token + "/" + username)
  }
}

export default new DeviceService();

import axios from 'axios';

const API_URL = "https://examine-it-back.herokuapp.com/api/";

class CommentService {

    addComment(title, username, token) {
        return axios.post(API_URL + "addComment/" + token, {
            title,
            username
        });
    }

}

export default new CommentService();
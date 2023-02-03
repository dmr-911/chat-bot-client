import axios from "axios";

axios.defaults.baseURL = "https://api.askmeveg.com/api/v1/";

axios.interceptors.response.use(resp => resp, async error =>{
    console.log(error.response.status)
    if(error.response.status === 401){
        const response = await axios.post('auth/refresh/', {refresh : localStorage.refreshToken}, {withCredentials : true});

        if(response.status === 200){
            axios.defaults.headers.common['Authorization'] =  `Bearer ${response.data.access}`;

            return axios(error.config)
        }
    }

    return error;
})

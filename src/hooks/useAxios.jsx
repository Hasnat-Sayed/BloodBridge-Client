import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: 'https://bloodbridge-puce.vercel.app'
    }
)

const useAxios = () => {
    return axiosInstance
}

export default useAxios;
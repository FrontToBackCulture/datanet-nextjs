import axios from 'axios'

// ----------------------------------------------------------------------

export const basePath = process.env.NEXT_PUBLIC_HOST_API

const axiosInstance = axios.create({
  baseURL: basePath,
})

export default axiosInstance

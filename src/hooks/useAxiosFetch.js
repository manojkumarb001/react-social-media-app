import axios from "axios"
import { useEffect, useState } from "react"

const useAxiosFetch = (baseUrl) => {

    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()

        const fetch = async (url) => {

            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                })

                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            }
            catch (err) {
                if (isMounted) {
                    setFetchError(err.message)
                    setData([])
                }
            }
            finally {
                isMounted && setTimeout(()=>setIsLoading(false),2000)
            }


        }

        fetch(baseUrl)

        const cleanup=()=>{
            isMounted=false
            source.cancel()
        }
        return cleanup
    }, [baseUrl])


    return {data,fetchError,isLoading}

}

export default useAxiosFetch

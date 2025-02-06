import  { useEffect, useState } from 'react'

const useWindowSize = () => {
    const[windowSize,setWindowSize]=useState({
        height:undefined,
        width:undefined
    })
    useEffect(
        ()=>{
            const handleSize=()=>{
                setWindowSize({
                    width:window.innerWidth,
                    height:window.innerHeight
               } )
            } 
            
            handleSize()

            window.addEventListener('resize',handleSize)

            //for clean up process and to prevent memory leakage, we use this
            return ()=>window.removeEventListener('resize',handleSize)
        },
        []
    )

  return (
    windowSize
  )
}

export default useWindowSize

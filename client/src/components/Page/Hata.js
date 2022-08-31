import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

function Hata() {
    const Navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            Navigate("")
        }, 1000);
    },[Navigate])
  return (
    <div>
        <h1>Geçersiz Url girdiniz</h1>
    </div>
  )
}

export default Hata

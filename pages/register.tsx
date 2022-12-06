import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Form from '../components/Form'

function Register() {
   const [user, setUser] = useState({ id: "", name: "", sector: "" })
   const router = useRouter()

   useEffect(() => {
      if (router.isReady) {
         const session = sessionStorage.getItem('user')
         const data = session && JSON.parse(session)
         setUser(data)
         console.log(data)
      }
   }, [router.isReady])
   
  return (
     <div className='container vh-100'>
        <div className="row d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6">
                  <Form user={user} router={router} />
            </div>
        </div>  
     </div>
  )
}

export default Register
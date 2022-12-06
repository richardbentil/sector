import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {MdEdit} from "react-icons/md"

function Profile() {
   const [user, setUser] = useState({ id: "", name: "", sector: {name: ""} })
   const [edit, setEdit] = useState(false)
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
            <div className="col-md-9 col-xl-8 col-xxl-9">
               <div className="card shadow border-0">
                 <div className="card-header d-flex justify-content-between px-4 pt-3 border-0">
                        <h4 className="card-title">Your profile</h4>
                        <h4><a type="button" onClick={() => router.push("/register")}><MdEdit /></a></h4>
                  </div>
                  <div className="card-body p-4">
                        <div className='my-4'>
                           <p className='mb-4 h4'><span className='text-muted me-md-4'>Name: </span> {user?.name}</p>
                           <p className='mb-4 h4'><span className='text-muted me-md-4'>Sector: </span> {user?.sector?.name}</p>
                        </div>
                  </div>
               </div>    
            </div>
      </div>  
   </div>
  )
}

export default Profile
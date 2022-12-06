import React, { useEffect, useState } from 'react'
import axios from "axios"
import { validateForm } from '../lib/validateForm'
import Router, { useRouter } from 'next/router'
import SectorsSelect from './SectorsSelect'
import {generateId} from "../lib/generateId"
import { setTimeout } from 'timers/promises'
import Spinner from './Spinner'

function Form({ user, router }: any) {
  const [fiterSectors, setFilterSector] = useState<any>([])
  const [message, setMessage] = useState("")  
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState<string>("")
  const [workSector, setWorkSector] = useState<any>("")
  const [agree, setAgree] = useState<boolean>(false)

  useEffect(() => {
    if (router.isReady) {
      if (user?.name) {
        setName(user?.name)
        setWorkSector(user?.sector?.name)
      }

    }
  }, [router.isReady, user])
  
    
const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    //filter sector to get main and sub
    const sector: any = fiterSectors?.find((sec: any) => sec?.name == workSector)
    //form validation
    const inputs = {
        name, sector, agree: user?.name ? true : agree, id: user?.name ? "" : generateId(6)
  }
  
   const inputs2 = {
        name, sector, id: ""
  }
  
    const resp = validateForm(inputs)

    if (resp?.msg) {
      setError(resp?.msg)
      return
    } else {
      setError("")
    }

  if (name && sector) {
    try {
      console.log(inputs)
      setLoading(true)
      const response = await axios({
        url: user?.name ? "/api/users/" + user?.id : "/api/users/create",
        method: user?.id ? "PUT" : "POST",
        data: user?.name ? inputs2 : inputs,
        headers: {
                'Content-Type': 'application/json',
        },
        signal: new AbortController().signal
      })
      setLoading(false)
      console.log(response)
      if (response.status == 201) {
        sessionStorage.setItem("user", JSON.stringify(response?.data?.user))
        setMessage(response?.data?.msg)
        router.push("/profile")
      } else {
        setError(response?.data?.msg)
      } 
    } catch (error: any) {
      setLoading(false)
      setError(error?.message)
    }
    } else {
      setError("Provide all form values")
    }
  }

  const handleToggle = () => {
    !agree ? setAgree(true) :setAgree(false)
  }
  return (
    <>
      {error && <p className='text-danger'>{error}</p>}
      {message && <p className='text-success'>{message}</p>}
      <h4 className='mb-4'>{user?.name ? "Edit profile" : "Register"}</h4>
    <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" name="name" id="name" aria-describedby="helpId" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="sector">Sectors</label>
                  <SectorsSelect workSector={workSector} setWorkSector={setWorkSector} router={router} setFilterSector={setFilterSector} user={user} />
                </div>
                {!user?.name && <div className="form-check form-check-inline mb-4">
                  <input className="form-check-input" type="checkbox" id="agree" onChange={handleToggle} />
                  <label className="form-check-label" htmlFor="agree">Agree to terms</label>
                </div>}
                <div className='d-flex justify-content-end mt-4 ps-3'>
                {user?.name && <button type="button" className="btn btn-secondary shadow px-5 me-5" onClick={() => router.push("/profile")}>Cancel</button>}
                <button type="submit" className="btn btn-primary shadow px-5" disabled={loading || !name || !workSector || !user?.name && !agree}>{loading ? <Spinner /> : "Submit"}</button>
                </div>
                
      </form>
      </>
  )
}

export default Form
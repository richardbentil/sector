import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <div className='container vh-100'>
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6">
            <div className='text-center'>
              <h1>Sector portal</h1>
              <h4>A portal for workers in every sector</h4>
              <Link href="/register"><button className='btn btn-primary btn-pill my-4 shadow'>Register</button></Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
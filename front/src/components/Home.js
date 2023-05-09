import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div>   
            <h3 className='mt-3' >Welcome</h3>
            <Link to={'/'} >
                <button className='btn btn-primary'  > Logout</button>
            </Link>
        </div>
    )
}

export default Home
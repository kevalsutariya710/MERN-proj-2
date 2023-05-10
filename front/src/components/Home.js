import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/getdata')
            .then(res => res.json())
            .then((data) => {
                setData(data.data)
            })
    }, [])

    return (
        <>
            <div className='auth-wrapper mt-5'>
                <h3 className='mt-3' >Welcome</h3>
                <div className='mt-8'>

                    <table style={{ width: '100%', border: "1px solid black" }}  >
                        <tbody>
                            <tr >
                                <th style={{ border: "1px solid black" }}>Name</th>
                                <th style={{ border: "1px solid black" }}>email</th>
                                <th style={{ border: "1px solid black" }}>password</th>
                            </tr>


                            {data.map((i, key) => {
                                return (
                                    <tr key={key} >
                                        <td style={{ border: "1px solid black" }}> {i.name} </td>
                                        <td style={{ border: "1px solid black" }}>{i.email} </td>
                                        <td style={{ border: "1px solid black" }}>{i.password} </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                    <br />
                    <Link to={'/'} >
                        <button className='btn btn-primary'  > Logout</button>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Home
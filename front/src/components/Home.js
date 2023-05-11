import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
    const [data, setData] = useState([])
    const [err, setErr] = useState([])


    const getAlldata = async () => {

        try {
            const getData = await axios.get('http://localhost:5000/getdata')
            setData(getData.data.data)
            // console.log(getData.data.data);
        } catch (error) {
            setErr(error.message)
        }

    }

    useEffect(() => {
        // fetch('http://localhost:5000/getdata')
        //     .then(res => res.json())
        //     .then((data) => {
        //         setData(data.data)
        //     })

        getAlldata();

    }, [])

    return (
        <>
            <div className='auth-wrapper mt-5'>
                <h3 className='mt-3' >Welcome</h3>
                <div className='mt-8'>
                    <div>
                        {err !== "" && <div> {err}</div>}
                    </div>

                    <table style={{ width: '100%', border: "1px solid black" }}  >
                        <tbody>
                            <tr >
                                <th style={{ border: "1px solid black" }}>Name</th>
                                <th style={{ border: "1px solid black" }}>email</th>
                            </tr>


                            {data.map((i) => {

                                const { _id, email, name } = i

                                return (
                                    <tr key={_id} >
                                        <td style={{ border: "1px solid black" }}> {name} </td>
                                        <td style={{ border: "1px solid black" }}>{email} </td>
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
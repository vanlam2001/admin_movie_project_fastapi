import React from 'react'
import { useSelector } from 'react-redux'
import { MoonLoader } from 'react-spinners'

const Spinner = () => {
    let { isLoading } = useSelector((state) => state.spinnerSlice)
    return isLoading ? (
        <div style={{ background: "#a8dadc" }} className='fixed w-screen h-screen top-0 left-0 flex justify-center items-center z-50'>
            <MoonLoader color='#457b9d'></MoonLoader>
        </div>
    ) : (
        <></>
    )
}

export default Spinner
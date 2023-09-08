import { Button, Input, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { headerColums } from './utils'
import { useDispatch } from 'react-redux'
import { movieService } from '../../service/movieService'
import { NavLink, useSearchParams } from 'react-router-dom'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { localUserServ } from '../../service/localService'
import { setLoadingOff, setLoadingOn } from '../../toolkit/spinnerSlice'
import qs from "qs";
const { Search } = Input
const AdminMoviePage = () => {
    const dispatch = useDispatch();

    // chức năng tìm kiếm
    const stringSearch = window.location.search.substring(1);
    let paramsObj = qs.parse(stringSearch)

    const [searchValue, setSearchValue] = useSearchParams();
    const [isGroupCode] = useState(() => {
        if (paramsObj.isGroupCode) {
            return paramsObj.isGroupCode;
        } else {
            return 'search'
        }
    })

    const handleSearchOnchange = (keywords) => {
        let value = keywords.target.value;
        setSearchValue({
            search: value,
            isGroupCode: isGroupCode
        });
        if (value) {
            movieService.getSearchMovie(value, isGroupCode)
                .then((res) => {
                    setMovieList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    setMovieList([])
                })
        } else {
            fetchMovieList(isGroupCode);
        }
    }


    // Set Movie 
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        fetchMovieList();
    }, [])

    const fetchMovieList = (isGroupCode) => {
        dispatch(setLoadingOn())
        movieService.getMovieList(isGroupCode)
            .then((res) => {
                dispatch(setLoadingOff())
                setMovieList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // delete movie 
    const handleDeleteMovie = (movie) => {
        movieService.deleteMovie(movie)
            .then(() => {
                fetchMovieList(movieList);
                message.success('Phim đã được xoá')
            })
            .catch((err) => {
                console.log(err)
                message.error(err.response.data);
            })
    }

    const dataSource = movieList?.map((item, index) => {
        return {
            key: index,
            maPhim: item.maPhim,
            tenPhim: item.tenPhim,
            biDanh: item.biDanh,
            trailer: item.trailer,
            hinhAnh: item.hinhAnh,
            moTa: item.moTa,
            ngayKhoiChieu: item.ngayKhoiChieu,
            action: (
                <>
                    <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0'>
                        <NavLink to={`/admin-update-movie/${item.maPhim}`}>
                            <button className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
                                <FaPencilAlt />
                            </button>
                        </NavLink>

                        <button
                            onClick={() => handleDeleteMovie(item.maPhim)}
                            className='p-2 text-base text-white bg-red-500 mx-1 rounded'>
                            <FaTrashAlt />
                        </button>
                    </div>
                </>
            )

        }
    })

    return (
        <>
            {localUserServ.get()?.maLoaiNguoiDung === 'quantri' ? (
                <div>
                    <NavLink to={'/admin-add-movie'}>
                        <Button type="primary" className='mb-3 bg-green-500'>Thêm phim</Button>

                    </NavLink>
                </div>
            ) : <> </>}

            <div className='mb-3 flex flex-col items-start justify-between space-y-1 sm:flex-row sm:space-y-0'>
                <Search
                    onChange={handleSearchOnchange}
                    defaultValue={paramsObj.search}
                    placeholder='Tìm phim'>
                </Search>
            </div>

            <Table dataSource={dataSource} columns={headerColums}></Table>
        </>
    )
}

export default AdminMoviePage

// note: chức năng tìm kiếm
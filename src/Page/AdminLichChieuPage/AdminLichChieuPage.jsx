import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../../toolkit/spinnerSlice';
import { lichChieuService } from '../../service/lichChieuService';
import { Button, Input, Table, message } from 'antd';
import { headerColums } from './utils';
import { NavLink, useSearchParams } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import qs from "qs";
import { localUserServ } from '../../service/localService';
const { Search } = Input
const AdminLichChieuPage = () => {
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
        })
        if (value) {
            lichChieuService.getSearchLichChieu(value, isGroupCode)
                .then((res) => {
                    setLichChieuList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    setLichChieuList([])
                })
        } else {
            fetchLichChieuList(isGroupCode);
        }
    }


    // Set Lich Chieu 
    const [lichChieuList, setLichChieuList] = useState([]);

    useEffect(() => {
        fetchLichChieuList();
    }, [])

    const fetchLichChieuList = (isGroupCode) => {
        dispatch(setLoadingOn())
        lichChieuService.getLichChieuList(isGroupCode)
            .then((res) => {
                dispatch(setLoadingOff())
                setLichChieuList(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // delete lich chieu
    // delete lich chieu
    const handleDeleteLichChieu = (lichChieu) => {
        lichChieuService.deleteLichChieu(lichChieu)
            .then(() => {
                fetchLichChieuList(lichChieuList);
                message.success('Lịch chiếu đã được xoá');
            })
            .catch((err) => {
                // Check if the error response has a 'detail' field
                if (err.response && err.response.data && err.response.data.detail) {
                    message.error(err.response.data.detail);
                } else {
                    message.error('Xoá lịch chiếu không thành công');
                }
            });
    }



    const dataSource = lichChieuList?.map((item, index) => {
        return {
            key: index,
            maPhim: item.maPhim,
            maLichChieu: item.maLichChieu,
            ngayChieuGioChieu: item.ngayChieuGioChieu,
            maRap: item.maRap,
            giaVe: item.giaVe,
            thoiluong: item.thoiluong,
            action: (
                <>
                    <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0'>
                        <NavLink to={`/admin-update-lich-chieu/${item.maLichChieu}`}>
                            <button className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
                                <FaPencilAlt />
                            </button>
                        </NavLink>
                        <button
                            onClick={() => handleDeleteLichChieu(item.maLichChieu)}
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
            {localUserServ.get()?.maLoaiNguoiDung === 'quantri' && (
                <div>
                    <NavLink to={'/admin-them-lich-chieu'}>
                        <Button type='primary' className='mb-3 bg-green-500'>Thêm lịch chiếu</Button>
                    </NavLink>
                </div>
            )}
            <div className='mb-3 flex flex-col items-start justify-between space-y-1 sm:flex-row sm:space-y-0'>
                <Search
                    onChange={handleSearchOnchange}
                    defaultValue={paramsObj.search}
                    placeholder='Tìm lịch chiếu'>

                </Search>
            </div>
            <Table dataSource={dataSource} columns={headerColums} />
        </>
    )
}

export default AdminLichChieuPage
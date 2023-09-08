import { Button, Input, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { headerColums } from './utils'
import { useDispatch } from 'react-redux'
import { setLoadingOff, setLoadingOn } from '../../toolkit/spinnerSlice'
import { cumRapService } from '../../service/cumRapService'
import { NavLink, useSearchParams } from 'react-router-dom'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { localUserServ } from '../../service/localService'
const { Search } = Input
import qs from "qs";

const AdminCumRapPage = () => {
    const dispatch = useDispatch();

    // chức năng tìm kiếm 
    const stringSearch = window.location.search.substring(1);
    let paramsObj = qs.parse(stringSearch);

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
            cumRapService.getSearchCumRap(value, isGroupCode)
                .then((res) => {
                    setCumRapList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    setCumRapList([])
                })
        } else {
            fetchCumRapList(isGroupCode);
        }
    }

    // set cup rap 
    const [cumRapList, setCumRapList] = useState([]);
    useEffect(() => {
        fetchCumRapList();
    }, [])

    const fetchCumRapList = (isGroupCode) => {
        dispatch(setLoadingOn())
        cumRapService.getCumRapList(isGroupCode)
            .then((res) => {
                dispatch(setLoadingOff())
                setCumRapList(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // delete cumRap 
    const handleDeleteCumRap = (rap) => {
        cumRapService.deleteCumRap(rap)
            .then(() => {
                fetchCumRapList(cumRapList);
                message.success('Cụm rạp đã được xoá')
            })
            .catch((err) => {
                message.error(err.response.data)
            })
    }

    const dataSource = cumRapList?.map((item, index) => {
        const rapList = item.danhSachRap.map((rap) => ({
            maRap: rap.maRap,
            tenRap: rap.tenRap,
        }));

        return {
            key: index,
            maHeThongRap: item.maHeThongRap,
            maCumRap: item.maCumRap,
            tenCumRap: item.tenCumRap,
            diaChia: item.diaChia,
            danhSachRap: rapList,
            action: (
                <>
                    <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0'>
                        <NavLink to={`/admin-update-cum-rap/${item.maHeThongRap}`}>
                            <button className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
                                <FaPencilAlt />
                            </button>
                        </NavLink>
                        <button
                            onClick={() => handleDeleteCumRap(item.maHeThongRap)}
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
                    <NavLink to={'/admin-them-cum-rap'}>
                        <Button type='primary' className='mb-3 bg-green-500'>Thêm cụm rạp</Button>
                    </NavLink>
                </div>
            )}
            <div className='mb-3 flex flex-col items-start justify-between space-y-1 sm:flex-row sm:space-y-0'>
                <Search
                    onChange={handleSearchOnchange}
                    defaultValue={paramsObj.search}
                    placeholder='Tìm cụm rạp'>
                </Search>
            </div>
            <Table dataSource={dataSource} columns={headerColums} />
        </>
    )
}

export default AdminCumRapPage


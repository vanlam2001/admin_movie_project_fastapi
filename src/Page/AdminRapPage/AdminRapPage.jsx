import { Button, Input, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { headerColums } from './utils'
import { useDispatch } from 'react-redux'
import { rapService } from '../../service/rapService'
import { setLoadingOff, setLoadingOn } from '../../toolkit/spinnerSlice'
import { NavLink, useSearchParams } from 'react-router-dom'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import qs from "qs";
import { localUserServ } from '../../service/localService'
const { Search } = Input
const AdminRapPage = () => {
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
            rapService.getSearchRap(value, isGroupCode)
                .then((res) => {
                    setRapList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    setRapList([])
                })
        } else {
            fetchRapList(isGroupCode);
        }
    }

    // set list rap
    const [rapList, setRapList] = useState([]);
    useEffect(() => {
        fetchRapList();
    }, [])

    const fetchRapList = (isGroupCode) => {
        dispatch(setLoadingOn())
        rapService.getRapList(isGroupCode)
            .then((res) => {
                dispatch(setLoadingOff())
                setRapList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // delete rap 
    const handleDeleteRap = (rap) => {
        rapService.deleteRap(rap)
            .then(() => {
                fetchRapList(rapList);
                message.success('Rạp đã được xóa')
            })
            .catch((err) => {
                message.error(err.response.data)
            })
    }

    const dataSource = rapList?.map((item, index) => {
        return {
            key: index,
            maHeThongRap: item.maHeThongRap,
            tenHeThongRap: item.tenHeThongRap,
            biDanh: item.biDanh,
            logo: item.logo,
            action: (
                <>
                    <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0'>
                        <NavLink to={`/admin-update-rap/${item.maHeThongRap}`}>
                            <button className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
                                <FaPencilAlt />
                            </button>
                        </NavLink>
                        <button
                            onClick={() => handleDeleteRap(item.maHeThongRap)}
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
                    <NavLink to={'/admin-them-rap'}>
                        <Button type='primary' className='mb-3 bg-green-500'>Thêm rạp</Button>
                    </NavLink>
                </div>
            )}

            <div className='mb-3 flex flex-col items-start justify-between space-y-1 sm:flex-row sm:space-y-0'>
                <Search
                    onChange={handleSearchOnchange}
                    defaultValue={paramsObj.search}
                    placeholder='Tìm rạp'>
                </Search>
            </div>
            <Table dataSource={dataSource} columns={headerColums} />
        </>
    )
}

export default AdminRapPage


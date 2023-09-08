import { Button, Table, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { headerColums } from './utils'
import { useDispatch } from 'react-redux'
import { setLoadingOff, setLoadingOn } from '../../toolkit/spinnerSlice'
import { bannerService } from '../../service/bannerService'
import { NavLink, useSearchParams } from 'react-router-dom'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import Spinner from '../../Components/Spinner/Spinner'
import { localUserServ } from '../../service/localService'
import qs from "qs";
const { Search } = Input

const AdminBannerPage = () => {
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
            bannerService.getSearchBanner(value, isGroupCode)
                .then((res) => {
                    setBannerList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    setBannerList([])
                })
        } else {
            fetchBannerList(isGroupCode);
        }
    }


    // Set Banner 
    const [bannerList, setBannerList] = useState([]);

    useEffect(() => {
        fetchBannerList();
    }, [])

    const fetchBannerList = (isGroupCode) => {
        dispatch(setLoadingOn())
        bannerService.getBannerList(isGroupCode)
            .then((res) => {
                dispatch(setLoadingOff())
                setBannerList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // delete Banner
    const handleDeleteBanner = (banner) => {
        bannerService.deleteBanner(banner)
            .then(() => {
                fetchBannerList(bannerList);
                message.success('Banner đã được xóa')
            })
            .catch((err) => {
                console.log(err)
                message(err.response.data);
            })
    }

    const dataSoucre = bannerList?.map((item, index) => {
        return {
            key: index,
            maBanner: item.maBanner,
            tenBanner: item.tenBanner,
            banner: item.banner,
            action: (
                <>
                    <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0'>
                        <NavLink to={`/admin-update-banner/${item.maBanner}`}>
                            <button className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
                                <FaPencilAlt />
                            </button>
                        </NavLink>

                        <button
                            onClick={() => handleDeleteBanner(item.maBanner)}
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
                    <NavLink to={"/admin-add-banner/"}>
                        <Button type="primary" className='mb-3 bg-green-500'>Thêm Banner</Button>
                    </NavLink>
                </div>
            ) : <> </>}
            <div className='mb-3 flex flex-col items-start justify-between space-y-1 sm:flex-row sm:space-y-0'>
                <Search
                    onChange={handleSearchOnchange}
                    defaultValue={paramsObj.search}
                    placeholder='Tìm tên banner'>
                </Search>

            </div>
            <Spinner></Spinner>
            <Table dataSource={dataSoucre} columns={headerColums} />
        </>
    )
}

export default AdminBannerPage
import { Button, Input, Table, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { adminService } from '../../service/adminService';
import { headerColums } from './utils';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Spinner from '../../Components/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../../toolkit/spinnerSlice';
import qs from "qs";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { localUserServ } from '../../service/localService';
const { Search } = Input;

const AdminUserPage = () => {
    const dispatch = useDispatch();
    // chức năng tìm kiếm 
    const stringSearch = window.location.search.substring(1);
    let paramsObj = qs.parse(stringSearch)
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useSearchParams();
    const [isGroupCode] = useState(() => {
        if (paramsObj.isGroupCode) {
            return paramsObj.isGroupCode;
        } else {
            return 'search'
        }
    })

    // Set User
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, [])

    const fetchUserList = (isGroupCode) => {
        dispatch(setLoadingOn())
        adminService.getUserList(isGroupCode)
            .then((res) => {
                dispatch(setLoadingOff());
                setUserList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // chức năng xoá 
    const handleDeleteUser = (username) => {
        adminService.deleteUser(username)
            .then(() => {
                fetchUserList(userList);
                message.success('Người dùng đã được xoá');
            })
            .catch((err) => {
                console.log(err);
                message.error(err.response.data);
            });
    };


    const handleSearchOnchange = (keywords) => {
        let value = keywords.target.value;
        setSearchValue({
            search: value,
            isGroupCode: isGroupCode
        });
        if (value) {
            adminService.getSearchUser(value, isGroupCode)
                .then((res) => {
                    setUserList(res.data);
                })
                .catch((err) => {
                    console.log(err)
                    setUserList([])
                })
        } else {
            fetchUserList(isGroupCode);
        }
    }


    const dataSource = userList?.map((item, index) => {
        return {
            key: index,
            username: item.username,
            full_name: item.full_name,
            email: item.email,
            phone_number: item.phone_number,
            maLoaiNguoiDung: item.maLoaiNguoiDung,
            action: (
                <>
                    <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0'>
                        <NavLink to={`/admin-update-user/${item.username}`}>
                            <button className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
                                <FaPencilAlt />
                            </button>
                        </NavLink>

                        <button
                            onClick={() => handleDeleteUser(item.username)}
                            className='p-2 text-base text-white bg-red-500 mx-1 rounded'
                        >
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
                    <NavLink to={'/admin-add-user'}>
                        <Button type="primary" className='mb-3 bg-green-500'>Thêm người dùng</Button>
                    </NavLink>
                </div>
            ) : <></>}
            <div className='mb-3 flex flex-col items-start justify-between space-y-1 sm:flex-row sm:space-y-0'>

                <Search onChange={handleSearchOnchange}
                    defaultValue={paramsObj?.search}
                    placeholder='Tìm tài khoản'
                ></Search>
            </div>
            <Spinner></Spinner>
            <Table dataSource={dataSource} columns={headerColums}></Table>
        </>
    )
}

export default AdminUserPage
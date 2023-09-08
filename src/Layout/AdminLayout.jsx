import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    BoldOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    CalendarOutlined

} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Dropdown } from 'antd';
import { localUserServ } from '../service/localService';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const menu = [
    getItem(<NavLink to={'/admin-lich-chieu'}>Quản lý Lịch chiếu</NavLink>, '0', <CalendarOutlined />),
    getItem(<NavLink to={'/admin-users'}>Quản lý người dùng dùng</NavLink>, '1', <UserOutlined />),
    getItem(<NavLink to={'/admin-movie'}>Quản lý phim</NavLink>, '2', <DesktopOutlined />),
    getItem(<NavLink to={'/admin-banner'}>Quản lý banner</NavLink>, '3', <BoldOutlined />),
    getItem(<NavLink to={'/admin-rap'}>Quản lý rạp</NavLink>, '4', <TeamOutlined />),
    getItem(<NavLink to={'/admin-cum-rap'}>Quản lý cụm rạp</NavLink>, '5', <TeamOutlined />),

];

const items = [
    {
        key: "1",
        label:
            <div onClick={() => {
                localUserServ.remove();
                window.location.href = '/';
            }}>
                Đăng xuất
            </div>
    }
]

const AdminLayout = ({ Component }) => {
    const isInfoLogin = localUserServ.get();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menu} />
            </Sider>
            <Layout className='site-layout'>
                <Header
                    style={{
                        padding: '16px',
                        background: colorBgContainer,
                        height: 'auto'
                    }}
                >
                    <div className='flex flex-col sm:flex-row items-center justify-between h-full'>
                        <div className='text-xl font-bold text-[#000000e0] sm:text-xl'>
                            Admin Movie
                        </div>
                        {isInfoLogin ? (
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                            >
                                <Button>Hello, {isInfoLogin.full_name}</Button>
                            </Dropdown>
                        ) : (
                            <div>
                                <NavLink to={'/login'}>
                                    <Button>Đăng Nhập</Button>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Component />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;
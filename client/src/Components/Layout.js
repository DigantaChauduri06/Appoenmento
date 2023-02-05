import './Layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';


function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768)
    const location = useLocation()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const UserMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-4-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-3-line'
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'ri-user-2-line'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-user-3-line'
        },
    ];
    const DoctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-4-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-3-line'
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: 'ri-user-3-line'
        },
    ];
    const AdminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-4-line'
        },

        {
            name: 'Users',
            path: '/admin/users',
            icon: 'ri-user-4-line'
        },

        {
            name: 'Doctors',
            path: '/admin/doctors',
            icon: 'ri-hospital-line'
        },

        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-user-3-line'
        },
    ];

    const MenuToBeRender = ({ menu }) => {
        const isActive = location.pathname === menu.path

        return (
            <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                <i className={menu.icon}></i>
                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
            </div>
        )
    }

    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className={`${collapsed ? 'collapsed-sidebar' : 'sidebar'} `}>
                    <div className="sidebar-header">
                        <h1 style={{ color: "#fff", fontWeight: '700' }}>AP</h1>
                    </div>
                    <div className='menu'>
                        {/*! change the user?.isAdmin to !user?.isAdmin*/}
                        {
                            user?.isAdmin && AdminMenu.map(menu => <MenuToBeRender key={menu.name} menu={menu} />)
                        }
                        {
                            user?.isDoctor && DoctorMenu.map(menu => <MenuToBeRender key={menu.name} menu={menu} />)
                        }
                        {
                            !user?.isAdmin && !user?.isDoctor && UserMenu.map(menu => <MenuToBeRender key={menu.name} menu={menu} />)
                        }
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate("/login")
                        }}>
                            <i className='ri-logout-box-r-line'></i>
                            {!collapsed && <Link to='/logout'>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        {!collapsed && <i className="ri-close-fill" style={{ fontSize: '30px', color: "#111", cursor: "pointer" }}
                            onClick={() => setCollapsed(true)}
                        ></i>}
                        {
                            collapsed && <i className="ri-menu-2-fill" style={{ fontSize: '30px', color: "#111", cursor: "pointer" }}
                                onClick={() => setCollapsed(false)}></i>
                        }
                        <div className='d-flex align-items-center' >
                            <Badge count={user?.unseenNotification?.length}
                                onClick={() => navigate("/notifications")}>
                                <i className="ri-notification-4-line" style={{ fontSize: '22px', color: "#111", cursor: "pointer", marginRight: "15px" }}></i>
                            </Badge>
                            <Link to="/profile" className='anchor px-3'>{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>

        </div>
    )
}
export default Layout;
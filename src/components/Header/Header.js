// Importing necessary dependencies from React and other libraries
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import decode from "jwt-decode";
import { toast } from "react-toastify";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { BsBlockquoteLeft } from "react-icons/bs";
import { FaInfo } from 'react-icons/fa';
import NotificationList from './NotificationList';

/** @module Header */

/**
 * Hiển thị thanh Header
 * @param {Object} props
 * @param {boolean} props.theme - `theme` nhận giá trị `true` nếu là `dark`, nhận `false` nếu là `light`
 * @param {Function} props.themeHandeler - hàm xử lí thay đổi `theme`
 * @returns {JSX.Element}
 */
const Header = ({ theme, themeHandeler }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	// const [newNotification, setNewNotification] = useState(true);

	// Initializing constants using the 'useNavigate', 'useLocation', and 'useDispatch' hooks
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	// Defining a callback function to handle user logout

	/**
	 * Khi nhấn nút đăng xuất, gửi action để cập nhật store và điều hướng tới trang đăng nhập, thông báo đăng xuất thành công
	 */
	const handleLogout = useCallback(() => {
		// Dispatching an action to update the state and navigate to the home page

		dispatch({ type: 'LOGOUT' });
		navigate('/');
		// Displaying a success message using the 'toast' function from the 'react-toastify' library

		toast.success('logged out successfully');
	}, [dispatch, navigate]);

	// Defining a side effect that checks if the user's token has expired

	useEffect(() => {
		// Extracting the token from the user object

		const token = user?.token;
		if (token) {
			// Decoding the token to get the expiration time

			const decodedToken = decode(token);
			// Logging out the user if the token has expired

			if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
		}
		// Updating the user object stored in the local storage

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [user?.token, handleLogout, location]);

	// Defining a function to handle user login

	/** Điều hướng tới trang đăng nhập */
	const handleLogin = () => {
		navigate('/');
	};

	//Lấy thông tin các thông báo từ Novu
	const handleNotificationClick = (message) => {
		// setNewNotification(false);
		if (message?.cta?.data?.url) {
			window.location.href = message.cta.data.url;
		}
	};

	return (
		<header className='header'>
			<NovuProvider
				subscriberId={user?.result?._id}
				applicationIdentifier={process.env.REACT_APP_NOVU_ID_FROM_ADMIN_PANEL}
				initialFetchingStrategy={{
					fetchNotifications: true,
					fetchUserPreferences: true,
				}}>
				<div className='header_container'>
					<div className='header_left'>
						<Link to='#'>
							<h3
								className='header_brand'
								style={{ color: '#964bdb' }}>
								MoonShine
							</h3>
						</Link>
					</div>
					<div className='header_right'>
						{user ? (
							<>
								<button
									onClick={() => navigate('/gallery')}
									className='header_theme_button'
									style={{
										backgroundColor: theme ? '#fff' : '#efefef',
										color: theme ? '#000' : '#000',
										margin: '0rem 1rem',
									}}>
									<BsBlockquoteLeft />
								</button>
								<button
									onClick={themeHandeler}
									className='header_theme_button'
									style={{
										backgroundColor: theme ? '#fff' : '#efefef',
										color: theme ? '#000' : '#000',
										margin: '0rem 1rem',
									}}>
									{theme ? (
										<div className='header_theme_button'>
											<BsFillSunFill />
										</div>
									) : (
										<div className='header_theme_button'>
											<BsFillMoonFill />
										</div>
									)}
								</button>
								<PopoverNotificationCenter
									onNotificationClick={handleNotificationClick}
									listItem={(notification) => (
										<NotificationList
											notification={notification}
											theme={theme}
										/>
									)}
									colorScheme={theme ? 'dark' : 'light'}>
									{({ unseenCount }) => (
										<NotificationBell unseenCount={unseenCount} />
									)}
								</PopoverNotificationCenter>
								<button
									className='header_theme_button'
									style={{ margin: '0rem 1rem' }}
									onClick={handleLogout}>
									<GrLogout />
								</button>
								<button
									onClick={() => navigate('/info')}
									className='header_theme_button'
									style={{
										backgroundColor: theme ? '#fff' : '#efefef',
										color: theme ? '#000' : '#000',
										margin: '0rem 1rem',
									}}>
									<FaInfo />
								</button>
							</>
						) : (
							<button
								className='header_button'
								onClick={handleLogin}>
								Login
							</button>
						)}
					</div>
				</div>
			</NovuProvider>
		</header>
	);
};

export default Header;

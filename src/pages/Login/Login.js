import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch } from "react-redux";
import { signin } from "../../actions/auth";
import Loader from "../../components/Loader/Loader";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

/**
 * @typedef {Object} LoginFormType
 * @property {String} email email đăng nhập
 * @property {String} password mật khẩu
 */

/**
 * Hiển thị giao diện đăng nhập
 * @returns {JSX.Element}
 */
const Login = () => {
	const [formValue, setFormValue] = useState({
		email: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [isText, setIsText] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	/**
	 * Thay đổi giá trị state `formValue` khi có thay đổi từ input
	 * @param {Event} e - Sự kiện thay đổi giá trị
	 * @returns {void}
	 */
	const handleChange = (e) => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	};

	/**
	 * Xử lí hiển thị mật khẩu dạng `text` hoặc `password`. Thay đổi giá trị state `isText = !isText`
	 */
	const showHandler = () => {
		setIsText((prev) => !prev);
	};

	/**
	 * Khi nhấn nút gửi form:
	 * - Thay đổi giá trị state `isLoading = true`
	 * - Gọi action `signin`. Khi action thực hiện xong, đổi giá trị state `isLoading = false`
	 * @param {LoginFormType} e
	 * @returns {void}
	 */
	const handleFormSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(signin(formValue, navigate)).finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<div className='auth_container'>
			<div className='auth_header'>
				<h2>MoonShine</h2>
			</div>
			<form onSubmit={handleFormSubmit} className='auth_form'>
				<label for='email'>Email</label>
				<input
					type='text'
					className='auth_input'
					id='email'
					value={formValue.email}
					name='email'
					onChange={handleChange}
					placeholder='Enter Your Email'
				/>
				<label for='password'>Password</label>
				<input
					type={isText ? "text" : "password"}
					className='auth_input'
					id='password'
					value={formValue.password}
					name='password'
					onChange={handleChange}
					placeholder='Enter Your Password'
				/>
				{isLoading ? null : (
					<div className='auth_icon' onClick={showHandler}>
						{isText ? <AiFillEye /> : <AiFillEyeInvisible />}
					</div>
				)}
				<div className='auth_button_container'>
					{isLoading ? (
						<Loader />
					) : (
						<button
							className='auth_button'
							disabled={!(formValue.email && formValue.password)}
						>
							Login
						</button>
					)}
				</div>
				<Link to='/signup'>
					<p>Don't have an account? Signup here</p>
				</Link>
			</form>
		</div>
	);
};

export default Login;

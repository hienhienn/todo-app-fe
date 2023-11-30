import * as api from "../common/api";
import toast from "react-hot-toast";

/**
 * Đăng nhập. Luồng xử lý chính:
 * - Gọi api đăng nhập từ phía back-end
 * - Lấy thông tin back-end trả về gửi lên store
 * - Điều hướng tới trang `/home`
 * - Thông báo đăng nhập thành công
 * Nếu xảy ra lỗi, thông báo lỗi xảy ra.
 * @param {{
 *  email: string;
 *  password: string
 * }} formValue - phần body của request gửi cho back-end
 * @param {Function} navigate - Điều hướng tới trang chỉ định
 * @returns {void}
 */
export const signin = (formValue, navigate) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formValue);
		dispatch({ type: "AUTH", payload: data });
		navigate("/home");
		toast.success("loggedin successfully!!");
	} catch (error) {
		console.log("signin error", error);
		toast.error(error.response.data.message);
	}
};

/**
 * Đăng ký. Luồng xử lý chính:
 * - Gọi api đăng ký từ phía back-end
 * - Lấy thông tin back-end trả về gửi lên store
 * - Điều hướng tới trang `/home`
 * - Thông báo đăng nhập thành công
 * Nếu xảy ra lỗi, thông báo lỗi xảy ra.
 * @param {{
 *  first_name: string;
 *  last_name: string;
 *  email: string;
 *  password: string;
 *  confirm_password: string;
 * }} formvalue - phần body của request gửi cho back-end
 * @param {Function} navigate - điều hướng tới trang chỉ định
 * @returns {void}
 */
export const signup = (formvalue, navigate) => async (dispatch) => {
	try {
		const { data } = await api.signUP(formvalue);
		dispatch({ type: "AUTH", payload: data });
		navigate("/home");
		toast.success("user created successfully");
	} catch (error) {
		console.log("signup error", error);
		toast.error(error.response.data.message);
	}
};

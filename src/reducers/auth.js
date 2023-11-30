/**
 * Quản lý thông tin xác thực của người dùng
 * @param {{authData: any}} state
 * @param {{ type: 'AUTH' | 'LOGOUT'; payload?: any}} action
 * @returns
 */
const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case "AUTH":
			localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
			return { ...state, authData: action?.payload };
		case "LOGOUT":
			localStorage.clear();
			return { ...state, authData: null };
		default:
			return state;
	}
};

export default authReducer;

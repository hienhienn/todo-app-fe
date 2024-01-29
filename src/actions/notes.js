import * as api from "../common/api";
import { toast } from "react-toastify";

/**
 * @typedef {Object} SendSmsParamsType
 * @property {String} title tiêu đề của tin nhắn cần gửi
 * @property {String} description nội dung tin nhắn cần gửi
 * @property {String} phone số điện thoại nhận tin nhắn
 * @property {String} noteId id của ghi chú 
 */

/**
 * @typedef {Object} SendEmailParamsType
 * @property {String} title tiêu đề của tin nhắn cần gửi
 * @property {String} description nội dung tin nhắn cần gửi
 * @property {String} email email nhận tin nhắn
 * @property {String} noteId id của ghi chú 
 */

/**
 * @typedef {Object} DeleteInAppParamsType
 * @property {String} title tiêu đề của thông báo
 * @property {String} description nội dung thông báo
 * @property {String} userId id người dùng
 * @property {String} message thông báo
 */

/** @module actions/notes */

/**
 * Lấy thông tin tất cẩ các ghi chú.
 * Luồng xử lý chính:
 * - Gọi api từ phía back-end
 * - Lấy thông tin back-end trả về gửi lên store
 * Nếu xảy ra lỗi, thông báo lỗi xảy ra.
 * @function
 * @returns
 */
export const getNotes = () => async (dispatch) => {
	try {
		const { data } = await api.fetchNotes();
		dispatch({ type: "FETCH_ALL", payload: data });
	} catch (error) {
		console.log("getNotes error", error);
	}
};

/**
 * Tạo ghi chú.
 * Luồng xử lý chính:
 * - Gọi api từ phía back-end
 * - Lấy thông tin back-end trả về gửi lên store
 * - Thông báo đã tạo ghi chú
 * Nếu xảy ra lỗi, thông báo lỗi xảy ra.
 * @function
 * @param {NoteForm} note - thông tin ghi chú cần tạo
 * @returns
 */
export const createNote = (note) => async (dispatch) => {
	try {
		const { data } = await api.createNote(note);
		dispatch({ type: "CREATE", payload: data });
		toast.success("note added!!");
	} catch (error) {
		console.log("createNote error", error);
	}
};

/**
 * Cập nhật thông tin ghi chú thông qua `id` của ghi chú.
 * Luồng xử lý chính:
 * - Gọi api từ phía back-end
 * - Lấy thông tin back-end trả về gửi lên store
 * - Thông báo đã cập nhật ghi chú
 * Nếu xảy ra lỗi, thông báo lỗi xảy ra.
 * @function
 * @param {string} id - id của ghi chú
 * @param {NoteForm} note - thông tin cần cập nhật
 * @returns
 */
export const updateNote = (id, note) => async (dispatch) => {
	try {
		const { data } = await api.updateNote(id, note);
		dispatch({ type: "UPDATE", payload: data });
		toast.success("note updated!!");
	} catch (error) {
		console.log("updatedNote error", error);
	}
};

/**
 * Xoá ghi chú thông qua `id` của ghi chú.
 * Luồng xử lý chính:
 * - Gọi api từ phía back-end
 * - Lấy thông tin back-end trả về gửi lên store
 * - Thông báo đã xoá ghi chú
 * Nếu xảy ra lỗi, thông báo lỗi xảy ra.
 * @function
 * @param {string} id - id của ghi chú
 * @returns
 */
export const deleteNote = (id) => async (dispatch) => {
	try {
		await api.deleteNote(id);
		dispatch({ type: "DELETE", payload: id });
		toast.warning("note deleted!!");
	} catch (error) {
		console.log("deleteNote error", error);
	}
};



/**
 * Gửi tin nhắn SMS: Gọi api từ back-end và thông báo thành công/thất bại
 * @function
 * @param {SendSmsParamsType} note - thông tin tin nhắn cần gửi
 * @returns
 */
export const sendSmsNotification = (note) => async (dispatch) => {
	try {
		const response = await api.sendSms(note);
		console.log("sms notification", response);
	} catch (error) {
		console.log("sendSms error", error);
		toast.error(error.response.data.message);
	}
};

/**
 * Gửi email: Gọi api từ back-end và thông báo thành công/thất bại
 * @function
 * @param {SendEmailParamsType} note - thông tin email cần gửi
 * @returns
 */
export const sendEmailNotification = (note) => async (dispatch) => {
	try {
		const response = await api.sendEmail(note);
		console.log("email notification", response);
	} catch (error) {
		console.log("sendEmail error", error);
		toast.error(error.response.data.message);
	}
};

/**
 * Gửi thông báo in-app về việc xoá ghi chú: Gọi api từ back-end và thông báo thành công/thất bại
 * @function
 * @param {DeleteInAppParamsType} note
 * @returns
 */
export const deleteTodoInApp = (note) => async (dispatch) => {
	try {
		const response = await api.deleteInApp(note);
		console.log("deleteInApp response", response);
	} catch (error) {
		console.log("deleteTodoInApp error", error);
	}
};

/**
 * Đánh dấu ghi chú đã hoàn thành/chưa hoàn thành:
 * - Gọi api từ back-end
 * - Lấy thông tin back-end trả về và gửi lên store
 * - Thông báo nếu xảy ra thất bại
 * @function
 * @param {string} id - id của ghi chú
 * @returns
 */
export const toggleTodo = (id) => async (dispatch) => {
	try {
		const res = await api.updateNoteChecked(id);

		dispatch({ type: "TOGGLE_DONE", payload: res.data });
	} catch (error) {
		console.log("Error while calling getAllTodos API ", error.message);
	}
};

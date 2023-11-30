import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Note from "../../components/Note/Note";
import "./home.css";
import { getNotes, createNote, updateNote } from "../../actions/notes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TiPlus } from "react-icons/ti";
import toast from "react-hot-toast";

/**
 * @typedef {Object} NoteForm
 * @property {String} title tiêu đề của ghi chú
 * @property {String} description nội dung ghi
 * @property {Date | null} date
 */

/**
 * Giao diện chính của ứng dụng
 * @returns {JSX.Element}
 */
const Home = () => {
	const [inputText, setInputText] = useState({
		title: "",
		description: "",
		date: null,
	});
	const [currentId, setCurrentId] = useState(null);
	const [addMore, setAddMore] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme")
	);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [notesByDate, setNotesByDate] = useState({});

	const dispatch = useDispatch();

	const notes = useSelector((state) => state.notes);
	const user = JSON.parse(localStorage.getItem("profile"));
	const updatedNote = useSelector((state) =>
		currentId ? state.notes.find((c) => c._id === currentId) : null
	);

	useEffect(() => {
		if (theme) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [theme]);

	/**
	 * Thay đổi theme của ứng dụng, sử dụng `localStorage` để lưu trữ giá trị `theme`.
	 * `theme` nhận giá trị `true` nếu là `dark`, nhận `false` nếu là `light`
	 */
	const themeHandeler = () => {
		const newTheme = !theme;
		// Updating the theme state and storing it in the local storage

		setTheme(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");
		// Toggling the class of the 'body' element to update the theme of the application

		document.body.classList.toggle("dark-mode");
	};

	/**
	 * Giá trị giờ hiện tại
	 * @type {number}
	 */
	const currentHour = new Date().getHours();

	// set the greeting based on the current hour
	/**
	 * Lời chào hiển thị dựa trên giờ hiện tại
	 */
	let greeting;
	if (currentHour >= 5 && currentHour < 10) {
		greeting = "Good morning";
	} else if (currentHour >= 10 && currentHour < 15) {
		greeting = "Good afternoon";
	} else if (currentHour >= 15 && currentHour < 19) {
		greeting = "Good evening";
	} else {
		greeting = "Good night";
	}

	useEffect(() => {
		dispatch(getNotes());
	}, [dispatch, currentId]);

	useEffect(() => {
		if (updatedNote) {
			setInputText(updatedNote);
		}
	}, [updatedNote]);

	/**
	 * Thay đổi giá trị của state `inputText` khi có sự thay đổi các của input trên giao diện
	 * @param {Event} e - Sự kiện thay đổi giá trị
	 * @returns {void}
	 */
	const changeHandeler = (e) => {
		setInputText({
			...inputText,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		/**
		 * Sắp xếp các notes theo thứ tự ngày tăng dần
		 */
		const sortedNotes = [...notes].sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});

		/**
		 * Nhóm các notes theo ngày tới hạn
		 */
		const notesByDate = sortedNotes.reduce((acc, note) => {
			const noteDate = new Date(note.date);
			const dateStr = noteDate.toDateString();
			if (!acc[dateStr]) {
				acc[dateStr] = [note];
			} else {
				acc[dateStr].push(note);
			}
			return acc;
		}, {});
		setNotesByDate(notesByDate);
	}, [notes]);

	/**
	 * Xử lí khi nhấn nút gửi ghi chú:
	 * - Khi thiếu các trường `title`, `date` thì thông báo các trường đó là bắt buộc
	 * - Trường hợp chỉnh sửa ghi chú: Gọi action `updateNote` và thông báo cập nhật thành công
	 * - Trường hợp thêm ghi chú: Gọi action `createNote` và thông báo thêm thành công
	 * Sau đó xoá các giá trị đã nhập tại input
	 * @param {Event} e
	 * @returns {void}
	 */
	const handleSubmitNote = (e) => {
		e.preventDefault();
		if (!inputText.title && !inputText.date) {
			return toast.error("Title and date are required!", {
				icon: "👏",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			}); // do nothing if title or date is empty
		}
		inputText.date = selectedDate.toISOString();
		if (currentId) {
			dispatch(updateNote(currentId, inputText));
			toast("Todo updated!", {
				icon: "👏",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			setIsEditing(false);
		} else {
			dispatch(createNote({ ...inputText, message: "created" }));
			toast("Todo created!", {
				icon: "👏",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
		}
		handleClearNote();
	};

	/**
	 * Xoá nội dung của note
	 */
	const handleClearNote = () => {
		setCurrentId(null);
		setInputText({ title: "", description: "" });
		setSelectedDate(null);
	};

	/**
	 * Xử lí khi nhấn nút Add more, nếu đang hiển thị phần nội dụng thì ẩn đi, ngược lại, khi đang ẩn phần nội dung thì hiển thị lên màn hình.
	 * @param {Event} e
	 */
	const addMoreHandler = (e) => {
		e.preventDefault();
		setAddMore((prev) => !prev);
	};

	/**
	 * Thay đổi giá trị của trường `selectedDate` theo tham số truyền vào
	 * @param {Date} date
	 */
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	/**
	 * Xử lí khi nhấn nút + Create A Todo, nếu đang hiển thị form thì ẩn đi, ngược lại, khi đang ẩn form thì hiển thị lên màn hình.
	 */
	const addDetailsHandler = () => {
		setShowForm((prev) => !prev);
	};

	return (
		<main className='home'>
			<Header theme={theme} themeHandeler={themeHandeler} />
			<div className='home_container'>
				<div className='home_top_heading'>
					<h1>
						{greeting}
						<img
							style={{ height: "3rem", widht: "auto" }}
							src='https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif'
							alt='waving-hand-emoji'
						/>
					</h1>
					<h3>{user?.result?.name}</h3>
				</div>

				<div
					className='home_container_top'
					style={{ backgroundColor: theme ? "#282834" : "#ececec" }}
				>
					<div className='home_container_heading' onClick={addDetailsHandler}>
						<div className='add_icon'>
							<TiPlus />
						</div>
						<h3 className='form_heading'>Create A Todo</h3>
					</div>
					{showForm && (
						<form className='home_form_container' onSubmit={handleSubmitNote}>
							<div className='home_form_top'>
								<div className='home_input_container'>
									<input
										type='text'
										value={inputText.title}
										name='title'
										onChange={changeHandeler}
										className='form_input'
										placeholder='Title'
									/>
									<DatePicker
										selected={selectedDate}
										name='date'
										onChange={handleDateChange}
										placeholderText='Select date'
										className='form_date_picker'
										dateFormat='dd/MM/yyyy'
									/>
									<button className='form_add_more' onClick={addMoreHandler}>
										Add more
									</button>
									<button className='form_add_more'>
										{isEditing ? "Update" : "Create"}
									</button>
								</div>
							</div>
							{addMore && (
								<textarea
									type='text'
									value={inputText.description}
									name='description'
									onChange={changeHandeler}
									className='form_textarea'
									placeholder='Description'
								/>
							)}
						</form>
					)}
				</div>
				<div className='home_container_bottom'>
					{Object.entries(notesByDate).length > 0 ? (
						Object.entries(notesByDate).map(([dateStr, notes]) => {
							// Filter notes by user ID
							const userNotes = notes.filter(
								(note) => note.creator === user?.result?._id
							);
							return userNotes.length > 0 ? (
								<div key={dateStr}>
									<div className='note_row'>
										<h2
											style={{ backgroundColor: theme ? "#282834" : "#e6e6e6" }}
											className='note_row_title'
										>
											{new Date(dateStr).toLocaleDateString()}
										</h2>
										{userNotes.map((note) => (
											<Note
												key={note._id}
												item={note}
												setCurrentId={setCurrentId}
												setShowForm={setShowForm}
												setIsEditing={setIsEditing}
												setSelectedDate={setSelectedDate}
												theme={theme}
											/>
										))}
									</div>
								</div>
							) : null;
						})
					) : (
						<h2>No notes found for selected date</h2>
					)}
				</div>
			</div>
		</main>
	);
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quote.css";
import { FcTodoList } from "react-icons/fc";

/** @module Quote */

/**
 * Hiển thị những câu trích dẫn random, lấy từ trang {@link https://type.fit/api/quotes}
 * @param {Object} props
 * @param {boolean} props.refresh - Khi state refresh thay đổi, sẽ lấy 1 câu quote mới hiển thị lên màn hình
 * @returns {JSX.Element}
 */
const Quote = ({ refresh }) => {
	const [quote, setQuote] = useState("");
	const navigate = useNavigate();

	const currentHour = new Date().getHours();

	// set the greeting based on the current hour
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
		fetch("https://type.fit/api/quotes")
			.then((response) => response.json())
			.then((data) => {
				const randomIndex = Math.floor(Math.random() * data.length);
				setQuote(data[randomIndex]);
			});
	}, [refresh]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const date = new Date();
			const hours = date.getHours().toString().padStart(2, "0");
			const minutes = date.getMinutes().toString().padStart(2, "0");
			const time = `${hours}:${minutes}`;
			document.getElementById("time").textContent = time;
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	/**
	 * Điều hướng đến trang `/home`
	 */
	const quoteButtonHandler = () => {
		navigate("/home");
	};

	return (
		<div className='container'>
			<div className='greeting'>{greeting}</div>
			<div
				id='time'
				className='time'
				style={{
					fontSize: "7rem",
					fontWeight: "500",
					margin: "2rem 0rem",
					color: "white",
				}}
			></div>
			<div className='quote'>{quote.text}</div>
			<div className='author'>- {quote.author || "Unknown"}</div>
			<button
				className='qote_button'
				style={{ position: "absolute", top: "2rem", right: "2rem" }}
				onClick={quoteButtonHandler}
			>
				<FcTodoList />
			</button>
		</div>
	);
};

export default Quote;

import React, { useEffect, useState } from "react";
import Quote from "../../components/Quote/Quote";
import "./landscape.css";
import { FiRefreshCcw } from "react-icons/fi";

/** @module Landscape */

/**
 * Tổng số hình ảnh có thể có trong collection
 * @constant
 * @type {number}
 */
const numImagesAvailable = 988; //how many photos are total in the collection

/**
 * Số hình ảnh có thể hiển thị trong cùng lúc
 * @constant
 * @type {number}
 */
const numItemsToGenerate = 1; //how many photos you want to display

/**
 * Chiều rộng của hình ảnh (đơn vị pixels)
 * @constant
 * @type {number}
 */
const imageWidth = 1920; //image width in pixels

/**
 * Chiều cao của hình ảnh (đơn vị pixels)
 * @constant
 * @type {number}
 */
const imageHeight = 1080; //image height in pixels

/**
 * ID của collection hiển thị từ url gốc, là collection Beach & Coastal
 * @constant
 * @type {number}
 */
const collectionID = 30697288; //Beach & Coastal, the collection ID from the original url

/**
 * Thay đổi ảnh nền thành một ảnh nền bất kì trên trang web {@link https://source.unsplash.com/}
 * @function
 * @param {number} randomNumber số thứ tự của ảnh nền
 */
function renderGalleryItem(randomNumber) {
	fetch(
		`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`
	).then((response) => {
		let body = document.querySelector("body");
		body.style.backgroundImage = `url(${response.url})`;
	});
}

/**
 * Hiển thị giao diện ảnh nền phong cảnh và thời gian hiện tại và câu nói truyền cảm hứng ở giữa màn hình.
 * Khi nhấn vào nút refresh góc phải màn hình, sẽ thay đổi ngẫu nhiên ảnh nền và câu quote mới
 * @returns {JSX.Element}
 */
const Landscape = () => {
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
		renderGalleryItem(randomImageIndex);

		return () => {
			let body = document.querySelector("body");
			body.style.backgroundImage = "";
		};
	}, []);

	/**
	 * Tạo số thứ tự mới và thay đổi ảnh nền
	 */
	const refreshImage = () => {
		let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
		renderGalleryItem(randomImageIndex);
		setRefresh((prev) => !prev);
	};

	return (
		<>
			<Quote refresh={refresh} />
			<button
				className='refresh_button'
				style={{ position: "absolute", top: "2rem", right: "7rem" }}
				onClick={refreshImage}
			>
				<FiRefreshCcw />
			</button>
		</>
	);
};

export default Landscape;

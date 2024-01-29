/**
 * @format
 * @module Info
 */

import { useEffect, useState } from 'react';
import './info.css';

/**
 * Giới thiệu thông tin của app
 * @returns {JSX.Element}
 */
const Info = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')
	);

	useEffect(() => {
		if (theme) {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
	}, [theme]);

	return (
		<div className='info-container'>
			<h1>
				Chức năng của <i>Moonshine</i>:
			</h1>
			<ol>
				<li>
					Hiển thị một câu trích dẫn có thể truyền cảm hứng, hiển thị thời gian
					hiện tại và hình nền ngẫu nhiên.
				</li>
				<li>Lên kế hoạch cho các ngày.</li>
				<li>
					Gửi lời nhắc cho bạn bè và đồng nghiệp về các công việc thông qua SMS
					và Email.
				</li>
				<li>App có sẵn ở mọi nơi.</li>
			</ol>
			<h1>Công nghệ sử dụng</h1>
			<h2>Client-side</h2>
			<p>
				Novu, React, Redux, DotEnv, Axios, JWTEncode, Moment, React-Icons,...
			</p>
			<h2>Server-side</h2>
			<p>Novu, Node, Express, MongoDB, Mongoose, BCrypt, JSONWebToken,...</p>
			<h1>Triển khai</h1>
			<ul>
				<li>Front-End: Vercel</li>
				<li>Back-End: Render</li>
			</ul>
			<h1>Thông tin thêm</h1>
			<ul>
				<li>
					Link github back-end:{' '}
					<a href='https://github.com/hienhienn/todo-app-be'>
						https://github.com/hienhienn/todo-app-be
					</a>
				</li>
				<li>
					Link github front-end:{' '}
					<a href='https://github.com/hienhienn/todo-app-fe'>
						https://github.com/hienhienn/todo-app-fe
					</a>
				</li>
				<li>
					Link back-end deploy trên render:{' '}
					<a href='https://todo-app-be-ytia.onrender.com/'>
						https://todo-app-be-ytia.onrender.com/
					</a>
				</li>
				<li>
					Link front-end deploy trên vercel:{' '}
					<a href='https://todo-app-fe-ruby.vercel.app/'>
						https://todo-app-fe-ruby.vercel.app/
					</a>
				</li>
				<li>
					Link jsdocs front-end:{' '}
					<a href='https://todo-app-fe-asok.vercel.app/'>
						https://todo-app-fe-asok.vercel.app/
					</a>
				</li>
				<li>
					Link jsdocs back-end:{' '}
					<a href='https://todo-app-be-six.vercel.app/'>
						https://todo-app-be-six.vercel.app/
					</a>
				</li>
			</ul>
		</div>
	);
};
export default Info;

/**
 * @module reducers/notes
 */

/**
 * Quản lý state của các ghi chú
 * @param {Array<Note>} [state = []]
 * @param {{
 * type: 'FETCH_ALL' | 'CREATE' | 'UPDATE' | 'TOGGLE_DONE' | 'DELETE',
 * payload?: any
 * }} action
 * @param { 'FETCH_ALL' | 'CREATE' | 'UPDATE' | 'TOGGLE_DONE' | 'DELETE' } action.type
 * @param {any?} action.payload
 * @returns
 */
const noteReducer = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload;
		case 'CREATE':
			return [...state, action.payload];
		case 'UPDATE':
			return state.map((note) =>
				note._id === action.payload._id ? action.payload : note
			);
		case 'TOGGLE_DONE':
			return state.map((note) =>
				note._id === action.payload._id ? { ...note, done: !note.done } : note
			);
		case 'DELETE':
			return state.filter((note) => note._id !== action.payload);
		default:
			return state;
	}
};

export default noteReducer;

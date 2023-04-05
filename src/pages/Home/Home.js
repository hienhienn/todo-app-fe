import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header';
import Note from '../../components/Note/Note';
import "./home.css";
import {getNotes,createNote,updateNote} from "../../actions/notes";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Home = () => {
  const [inputText,setInputText]=useState({
    title:"",
    description:"",
    date: null,
  })
  const [currentId,setCurrentId]=useState(null);
  const [addMore,setAddMore]=useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notesByDate, setNotesByDate] = useState({});

  const dispatch = useDispatch();

  const notes = useSelector((state)=>state.notes);
  const user = JSON.parse(localStorage.getItem("profile"));
  const updatedNote = useSelector((state)=>currentId ? state.notes.find((c)=>c._id===currentId):null);


  useEffect(()=>{
    dispatch(getNotes());
  },[dispatch,currentId]);

  useEffect(()=>{
    if(updatedNote){
      setInputText(updatedNote);
    }
  },[updatedNote]);

  const changeHandeler=(e)=>{
    setInputText({
      ...inputText,
      [e.target.name]:e.target.value,
    })
  }

  useEffect(() => {
    const notesByDate = notes.reduce((acc, note) => {
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

  const handleSubmitNote=(e)=>{
    e.preventDefault();
    if (!inputText.title) {
      return; // do nothing if title or email is empty
    }
    inputText.date = selectedDate.toISOString();
    if(currentId){
      dispatch(updateNote(currentId,inputText));
    }else{
      dispatch(createNote({...inputText,message:"created"}));
    }
    handleClearNote();
  }

  const handleClearNote=()=>{
    setCurrentId(null);
    setInputText({title:"",description:""});
    setSelectedDate(null)
  }

  const addMoreHandler = (e) => {
    e.preventDefault();
    setAddMore((prev)=>!prev);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (  
    <main className="home">
      <Header/>
      <div className="home_container">
        <div className="home_container_top">
          <form className="home_form_container" onSubmit={handleSubmitNote}>
            <h3 className="form_heading">Create A Todo</h3>
            <div className='home_form_top'>
              <input 
                type="text" 
                value={inputText.title} 
                name="title" 
                onChange={changeHandeler} 
                className="form_input" 
                placeholder="Text" 
              />
              <DatePicker
                selected={selectedDate}
                name="date"
                onChange={handleDateChange}
                placeholderText="Select date"
                dateFormat="dd/MM/yyyy"
              />
              <button className="form_add_more" onClick={addMoreHandler}>Add more</button>
            </div>
            {addMore && (
              <textarea 
                type="text" 
                value={inputText.description} 
                name="description" 
                onChange={changeHandeler} 
                className="form_textarea" 
                placeholder="Description"
              />
            )}
            <button className="form_button">Create</button>
          </form>
        </div>
        <div className="home_container_bottom">
          {Object.entries(notesByDate).length > 0 ? (
            Object.entries(notesByDate).map(([dateStr, notes]) => {
              // Filter notes by user ID
              const userNotes = notes.filter((note) => note.creator === user?.result?._id);
              return userNotes.length > 0 ? (
                <div key={dateStr}>
                  <h2 className="note_row_title">{new Date(dateStr).toLocaleDateString()}</h2>
                  <div className="note_row">
                    {userNotes.map((note) => (
                      <Note key={note._id} item={note} setCurrentId={setCurrentId} />
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
  )
}

export default Home

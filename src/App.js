import * as React from 'react';
import './App.css';
import firebase from '../src/firebase'; // <--- add this line


// COMPONENTS //
import axiosInstance from '../src/axios-note'
import Container from './components/Container/Container';
import Layout from './components/Layout/Layout';
import Notepad from './components/Notepad/Notepad';
import Note from './components/Note/Note';

const App = () => {
  //---------------------//
  //-------STATES--------//
  //---------------------//
  const [notepadModeState, setNotepadModeState] = React.useState({ mode: "submit", loading: false })
  const [selectedNoteState, setSelectedNoteState] = React.useState({ selectedNote: "" })
  const [userInputState, setUserInputState] = React.useState({ userInput: "" })
  const [contentState, setContentState] = React.useState({notes: {}})

  //-------UPDATES state for each key-value typed in notepad-------//
  const HandleOnUserInput = (event) => {
    setUserInputState((state) => ({
      ...state,
        userInput: event.target.value,
    }))
  }

  const HandleOnPostingNote = (event) => {
    if (userInputState.userInput.trim().length < 1) {
      event.preventDefault();
      alert(notepadModeState.mode + ": type something");
    } else {
      // POST new note
      event.preventDefault();
      setNotepadModeState((state) => ({ ...state, loading : true }))
      let myDate = new Date();
      let myDate2 = myDate.toLocaleString();
      const note = {
        id: Date.now(),
        dateCreated: myDate2,
        content: userInputState.userInput
      };
      axiosInstance.post('notes.json', note)
      .then(response => {
        setNotepadModeState((state) => ({ ...state, loading : false }))
        setUserInputState((state) => ({ ...state, userInput: "" }))
      })
      .catch(error => {
        setNotepadModeState((state) => ({ ...state, loading : false }))
      });
    }
  }

  // const HandleOnPostingNote = (event) => {
  //   if (userInputState.userInput.trim().length < 1) {
  //     event.preventDefault();
  //     alert(notepadModeState.mode + ": type something");
  //   } else {
  //     // POST new note
  //     event.preventDefault();
  //     setNotepadModeState((state) => ({ ...state, loading : true }))
  //     let myDate = new Date();
  //     let myDate2 = myDate.toLocaleString();
  //     const note = {
  //       id: Date.now(),
  //       dateCreated: myDate2,
  //       content: userInputState.userInput
  //     };
  //     axiosInstance.post('notes.json', note)
  //     .then(response => {
  //       setNotepadModeState((state) => ({ ...state, loading : false }))
  //       setUserInputState((state) => ({ ...state, userInput: "" }))
  //     })
  //     .catch(error => {
  //       setNotepadModeState((state) => ({ ...state, loading : false }))
  //     });
  //   }
  // }

  // React.useEffect(() => {
  //   axiosInstance.get('notes.json')
  //     .then(response => {
  //       // console.log(response.data)
  //       let notes = response.data
  //       setContentState((state) => ({
  //         ...state, notes
  //       }))
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // }, [notepadModeState])

  return (
    <div className="App">
      <Layout>
        <div>
          <form 
            name="noteSubmittion" 
            id="noteSubmittion" 
            onSubmit={HandleOnPostingNote}
            >
            <Notepad 
              id="noteSubmissionTextField"
              notepadMode={notepadModeState.mode}
              userInput={userInputState.userInput}
              handleOnUserInput={HandleOnUserInput} 
            />
          </form>
        </div>
        <Container>
          {Object.keys(contentState.notes).map(noteKey => {
            const theNote = contentState.notes[noteKey];
            return(
              <Note 
                key={theNote.id}
              >
                {theNote.content}
              </Note>
            )
          })}
        </Container>
      </Layout>
    </div>
  );
}

export default App;



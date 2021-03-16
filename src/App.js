import * as React from 'react';
import './App.css';
import { firebase } from './initFirebase';

// COMPONENTS //
import ContainerNotes from './components/ContainerNotes/ContainerNotes';
import Fixed from './components/Fixed/Fixed';
import Layout from './components/Layout/Layout';
import Notepad from './components/Notepad/Notepad';
import Note from './components/Note/Note';

const db = firebase.database();

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
    let myDate = new Date();
    let myDate2 = myDate.toLocaleString();
    if (userInputState.userInput.trim().length < 1) {
      event.preventDefault();
      alert(notepadModeState.mode + ": type something");
    } else {
      // POST new note
      if (notepadModeState.mode === "submit") {
        event.preventDefault();
        const notesRef = db.ref("notes");
        const newNoteRef = notesRef.push();
        setUserInputState((state) => ({ ...state, userInput: "" }))
        setNotepadModeState((state) => ({ ...state, loading : true }))
        newNoteRef.set({
          id: Date.now(),
          dateCreated: myDate2,
          content: userInputState.userInput
        })
      } else {
        event.preventDefault();
        const indexOfNote = selectedNoteState.selectedNote;
        const indexOfEdit = {
          id: contentState.notes[indexOfNote].id,
          dateCreated: contentState.notes[indexOfNote].dateCreated,
          dateEdited: myDate2,
          content: userInputState.userInput
        }
        console.log("Index of note to be editted: ", indexOfNote, " ", indexOfEdit);
        db.ref(`notes/${indexOfNote}`).set(indexOfEdit)

        // RESET state values after edit submit
        setUserInputState((state) => ({ ...state, userInput: "" }))
        setSelectedNoteState((state) => ({ ...state, selectedNote: null }))
        setNotepadModeState((state) => ({ ...state, mode: "submit"}))
      }
    }
  }

  // https://www.youtube.com/watch?v=P-XNZdKQUR0
  //Loads the messages on load and state change
  React.useEffect(() => {
    const ref = db.ref('notes');

    ref.on("value", (snapshot) => {
      // console.log(snapshot.val());
      setNotepadModeState((state) => ({ ...state, loading : false }))

      let notes = snapshot.val();
      setContentState((state) => ({
        ...state, notes
      }))
    });

    return () => ref.off();
  }, [])

  //-------COPIES specific note content based on array value into notepad-------//
  const HandleOnEditNote = (event, index) => {
    const copiedUserInputFromState = contentState.notes[index].content;
    // console.log("Note content sent to notepad to edit: ", copiedUserInputFromState);

    const indexOfNote = selectedNoteState.selectedNote;
    const indexOfEdit = contentState.notes[indexOfNote]

    console.log(indexOfEdit);

    setUserInputState((state) => ({ ...state, userInput: copiedUserInputFromState }))
    setSelectedNoteState((state) => ({ ...state, selectedNote: index }))
    setNotepadModeState((state) => ({ ...state, mode: "edit submit"}))
  }

  const HandleOnDeleteNote = (event, index) => {
    var noteRef = firebase.database().ref(`notes/${index}`);
    noteRef.remove()
    .then(function() {
     console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
  }

  return (
    <div className="App">
      <Layout>
        <Fixed>
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
        </Fixed>
          <ContainerNotes >
            {Object.keys(contentState.notes).map(noteKey => {
              const theNote = contentState.notes[noteKey];
              return(
                <Note 
                  key={noteKey}
                  dataValue={noteKey}
                  editNote={HandleOnEditNote} 
                  deleteNote={HandleOnDeleteNote}
                >
                  {noteKey.dateCreated}
                  {noteKey}
                  <br />
                  {theNote.content}
                </Note>
              )
            })}
          </ContainerNotes>
      </Layout>
    </div>
  );
}

export default App;



import * as React from 'react';
import './App.css';

// COMPONENTS //
import Container from './components/Container/Container';
import Layout from './components/Layout/Layout';
import Notepad from './components/Notepad/Notepad';
import Note from './components/Note/Note';

const App = () => {
  // STATES //
  const [noteState, setNoteState] = React.useState({
    userInput: "",
    selectedNote: "1",
    notes: [
      {id: 0, content: "This the the first test post!!!!!!!!!!!!"},
      {id: 1, content: "second Post"}
    ]
  })

  let userInputValue = noteState.userInput;

  const HandleOnUserInput = (event) => {
    setNoteState((state) => ({
      ...state,
        userInput: event.target.value,
        // notes: [...state.notes, { content : event.target.value }]
    }))
  }

  const HandleOnSubmitNoteToState = (event) => {
    const noteId = noteState.selectedNote;
    if (userInputValue.trim().length < 1) {
      event.preventDefault();
      alert("type something");
    } else {
      event.preventDefault();   

      setNoteState((state) => ({
        ...state,
        userInput: '',
        // selectedNote: '',
        notes: [...state.notes, { content : userInputValue }]
      }))
    }
  }

  const HandleOnEditNoteFromState = (event, index) => {
    const notesFromStateHolder = noteState.notes[index].content;
    console.log(notesFromStateHolder);
    
    setNoteState((state) => ({
      ...state,
        selectedNote: index,
        userInput: notesFromStateHolder,
    }))
  }

  const HandleOnDeletingNoteFromState = (event, index) => {
    const removedNoteArray = [...noteState.notes];
    removedNoteArray.splice(index, 1);
    setNoteState((state) => ({
      ...state,
        notes : removedNoteArray,
    }));
    console.log(noteState.notes)
    console.log(noteState.notes[index])

  }

  return (
    <div className="App">
      <Layout>
        <div>
          <form name="noteSubmittion" id="noteSubmittion" onSubmit={HandleOnSubmitNoteToState}>
            <Notepad 
              id="noteSubmissionTextField"
              userInput={noteState.userInput}
              handleOnUserInput={HandleOnUserInput}
              />
          </form>
        </div>
        <Container>
          {noteState.notes.map((noteContent, index) => (
            <Note 
              key={index}
              dataValue={index}
              HandleOnDeletingNoteFromState={HandleOnDeletingNoteFromState}
              HandleOnEditNoteFromState={HandleOnEditNoteFromState}
            >
              {noteContent.content}
            </Note>
          ))}

          {/* {Object.keys(noteState.notes).map(noteKey => {
            const theNote = noteState.notes[noteKey];
            return(
              <Note 
                key={theNote.id}
              >
                {theNote.content}
              </Note>
            )
          })} */}
        </Container>
      </Layout>
    </div>
  );
}

export default App;

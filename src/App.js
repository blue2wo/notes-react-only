import * as React from 'react';
import './App.css';

// COMPONENTS //
import Container from './components/Container/Container';
import Layout from './components/Layout/Layout';
import Notepad from './components/Notepad/Notepad';
import Note from './components/Note/Note';

const App = () => {
  //---------------------//
  //-------STATES--------//
  //---------------------//
  const [notepadModeState, setNotepadModeState] = React.useState({ editMode: false, mode: "submit" })
  const [selectedNoteState, setSelectedNoteState] = React.useState({ selectedNote: "" })
  const [userInputState, setUserInputState] = React.useState({ userInput: "" })
  const [contentState, setContentState] = React.useState({
    notes: [
      // {content: "first note"}, 
      // {content: "second note"},
      // {content: "Third note"},
      // {content: "Fourth note"},
    ],
  })

  //-------UPDATES state for each key-value typed in notepad-------//
  const HandleOnUserInput = (event) => {
    setUserInputState((state) => ({
      ...state,
        userInput: event.target.value,
    }))
  }

  const HandleOnSubmitNoteToState = (event) => {
    if (userInputState.userInput.trim().length < 1) {
      event.preventDefault();
      alert(notepadModeState.mode + ": type something");
    } else {
      //-------SUBMITS user input to create new note-------//
      if (notepadModeState.mode === "submit") {
        event.preventDefault();
        setContentState((state) => ({
          ...state,
            notes: [...state.notes, { content : userInputState.userInput }]
        }))
        setUserInputState((state) => ({ ...state, userInput: "" }))
        setNotepadModeState((state => ({ ...state, editMode: true })))
      } else {
        //-------SUBMITS edited note content to specific note based on array value-------//
        event.preventDefault();
        const indexOfNote = selectedNoteState.selectedNote;
        const indexOfEdit = contentState.notes[indexOfNote]
        console.log("Index of note to be editted: ", indexOfNote, " ", indexOfEdit);

        // 1. Make a shallow copy of the notes
        let copiedNotes = [...contentState.notes];
        // 2. Make a shallow copy of the note you want to mutate
        let copiedNote = {...copiedNotes[indexOfNote]};
        // 3. Replace the property you're intested in
        copiedNote.content = userInputState.userInput;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        copiedNotes[indexOfNote] = copiedNote;
        // 5. Set the state to our new copy
        console.log(copiedNotes);
        setContentState((state) => ({
          ...state, 
            notes : copiedNotes,
        }))

        // RESET state values after edit submit
        setUserInputState((state) => ({ ...state, userInput: "" }))
        setSelectedNoteState((state) => ({ ...state, selectedNote: null }))
      }
    }
  }
3
  //-------DELETES specific note based on array index value-------//
  const HandleOnDeletingNoteFromState = (event, index) => {
    const stateBeforeDelete = [...contentState.notes]
    console.log("Note that will be deleted: ", stateBeforeDelete[index]);  

    stateBeforeDelete.splice(index, 1);
    console.log("New state after deleted note: ", stateBeforeDelete);

    setContentState((state) => ({ ...state, notes: stateBeforeDelete }));
    // RESET state values after edit submit
    setUserInputState((state) => ({ ...state, userInput: "" }))
    setSelectedNoteState((state) => ({ ...state, selectedNote: null }))
  }

  //-------COPIES specific note content based on array value into notepad-------//
  const HandleOnEditNoteFromState = (event, index) => {
    const copiedUserInputFromState = contentState.notes[index].content;
    console.log("Note content sent to notepad to edit: ", copiedUserInputFromState);

    setUserInputState((state) => ({ ...state, userInput: copiedUserInputFromState }))
    setSelectedNoteState((state) => ({ ...state, selectedNote: index }))
    setNotepadModeState((state) => ({ ...state, editMode: true, mode: "submit"}))
  }

  return (
    <div className="App">
      <Layout>
        <div>
          {notepadModeState.editMode.toString()}
          <form 
            name="noteSubmittion" 
            id="noteSubmittion" 
            onSubmit={HandleOnSubmitNoteToState}
            // onSubmit={HandleOnSubmitEdittedNote} 
            >
            <Notepad 
              notepadMode={notepadModeState.mode}
              id="noteSubmissionTextField"
              userInput={userInputState.userInput}
              handleOnUserInput={HandleOnUserInput} />
          </form>
        </div>
        <Container>
          {contentState.notes.map((noteContent, index) => (
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

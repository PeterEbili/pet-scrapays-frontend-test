import React from 'react';
import Note from './Note';
import NoteForm from './NoteForm';

export default class Content extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { dataLoaded: false, notes: [] };

    this.fetchNotes = this.fetchNotes.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
  }

  handleAddNote(ntitle, nbody) {
    const newNote = { note_id: Date.now(), note_title: ntitle, note_body: nbody };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request('http://localhost:5000/notes/', { method: 'POST', headers: headers, body: JSON.stringify(newNote), mode: 'cors' });

    fetch(request)
      .then(response => {
        if (response.status === 200) {
          console.log("Note saved");
          console.log("dataLoaded: ", this.state.dataLoaded);
          return response.json();
        }
      })
      .then(data => {
        this.setState({ dataLoaded: !this.state.dataLoaded, notes: data });
      })
      .catch(err => {
        if (err) {
          console.error(err);
        }
      })
  }

  handleEditNote(id, title, body) {
    if (isNaN(id) || id === undefined)
      return;
    const theNote = { note_id: id, note_title: title, note_body: body }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request('http://localhost:5000/notes/' + id, { method: 'PUT', headers: headers, body: JSON.stringify(theNote), mode: 'cors' });
    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState(state => ({ notes: data, dataLoaded: !this.state.dataLoaded }));
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleDeleteNote(id) {
    if (isNaN(id) || id === undefined)
      return;


    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request('http://localhost:5000/notes/' + id, { method: 'DELETE', headers: headers, body: '', mode: 'cors' });
    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ notes: data }, () => { this.setState({ dataLoaded: !this.state.dataLoaded }) });
      })
      .catch(err => {
        console.error(err);
      })
  }

  fetchNotes() {
    const url = 'http://localhost:5000/notes/';
    fetch(url)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        else {
          throw new Error(`Status: ${response.status}. Something is wrong with the server!`)
        }
      })
      .then(response => {
        const notes = response;
        this.setState({ notes: notes }, () => { this.setState({ dataLoaded: !this.state.dataLoaded }) });
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.fetchNotes();
    this.forceUpdate();
  }

  createNote = (noteData) => {
    return (
      <Note key={noteData.note_id}
        note_id={noteData.note_id}
        note_title={noteData.note_title}
        note_body={noteData.note_body}
        handleDeleteNote={this.handleDeleteNote}
        handleEditNote={this.handleEditNote}
      />
      
    )
  }

  render() {
    return (
      <>

        <NoteForm handleAddNote={this.handleAddNote} />
        {(!this.state.notes || this.state.notes.length <= 0) && (<h3>No notes to show!</h3>)}

        {
          this.state.notes.map(note => this.createNote(note))
        }
      
  
    </> 
    );
  }
}

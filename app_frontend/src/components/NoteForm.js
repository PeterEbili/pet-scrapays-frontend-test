import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => {
  return {
    root: {
      '& .MuiTextField-root': {
        margin: theme ? theme.spacing(1) : 1,
      },
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '30%',
      marginRight: '30%',
    },
  };
};

class NoteForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      note_title: '',
      note_body: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNoteTitle = this.handleChangeNoteTitle.bind(this);
    this.handleChangeNoteBody = this.handleChangeNoteBody.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChangeNoteTitle(event) {
    this.setState({ note_title: event.target.value });
  }

  handleChangeNoteBody(event) {
    this.setState({ note_body: event.target.value });
  }

  addNote() {
    if (this.state.note_title === '' || this.state.note_body === '') return;
    this.props.handleAddNote(this.state.note_title, this.state.note_body);
    this.setState({ note_title: '', note_body: '' });
  }

  render() {
    const note_title = this.state.note_title;
    const note_body = this.state.note_body;
    const titleStyle = { marginTop: '10px', marginBottom: '5px' };

    return (
      <form style={{ marginLeft: '30%', marginRight: '30%', paddingBottom:50 }} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <Box>
          <TextField id="filled-basic" label="Book Title" style={titleStyle} variant="filled" fullWidth value={note_title} onChange={this.handleChangeNoteTitle} />
          <TextField
            id="filled-multiline-static"
            label="Book Body"
            multiline
            rows="4"
            fullWidth
            variant="filled"
            value={note_body}
            onChange={this.handleChangeNoteBody}
          />
          <Button style={{ marginTop: '10px' }} variant="contained" color="primary" onClick={this.addNote}>
            CREATE
          </Button>
        </Box>
      </form>
    );
  }
}

const StyledComponent = withStyles(styles)(NoteForm);
export default StyledComponent;

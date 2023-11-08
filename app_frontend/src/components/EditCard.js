import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export default function EditCard(props) {

  const [id] = React.useState(props.id);
  const [title, setTitle] = React.useState(props.title);
  const [body, setBody] = React.useState(props.body);

  const handleChangeNoteTitle = (event) => {
    setTitle(event.target.value);
  };
  
  const handleChangeNoteBody = (event) => {
    setBody(event.target.value);
  };

  const handleCloseCancel = () => {
    props.closeDialog('', '');    
  }

  const handleCloseAccept = () => {   
    console.log("Inside EditCard: ", id, title, body);
    props.closeDialog(title, body);
  };

  return (
    <div>     
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
      
        <DialogContent>
          <DialogContentText>
           You can only Edit the Book Title and Book Body :
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Book id"
            fullWidth
            variant="filled"
            value={id}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Bool Title"
            type="email"
            fullWidth
            value={title}
            onChange={handleChangeNoteTitle}
          />
          <TextField 
          id="filled-multiline-static-edit" 
          label="Book Body" 
          multiline 
          rows="4" 
          fullWidth 
          variant="filled" 
          value={body} 
          onChange={handleChangeNoteBody}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCloseAccept} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

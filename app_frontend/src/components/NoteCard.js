import React, { useState } from 'react';

import EditCard from './EditCard';


const NoteCard = (props) => {
    const [noteID] = useState(props.note_id);
    const [note_title, setNoteTitle] = useState(props.note_title);
    const [note_body, setNoteBody] = useState(props.note_body);
    const [open, setOpen] = useState(false);


    const delNote = () => {
        const current_id = noteID;
        props.handleDeleteNote(current_id);
        setNoteTitle('');
        setNoteBody('');
    }

    const edNote = () => {
        setOpen(true);
    }

    const closeDialog = (title, body) => {
        if (title === '' || body === '') {
            setOpen(false);
            return;
        }

        setNoteTitle(title);
        setNoteBody(body);
        setOpen(false);
        console.log("Inside NoteCard closeDialog: ", noteID, title, body);
        props.handleEditNote(noteID, title, body);
    }



    <table>
        <thead>
            <tr>
                <th className='table-head-item'> date</th>
                <th className='table-head-item'> id</th>
                <th className='table-head-item'> Title</th>
                <th className='table-head-item'> Body</th> 
            </tr>
        </thead>
    </table>


    return (
        <div style={{marginLeft:10}}>
           <table className='table'>
 
            <tbody className='table-body'>
            
                    <tr key={noteID} style={{background:'blue'}}>
                    
                        <td style={{color:'white'}}>{noteID}</td>
                        <td style={{color:'white', paddingRight:10 , paddingLeft:10,width:'100px'}}>{props.note_title}</td>
                        <td style={{color:'white', paddingLeft:30}}>{note_body}</td>
                        <td style={{ paddingLeft:30}}>
                            <button id="edNote" size="small" variant="contained" color="primary" onClick={edNote} style={{ margin:10}}>Edit</button>
                            <button  id="delNote" size="small" variant="contained" color="secondary" onClick={delNote} style={{ margin:10, background:'red', color:'white'}}>X</button>
                        </td>
                        
                        <EditCard id={noteID} title={note_title} body={note_body} open={open} closeDialog={closeDialog}/> 
                        
                    </tr>

            </tbody>

           </table>
        </div>

    );
    
}

export default NoteCard;

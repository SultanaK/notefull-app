import React from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
import config from '../config';
import moment from 'moment'
import PropTypes from 'prop-types';

export default class Note extends React.Component {
    static defaultProps = {
        handleDeleteNote: () => { },
        //onDeleteNote: () => { },
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;


    handleDeleteNote = (event) => {
        const noteId = this.props.id

        fetch(`${config.API_NOTES}/${noteId}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
            })
            .then(() => {
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        return (
            <div className="note">
                <div key={this.props.id}>         
                        <Link to={`/note/${this.props.id}`}>
                            <h3>{this.props.name}</h3> 
                        <p>{this.props.content}</p>
                    </Link>
                   <p>Modified on {moment(this.props.modified).format('YYYY MM DD')}</p>  
                    
                <button
                    type="button"
                    id="delete-note-link-little"
                    onClick={this.handleDeleteNote}>
                        Delete Note                    
                    </button>
                
            </div>
            </div>
        )
    }
}


Note.propTypes = { 
    id: PropTypes.number.isRequired,
    content: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
}
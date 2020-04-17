import firebase from '../db'


export function getNotes() {
    return (dispatch) => {

        dispatch({
            type: "NOTES_LOADING_STATUS",
            payload: true
        })

        firebase.database().ref('/notes').on('value', snapshot => {
            dispatch({
                type: "NOTES_FETCH",
                payload: snapshot.val()
            })

            dispatch({
                type: "NOTES_LOADING_STATUS",
                payload: false
            })
        })
    }
}

export function postNote(title, noteText) {
    return (dispatch) => {
        firebase.database().ref('/notes').push({ title, noteText })
    }
}

export function deleteNote(key) {
    return (dispatch) => {
        firebase.database().ref(`/notes/${key}`).remove()
    }
}

export function editNote(title, noteText, key) {
    return (dispatch) => {
        firebase.database().ref(`/notes`).child(key).update({ title, noteText })
    }
}
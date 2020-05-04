import firebase from '../db'

export function getNotes() {

    return (dispatch) => {

        dispatch({
            type: "NOTES_LOADING_STATUS",
            payload: true
        })

        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref(`/${uid}/notes`).on('value', snapshot => {
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

export function postNote(title, noteText, colorScheme) {
    return (dispatch) => {
        var uid = firebase.auth().currentUser.uid;
        var time = Date.now();
        firebase.database().ref(`/${uid}/notes`).push({ title, noteText, colorScheme, time})
    }
}

export function deleteNote(key) {
    return (dispatch) => {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`/${uid}/notes/${key}`).remove()
    }
}

export function editNote(title, noteText, colorScheme, key) {
    return (dispatch) => {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`/${uid}/notes`).child(key).update({ title, noteText , colorScheme, time})
    }
}
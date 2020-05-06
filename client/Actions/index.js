import firebase from '../db'

export function getNotes(type, color) {

    return (dispatch) => {

        dispatch({
            type: "NOTES_LOADING_STATUS",
            payload: true
        })

        var email = firebase.auth().currentUser.email.replace(/[^a-zA-Z0-9]/g, '');
        console.log(email)

        let dbRef = firebase.database().ref(`/${email}/notes`).orderByChild(type);

        dbRef.on('value', snapshot => {
            var dataObj = new Object();
            snapshot.forEach(function (child) {
                if (color) {
                    if (child.val().colorScheme.Color === color) {
                        dataObj[child.key] = child.val();
                    }
                }
                else {
                    dataObj[child.key] = child.val()
                }
            });
            dispatch({
                type: "NOTES_FETCH",
                payload: dataObj
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
        var email = firebase.auth().currentUser.email.replace(/[^a-zA-Z0-9]/g, '');
        var time = - Date.now();
        firebase.database().ref(`/${email}/notes`).push({ title, noteText, colorScheme, time })
    }
}

export function deleteNote(key) {
    return (dispatch) => {
        var email = firebase.auth().currentUser.email.replace(/[^a-zA-Z0-9]/g, '');
        firebase.database().ref(`/${email}/notes/${key}`).remove()
    }
}

export function editNote(title, noteText, colorScheme, key) {
    return (dispatch) => {
        var email = firebase.auth().currentUser.email.replace(/[^a-zA-Z0-9]/g, '');
        var time = -Date.now();
        firebase.database().ref(`/${email}/notes`).child(key).update({ title, noteText, colorScheme, time })
    }
}
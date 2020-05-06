import firebase from '../db'

export function getNotes(type) {

    return (dispatch) => {

        dispatch({
            type: "NOTES_LOADING_STATUS",
            payload: true
        })

        var uid = firebase.auth().currentUser.uid;

        let dbRef = firebase.database().ref(`/${uid}/notes`).orderByChild(type);

        dbRef.on('value', snapshot => {
            var dataObj = new Object();
            snapshot.forEach(function(child) {
                dataObj[child.key] = child.val()// NOW THE CHILDREN PRINT IN ORDER
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
        var uid = firebase.auth().currentUser.uid;
        var time = - Date.now();
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
        var time = -Date.now();
        firebase.database().ref(`/${uid}/notes`).child(key).update({ title, noteText , colorScheme, time})
    }
}

/* 
Object {
  "-M6VOtPqciQ0qlbeoe8q": Object {
    "colorScheme": Object {
      "Color": "Blue",
      "borderColor": "#D2E0ED",
      "color": "black",
      "noteColor": "#E2F1FF",
      "placeholderTextColor": "#5c5c5c",
      "titleColor": "#CDE9FF",
    },
    "noteText": "Another one ",
    "time": 1588607818615,
    "title": "Test post ",
  },
  "-M6XGjITJ4WDJvTnEspr": Object {
    "colorScheme": Object {
      "Color": "Black",
      "borderColor": "#747474",
      "color": "white",
      "noteColor": "#696969",
      "placeholderTextColor": "#FAFAFA",
      "titleColor": "#494745",
    },
    "noteText": "It really is. ",
    "time": 1588639235013,
    "title": "Date test bro ",
  },
  "-M6_c8SCupjwEaZhrZ1p": Object {
    "colorScheme": Object {
      "Color": "Purple",
      "borderColor": "#E1D6ED",
      "color": "black",
      "noteColor": "#F2E6FF",
      "placeholderTextColor": "#5c5c5c",
      "titleColor": "#E7CFFF",
    },
    "noteText": "Dr k",
    "time": 1588695442136,
    "title": "C'est",
  },
}

*/
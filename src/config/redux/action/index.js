import firebase, {database} from '../../firebase';

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
            return  dispatch({type: 'CHANGE_USER', value: ''})   
        },2000)
    
}

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise ((resolve, reject)=> {
        dispatch ({type: 'CHANGE_LOADING', value: true})
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('success',res);
            dispatch ({type: 'CHANGE_LOADING', value: false})
            resolve(true)
        })
        .then((userCredential) => {
        // Signed in
         var user = userCredential.user;
         // ...
         })
         .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
            console.log(errorCode,errorMessage)
            dispatch ({type: 'CHANGE_LOADING', value: false})
            reject(false)
         })
    })
    
}

export const loginUserAPI = (data) => (dispatch) => {
    
  return  new Promise((resolve, reject) => {
        dispatch ({type: 'CHANGE_LOADING', value: true})
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('success',res);
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerified: res.user.emailVerified,
                refreshToken: res.user.refreshToken
            }
            dispatch ({type: 'CHANGE_LOADING', value: false})
            dispatch ({type: 'CHANGE_ISLOGIN', value: true})
            dispatch ({type: 'CHANGE_USER', value: dataUser})
            resolve(dataUser)
        })
        .then((userCredential) => {
        // Signed in
         var user = userCredential.user;
         // ...
         })
         .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
            console.log(errorCode,errorMessage)
            dispatch ({type: 'CHANGE_LOADING', value: false})
            dispatch ({type: 'CHANGE_ISLOGIN', value: false})
            reject(false)
         })
        
    }) 
    
}

export const addDataToAPI = (data) => (dispatch) => {
    database.ref('Announcement/').push({
        Title: data.Title,
        Date: data.Date
    })
}

export const getDataFromAPI = () => (dispatch) => {
    const urlAnnouncement = database.ref('Announcement/');
    return new Promise((resolve, reject)=>{
        urlAnnouncement.on('value', (snapshot) => {
        // const data = snapshot.val();
        // updateStarCount(postElement, data);
        console.log('get Data ', snapshot.val() )
        const data = [];
        Object.keys(snapshot.val()).map(key => {
            data.push({
                id: key,
                data: snapshot.val()[key]
            })
        });
        dispatch({type: "SET_ANNOUNCEMENT", value:data})
        resolve(snapshot.val())
      });
    })
    
}

export const updateDataAPI = (data) => (dispatch) => {
    const urlAnnouncement = database.ref(`Announcement/${data.announId}`);
    return new Promise((resolve, reject)=>{
        urlAnnouncement.set({
            Title: data.Title,
            Date: data.Date
        }, (err) => {
            if(err){
                reject(false);
            } else {
                resolve(true);
            }
             
        });
    })
    
}

export const deleteDataAPI = (data) => (dispatch) => {
    const urlAnnouncement = database.ref(`Announcement/${data.announId}`);
    return new Promise((resolve, reject)=>{
        urlAnnouncement.remove();
    })
    
}
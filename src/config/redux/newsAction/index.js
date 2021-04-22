import firebase, {database} from '../../firebase';


    


export const addNewsToAPI = (data) => (dispatch) => {
    database.ref('News/').push({
        Title: data.Title,
        Date: data.Date,
        Img: data.Img,
        Category: data.Category,
        Description: data.Description
    })
}

export const getNewsFromAPI = () => (dispatch) => {
    const urlNews = database.ref('News/');
    return new Promise((resolve, reject)=>{
        urlNews.on('value', (snapshot) => {
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
        dispatch({type: "SET_NEWS", value:data})
        resolve(snapshot.val())
      });
    })
    
}

export const updateNewsAPI = (data) => (dispatch) => {
    const urlNews = database.ref(`News/${data.newssId}`);
    return new Promise((resolve, reject)=>{
        urlNews.set({
            Title: data.Title,
            Date: data.Date,
            Img: data.Img,
            Category: data.Category,
            Description: data.Description
        }, (err) => {
            if(err){
                reject(false);
            } else {
                resolve(true);
            }
             
        });
    })
    
}

export const deleteNewsAPI = (data) => (dispatch) => {
    const urlNews = database.ref(`News/${data.newssId}`);
    return new Promise((resolve, reject)=>{
        urlNews.remove();
    })
    
}
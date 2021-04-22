import React, {Component, Fragment} from 'react';
import { addNewsToAPI , deleteNewsAPI, getNewsFromAPI, updateNewsAPI} from '../../../config/redux/newsAction';
import './News.scss';
import { connect } from 'react-redux';
import { Navbar } from '../../organisms';
import { Gap } from '../../../components';


class News extends Component {
    state = {
        Title: '',
        Date: '',
        Img: '',
        Category: '',
        Description: '',
        textButton: 'SAVE',
        newssId: ''
    }

    

    componentDidMount() {
        
       this.props.getNews();
    }

    handleSaveNews = () => {
        const {Title,Category,Description,Img, textButton, newssId} = this.state;
        const {saveNews, updateNews} = this.props;
        
        
        const data = {
            Title: Title,
            Date: new Date().toDateString(),
            Img: Img,
            Category: Category,
            Description: Description,
            userId: this.props.userData.uid
        }
        if(textButton === "SAVE"){
            saveNews(data)
        }else{
            data.newssId = newssId
            updateNews(data)
        }
        
        console.log(data)
    }

    onInputChange = (e, type) =>{
        this.setState({
            [type] : e.target.value
        })
    }

    updateNews = (newss) => {
        console.log(newss)
        this.setState({
            Title: newss.data.Title,
            Category: newss.data.Category,
            Img: newss.data.Img,
            Description: newss.data.Description,
            textButton: 'UPDATE',
            newssId: newss.id
        })
    }
    
    cancelUpdate = () => {
        this.setState({
            Title: '',
            Date: '',
            Img: '',
            Category: '',
            Description: '',
            textButton: 'SAVE'
        })
    }

    deleteNews = (e, newss) => {
        
        e.stopPropagation();
        const {deleteNews}=this.props
        
        const data = {
            newssId: newss.id
        }
        deleteNews(data)
    }

    render(){
        const {Title,Category,Description,Img, textButton} = this.state
        const {news} = this.props;
        const {updateNews, cancelUpdate, deleteNews} = this;
        console.log('news: ', news);
        return(
            
            <div className="container">
                <Navbar/>
                <div class="container-md bg-light">
                    <label for="exampleFormControlTextarea1" class="form-label">News</label>
                    <input class="form-control form-control-lg" type="text" placeholder="Title" aria-label=".form-control-lg example" value={Title} onChange={(e)=> this.onInputChange(e, 'Title')}></input>
                    <Gap height={20}/>
                    <input class="form-control form-control-lg" type="text" placeholder="Category" aria-label=".form-control-lg example" value={Category} onChange={(e)=> this.onInputChange(e, 'Category')}></input>
                    <Gap height={20}/>
                    <textarea placeholder="Image (Base64)" class="form-control" id="exampleFormControlTextarea1" rows="3" value={Img} onChange={(e)=> this.onInputChange(e, 'Img')}></textarea>
                    <Gap height={20}/>
                    <textarea placeholder ="Description" class="form-control" id="exampleFormControlTextarea1" rows="3" value={Description} onChange={(e)=> this.onInputChange(e, 'Description')}>

                    </textarea>
                    <Gap height={20}/>
                    <div className="action-wrapper">
                        {
                            textButton === 'UPDATE'? (
                               <button type="button" class="btn btn-outline-secondary" onClick={this.handleSaveNews} onClick={cancelUpdate} >Cancel</button> 
                            ) : <div/>
                        }
                        <Gap height={20}/>
                        <button type="button" class="btn btn-outline-primary" onClick={this.handleSaveNews} >{textButton}</button>
                        
                    </div>

                    
                </div>
                <hr/>
                {
                    news.length > 0 ? (
                        <Fragment>
                            {
                            news.map(newss => {
                                return (
                                      <div className="card-content" key={newss.id} onClick={() => updateNews(newss)}>
                                        <p class="text-primary">News</p>
                                        <p className="title">{newss.data.Title}</p>
                                        <p className ="author">{newss.data.Date}</p>
                                        <img width ="80%" class = "img-fluid " src={newss.data.Img} alt ="post"/>
                                        <p className="date">{newss.data.Category}</p>
                                        <p className="content">{newss.data.Description}</p>
                                        <div className="delete-btn" onClick={(e)=>deleteNews(e, newss)}>x</div>
                </div>
                                )
                            })
                        }
                        </Fragment>
                      
                    ) : null
                }
                
                
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    news: state.news
})

const reduxDispatch = (dispatch) => ({
    saveNews : (data) => dispatch(addNewsToAPI(data)),
    getNews : (data) => dispatch(getNewsFromAPI(data)),
    updateNews: (data) => dispatch(updateNewsAPI(data)),
    deleteNews: (data) => dispatch(deleteNewsAPI(data))
})

export default connect(reduxState, reduxDispatch) (News);
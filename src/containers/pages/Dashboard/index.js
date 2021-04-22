import React, {Component, Fragment} from 'react';
import { addDataToAPI , deleteDataAPI, getDataFromAPI, updateDataAPI} from '../../../config/redux/action';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { Navbar } from '../../organisms';
import { Gap } from '../../../components';


class Dashboard extends Component {
    state = {
        Title: '',
        Date: '',
        textButton: 'SAVE',
        announId: ''
    }

    

    componentDidMount() {
       
       this.props.getAnnouncement();
    }

    handleSaveAnnouncement = () => {
        const {Title, textButton, announId} = this.state;
        const {saveAnnouncement, updateAnnouncement} = this.props;
        
        
        const data = {
            Title: Title,
            Date: new Date().toDateString(),
           
        }
        if(textButton === "SAVE"){
            saveAnnouncement(data)
        }else{
            data.announId = announId
            updateAnnouncement(data)
        }
        
        console.log(data)
    }

    onInputChange = (e, type) =>{
        this.setState({
            [type] : e.target.value
        })
    }

    updateAnnouncement = (announ) => {
        console.log(announ)
        this.setState({
            Title: announ.data.Title,
            textButton: 'UPDATE',
            announId: announ.id
        })
    }
    
    cancelUpdate = () => {
        this.setState({
            Title: '',
            textButton: 'SAVE'
        })
    }

    deleteAnnouncement = (e, announ) => {
        
        e.stopPropagation();
        const {deleteAnnouncement}=this.props
        
        const data = {
            announId: announ.id
        }
        deleteAnnouncement(data)
    }

    render(){
        const {Title, textButton} = this.state
        const {announcement} = this.props;
        const {updateAnnouncement, cancelUpdate, deleteAnnouncement} = this;
        console.log('announcement: ', announcement);
        return(
            <div className="container">
                <Navbar/>
                <div class="container-md bg-light">
                    <label for="exampleFormControlTextarea1" class="form-label">Announcement</label>
                    <textarea placeholder ="Description" class="form-control" id="exampleFormControlTextarea1" rows="3" value={Title} onChange={(e)=> this.onInputChange(e, 'Title')}>

                    </textarea>
                    <Gap height={20}/>
                    <div className="action-wrapper">
                        {
                            textButton === 'UPDATE'? (
                               <button className="save-btn cancel" onClick={this.handleSaveAnnouncement} onClick={cancelUpdate} >Cancel</button> 
                            ) : <div/>
                        }
                        
                        <button className="save-btn" onClick={this.handleSaveAnnouncement} >{textButton}</button>
                        
                    </div>

                    
                </div>
                <hr/>
                {
                    announcement.length > 0 ? (
                        <Fragment>
                            {
                            announcement.map(announ => {
                                return (
                                      <div className="card-content" key={announ.id} onClick={() => updateAnnouncement(announ)}>
                                        <p className="title">Announcement</p>
                                        <p className="date">{announ.data.Date}</p>
                                        
                                        <p className="content">{announ.data.Title}</p>
                                        <div className="delete-btn" onClick={(e)=>deleteAnnouncement(e, announ)}>x</div>
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
    
    announcement: state.announcement
})

const reduxDispatch = (dispatch) => ({
    saveAnnouncement : (data) => dispatch(addDataToAPI(data)),
    getAnnouncement : (data) => dispatch(getDataFromAPI(data)),
    updateAnnouncement: (data) => dispatch(updateDataAPI(data)),
    deleteAnnouncement: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch) (Dashboard);
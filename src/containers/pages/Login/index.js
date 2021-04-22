import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Button';
import './Login.scss'
import { loginUserAPI } from '../../../config/redux/action';


class Login extends Component {
   

    state = {
        email: '',
        password: '',
       
    }
    
    handleChangeText = (e) => {
        console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const {email, password} = this.state;
        console.log('data before send: ',email, password)
        const {history} = this.props;
       const res = await this.props.loginAPI({email, password}).catch(err => err);
       if(res){
           console.log('login success', res)
           localStorage.setItem('userData', JSON.stringify(res))
           this.setState({
            email: '',
            password: ''
        }) 
        history.push('/news')
       }else {
           console.log('login fail')
       }
       
         
            
      
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input className="input" id="email" placeholder="Email" type="text"onChange={this.handleChangeText} value={this.state.email}/>
                    <input className="input" id="password" placeholder="Password" type="password"onChange={this.handleChangeText} value={this.state.password}/>
                    <Button onClick={this.handleLoginSubmit} title="Login"loading={this.props.isLoading}/>
                    
                </div>
                {/*<button>Go to Dashboard</button>*/}
            </div>
        )
    }
}


const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data)) 
})
export default connect(reduxState, reduxDispatch)( Login );
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUser } from '../../ducks/auth_reducer'
import RecentWorkouts from '../RecentWorkouts/RecentWorkouts';
import Dropzone from 'react-dropzone'
import {GridLoader} from 'react-spinners'
import{v4 as randomString} from 'uuid'
import './Register.css'


class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUploading: false,
            url:"",
            username: '',
            password: '',
            profile_pic:'',
            recentWorkouts: []
        }
    }
    componentDidMount(){
      this.getMarvelPic()
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }
    register = async () => {
        let user = {
            username:this.state.username,
            password:this.state.password,
            profile_pic:this.state.url
        }
        try {
            let res = await axios.post('/auth/register', user)
            this.props.updateUser(res.data)
            
        }catch (err) {
            alert("choose different username")
        }
        this.props.history.push('/profile')
    }
    getMarvelPic = async () => {
        let id = Math.floor(Math.random()*(1009299-1009290)+1009290)
        let res = await axios.get(`/auth/profile_pic/${id}`)
        const {path, extension} = res.data
        let url = path+"/portrait_medium."+extension
        this.setState({
          url
        })
    }

    getSignedRequest = ([file]) => {
        this.setState({isUploading: true})
     
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
     
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': file.type
          }
        }).then( (response) => {
          const { signedRequest, url } = response.data 
          this.uploadFile(file, signedRequest, url)
        }).catch( err => {
          console.log(err)
        })
     }
     uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, url });
          })
          .catch(err => {
              console.log(err)
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };
      handleRegisterButton = () => {
          this.register();
      }

      backToLogin = () =>{
        this.setState({
          url:""
        })
        this.props.history.push('/')
      }
   
      



    render() {
        const {username, password, url, isUploading} = this.state
        return (
            <div className="RegisterPage">
                <h1>Create a Profile</h1>
                    <img src={url} alt="" width="200px" />
                <button id='DropzoneButton'>
                  <Dropzone 
                    id="DropzoneButtonChild"
                     onDropAccepted={this.getSignedRequest}
                    
                     accept='image/*'
                     multiple={false}
                    >  
                    { () => (
                      <div className="ButtonUploadBox">
                            {
                              isUploading 
                              ?  <GridLoader 
                              style={{}}/>
                              : <p>Add Profile Picture</p>
                              
                                

                            }
                        </div>
                    )}
                    </Dropzone>
                </button>

                    

                <div id='DropzoneBox'>
                  <Dropzone 
                    id="DropzoneChild"
                     onDropAccepted={this.getSignedRequest}
                    
                     accept='image/*'
                     multiple={false}
                    >  
                    { () => (
                      <div className="UploadBox">
                            {
                              isUploading 
                              ?  <GridLoader 
                              style={{}}/>
                              : <p>Drop Profile Picture or Click Here</p>
                                

                            }
                        </div>
                    )}
                    </Dropzone>
                </div>
                <div id="RegisterInputs">
                  <input value={username} placeholder='Username' onChange={e => this.handleChange("username", e.target.value)} />
                  <input type="password" placeholder='Password' value={password} onChange={e => this.handleChange("password", e.target.value)} />
                </div>
                  <div className="RegisterButton">
                    <button onClick={this.handleRegisterButton}>Create Profile</button>
                    <button onClick={this.backToLogin}>Back to Login</button>
                </div>
                
                
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    
        return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)

    
}
const mapDispatchToProps = {
    updateUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
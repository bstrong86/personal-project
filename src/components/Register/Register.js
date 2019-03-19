import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUser } from '../../ducks/auth_reducer'
import RecentWorkouts from '../RecentWorkouts/RecentWorkouts';
import Dropzone from 'react-dropzone'
import {GridLoader} from 'react-spinners'
import{v4 as randomString} from 'uuid'


class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUploading: false,
            url:"https://robohash.org/"+randomString(),
            username: '',
            password: '',
            profile_pic:'',
            recentWorkouts: []
        }
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
    }
    getSignedRequest = ([file]) => {
        console.log([file])
        this.setState({isUploading: true})
     
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
     
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': file.type
          }
        }).then( (response) => {
            console.log(response)
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
              console.log(url)
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
   
      



    render() {
        console.log(this.state)
        const {username, password, url, isUploading} = this.state
        return (
            <div>
                <h1>Upload</h1>
                    <img src={url} alt="" width="200px" />

                  <Dropzone 
                    onDropAccepted={this.getSignedRequest}
                    style={{
                    position: 'relative',
                    width: 200,
                    height: 200,
                    borderWidth: 7,
                    marginTop: 100,
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 28,
                    }}
                    accept='image/*'
                    multiple={false} 
                >  
                    { () => (
                        <div>
                            {
                                isUploading 
                                ?  <GridLoader />
                                : <p>Drop File or Click Here</p>
                            }
                        </div>
                    )}
                </Dropzone>
                <input value={username} placeholder='Username' onChange={e => this.handleChange("username", e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={e => this.handleChange("password", e.target.value)} />
                <button onClick={this.handleRegisterButton}>Create Profile</button>
                
                
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
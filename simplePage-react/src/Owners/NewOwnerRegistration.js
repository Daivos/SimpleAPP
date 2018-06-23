import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import swal from 'sweetalert';

class NewOwnerRegistration extends Component{
    constructor(props){
        super(props);
        this.state={
            ownersName:'',
            ownersAddress:''
        };

    }

    submit = (event)=> {
        let ownerRegistrationInfo = {
            ownersName: this.state.ownersName,
            ownersAddress: this.state.ownersAddress
        }
        axios.post('http://localhost:8081/api/newOwner', ownerRegistrationInfo)
        .then((response)=>{
            swal({
                text: "Owner registered",
                icon: "success",
               button: "OK",
            });
            this.refs.form.reset();
        })
        .catch ((error)=>{
            console.log(error);
            swal({
                text: "Owner registration failed!",
                icon: "error",
               button: "OK",
            });
        })
        console.log(this.state);
        event.preventDefault();
    }
    render(){
        return(
            <MuiThemeProvider>
                <div >
                <form className="registerOwner"
                ref="form"
                open={this.props.open}> 
                    <h2> Register new owner </h2>
                    <TextField
                        className="ownersName"
                        floatingLabelText="Owner's name"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ ownersName: newValue })}/>
                    <br />
                    <TextField
                        className="ownersAddress"
                        floatingLabelText="Owners address"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ ownersAddress: newValue })}/>
                    <br />
                    <RaisedButton 
                        label="Submit" 
                        primary={true}  
                        onClick={(event)=>this.submit(event)} 
                    />
                </form>
                </div>
            </MuiThemeProvider>
        ) 
        } 
        
    }

export default NewOwnerRegistration;

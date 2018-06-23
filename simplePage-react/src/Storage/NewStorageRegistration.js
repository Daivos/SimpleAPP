import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import swal from 'sweetalert';

class NewStorageRegistration extends Component{
    constructor(props){
        super(props);
        this.state = {
            storage:'',
            city:''
        };
    }

    submit = (event)=> {
        let storageRegistrationInfo = {
            storage: this.state.storage,
            city: this.state.city
        }
        axios.post('http://localhost:8081/api/newStorage', storageRegistrationInfo)
        .then((response)=>{
            swal({
                text: "Storage registered",
                icon: "success",
               button: "OK",
            });
            this.refs.form.reset();
        })
        .catch ((error)=>{
            console.log(error);
            swal({
                text: "Storage registration failed!",
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
                <form className="registerStorage"
                ref="form"
                open={this.props.open}> 
                    <h2> Register new storage </h2>
                    <TextField
                        className="storage"
                        floatingLabelText="Name of storage facility"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ storage: newValue })}/>
                    <br />
                    <TextField
                        className="city"
                        floatingLabelText="City"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ city: newValue })}/>
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

}export default NewStorageRegistration;
import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import swal from 'sweetalert';


class NewItemRegistration extends Component{
    constructor(props){
        super(props);
        this.state={
            itemName:'',
            quantity:'',
            ownerId:'',
            ownersName:'',
            ownersAddress:'',
            storageId:'',
            storage:'',
            city:'',
            owners:[],
            storages:[],
            ownerValue:'',
            storageValue:''
        };

    }

    submit = (event)=> {
        let information = {
            itemName: this.state.itemName,
            quantity: this.state.quantity,
            ownerId: this.state.ownerId,
            storageId: this.state.storageId
        }
        axios.post('http://localhost:8081/api/newItem/'+this.state.ownerId+'/'+this.state.storageId, information)
        .then((response)=>{
            swal({
                text: "Item registered",
                icon: "success",
                button: "OK",
            });
            this.refs.form.reset();
        })
        .catch ((error)=>{
            console.log(error);
            swal({
                text: "Item registration failed!",
                icon: "error",
               button: "OK",
            });
        })
        console.log(this.state);
        event.preventDefault();
    }

    componentWillMount=()=>{
        axios.get('http://localhost:8081/api/owners')
        .then((response)=>{
            this.setState({owners: response.data});
        })
        .catch((error)=>{
            console.log(error);
        });

        axios.get('http://localhost:8081/api/storageFacilities')
        .then((response)=>{
            this.setState({storages: response.data});
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    chooseOwner=(event, ownerId, value)=>{
         this.setState({ownerId: value, ownerValue: value}); 
    }

    chooseStorage=(event, storageId, value)=>{
        this.setState({storageId: value, storageValue: value});
    }

    render(){
        return(
            <MuiThemeProvider>
                <div >
                <form className="registerItem"
                ref="form"
                open={this.props.open}> 
                    <h2> Register new item </h2>
                    <TextField
                        className="itemName"
                        floatingLabelText="Item's name"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ itemName: newValue })}/>
                    <br />
                    <TextField
                        className="quantity"
                        floatingLabelText="Quantity"
                        floatingLabelFixed={true}
                        onChange={(event, newValue) => this.setState({ quantity: newValue })}/>
                    <br />
                    <DropDownMenu value={this.state.ownerValue} onChange={this.chooseOwner}>
                        <MenuItem value={""} primaryText="Owner's name"/>
                        {this.state.owners.map((singleOwner, ownerId) =><MenuItem value={singleOwner.ownerId} primaryText={singleOwner.ownersName}/>)}
                    </DropDownMenu>
                    <br />
                    <DropDownMenu value={this.state.storageValue} onChange={this.chooseStorage}>
                        <MenuItem value={""} primaryText="Storage facility"/>
                        {this.state.storages.map((facility, storageId) =><MenuItem value={facility.storageId} primaryText={facility.storage}/>)}
                    </DropDownMenu>
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

export default NewItemRegistration;
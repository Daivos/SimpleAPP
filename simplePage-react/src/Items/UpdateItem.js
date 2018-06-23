import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import swal from 'sweetalert';

class UpdateItem extends Component{

    constructor(props) {
        super(props);
        this.state={
            itemName:'',
            quantity:'',
            ownerId:'',
            ownersName:'',
            storageId:'',
            storage:'',
            owners:[],
            storages:[],
            ownerValue:'',
            storageValue:''
        };
    }

    componentWillMount(){
         this.getUpdateInfo();
        //getAllOwnersAndStoragesForUpdating
         this.getAllOwnersAndStorages();
    }

    getUpdateInfo=()=>{
        let updateItemId = this.props.match.params.itemId
        axios.get("http://localhost:8081/api/singleItem/"+updateItemId)
        .then((response)=>{
            this.setState({itemName: response.data.itemName});
            this.setState({quantity: response.data.quantity}); 
            this.setState({ownerId:response.data.ownerId})
            this.setState({storageId:response.data.storageId})
            axios.get("http://localhost:8081/api/singleItem/"+updateItemId+"/"+this.state.ownerId)
                .then((response)=>{
                    this.setState({ownersName: response.data.ownersName});
                })
                .catch((error)=>{
                    console.log(error);
            });
            axios.get("http://localhost:8081/api/singleItem/"+updateItemId+"/"+this.state.ownerId+"/"+this.state.storageId)
                .then((response)=>{
                    this.setState({storage: response.data.storage});
                })
                .catch((error)=>{
                    console.log(error);
            });           
        })
        .catch((error)=>{
            console.log(error);
        }); 
    }

    getAllOwnersAndStorages=()=>{
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

    //updates item info
    update = (event)=> {
        let itemToUpdateId= this.props.match.params.itemId;
        let information = {
            itemName: this.state.itemName,
            quantity: this.state.quantity,
            ownerId: this.state.ownerId,
            storageId: this.state.storageId
        }
       
        swal({
            text: "Are you sure you want to update?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then((willUpdate)=>{
            if(willUpdate){ 
                axios.put('http://localhost:8081/api/singleItem/update/'+itemToUpdateId+'/'+this.state.ownerId+'/'+this.state.storageId, information)
                    .then((response)=>{
                        swal("Item has been updated!", {
                            icon: "success",
                            button: "OK",
                        });
                        this.props.history.push('/items');
                    }).catch ((error)=>{
                        console.log(error);
                    })
                    console.log(this.state);
                    event.preventDefault();
                }
        
        })
    }

    render() {       
        return (
            <MuiThemeProvider>
                <div>
                    <h2>Edit item</h2>
                    <TextField
                        className="itemName"
                        floatingLabelText="Item's name"
                        floatingLabelFixed={true}
                        value={this.state.itemName}
                        onChange={(event, newValue) => this.setState({ itemName: newValue })}/>
                    <br />
                    <TextField
                        className="quantity"
                        floatingLabelText="Quantity"
                        floatingLabelFixed={true}
                        value={this.state.quantity}
                        onChange={(event, newValue) => this.setState({ quantity: newValue })}/>
                    <br />
                    <DropDownMenu floatingLabelText="Owner" value={this.state.ownerValue} onChange={this.chooseOwner}>
                        <MenuItem value={""} primaryText={this.state.ownersName}/>
                        {this.state.owners.map((singleOwner, ownerId) =><MenuItem value={singleOwner.ownerId} primaryText={singleOwner.ownersName}/>)}
                    </DropDownMenu>
                    <br />
                    <DropDownMenu floatingLabelText="Storage" value={this.state.storageValue} onChange={this.chooseStorage}>
                        <MenuItem value={""} primaryText={this.state.storage}/>
                        {this.state.storages.map((facility, storageId) =><MenuItem value={facility.storageId} primaryText={facility.storage}/>)}
                    </DropDownMenu>
                    <RaisedButton 
                        label="Submit" 
                        primary={true}  
                        onClick={(event)=>this.update(event)} />
                </div>
            </MuiThemeProvider>
        );
    }

}export default UpdateItem;
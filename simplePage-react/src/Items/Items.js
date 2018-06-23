import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Info from 'material-ui/svg-icons/action/info';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import swal from 'sweetalert';
import ItemInformation from './ItemInformation';
import { Link } from 'react-router-dom';

const styles = {
    marginLeft: 0,
    marginRight: 10
  
}

class ItemTable extends Component{

    constructor(props){
        super(props);
        this.state={
            fixedHeader: true,
            showRowHover: true,
            showCheckboxes: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            height: '300px',
            showModal: false,

            items:[],
            itemId:'',
            itemName:'',
            quantity: '',
            ownerId:'',
            ownersName:'',
            ownersAddress:'',
            storageId:'',
            storage:'',
            city:'',

            itemInfo:[],
            ownerInfo:[],
            storageInfo:[],
            updateInfo:[]
        }
    }

    //get all items
    componentWillMount(){
        axios.get("http://localhost:8081/api/items")
        .then((response) => {       
            this.setState({items: response.data});
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

    //get item info
    getInfo=(itemId)=>{
        axios.get("http://localhost:8081/api/singleItem/"+itemId)
        .then((response)=>{
            this.setState({itemInfo: response.data});
            axios.get("http://localhost:8081/api/singleItem/"+itemId+"/"+this.state.itemInfo.ownerId)
                .then((response)=>{
                    this.setState({ownerInfo: response.data});
                })
                .catch((error)=>{
                    console.log(error);
            });
            axios.get("http://localhost:8081/api/singleItem/"+itemId+"/"+this.state.itemInfo.ownerId+"/"+this.state.itemInfo.storageId)
                .then((response)=>{
                    this.setState({storageInfo: response.data});
                })
                .catch((error)=>{
                    console.log(error);
            });
            this.setState({ showModal: !this.state.showModal });
            console.log("state item info",this.state.itemInfo);
            console.log("state of owner ", this.state.items.ownerId)
        })
        .catch((error)=>{
            console.log(error);
        });  
    }

    //delete item
    deleteItem=(itemId, index)=>{
        swal({
            text: "Are you sure you want to delete?",
            icon: "warning",
           buttons: true,
           dangerMode: true
        })
        .then((willDelete)=>{
            if(willDelete){ 
                this.removeFromDatabase(itemId);
                this.removeFromTable(index); 

                swal("Item has been deleted!", {
                    icon: "success",
                });
            }
        });
    }

    removeFromDatabase=(itemId)=>{
        axios.delete("http://localhost:8081/api/item/delete/"+itemId)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        }); 
    }
    
    removeFromTable=(index)=>{        
        this.setState(state=>({
            items: state.items.filter((singleItem, i)=>i!==index)
        }));
    }

    closeModal=()=>{
        this.setState({showModal: false})
    }

    render(){
        var allItems = this.state.items.map((singleItem, index) => (
            <TableRow key={index} >
                <TableRowColumn>{singleItem.itemName}</TableRowColumn>
                <TableRowColumn>{singleItem.quantity}</TableRowColumn>
                <TableRowColumn>
                    <IconButton>
                        <Info 
                        onClick={()=>this.getInfo(singleItem.itemId)}
                        color={blue500}
                        hoverColor={greenA200}/>
                    </IconButton>
                    <IconButton containerElement={<Link to={"/singleItem/"+singleItem.itemId} />}
                                linkButton={true}>
                        <Edit
                        color={blue500}
                        hoverColor={greenA200}/>
                    </IconButton>
                    <IconButton>
                        <Delete 
                        onClick={()=>this.deleteItem(singleItem.itemId, index)}
                        color={red500}
                        hoverColor={greenA200} />
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        ))    
         
        return(
            <MuiThemeProvider>
            <div>
            <h2>Items</h2>
            <Table
                height={this.state.height}
                style={styles}
                fixedHeader={this.state.fixedHeader}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
            >
                <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
                >
                <TableRow>
                    <TableHeaderColumn
                        className="itemName"
                        style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                        }}
                        tooltip="itemName">Item name</TableHeaderColumn>
                    <TableHeaderColumn
                        className="quantity"
                        style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                        }}
                        tooltip="quantity">Quantity</TableHeaderColumn>
                     <TableHeaderColumn
                        className="icons"
                        style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                        }}
                        tooltip="icons"></TableHeaderColumn>
                </TableRow>
                </TableHeader>

                <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}>
                    {allItems}
                </TableBody>
            </Table>
            <ItemInformation
                open={this.state.showModal}
                closeAction={this.closeModal}
                itemInfo={this.state.itemInfo} 
                ownerInfo={this.state.ownerInfo}
                storageInfo={this.state.storageInfo}
                itemId={this.state.itemId}
                ownerId={this.state.ownerId}
                storageId={this.state.storageId}/>
            </div>
        </MuiThemeProvider>
        );
    }
};
export default ItemTable;
    

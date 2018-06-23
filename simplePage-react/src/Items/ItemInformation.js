import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ItemInformation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        if (!this.props.itemInfo){
            return null;
        }

        const actions =
            (<FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closeAction}
            />);

            var oneItem = (
                <div id="itemInfo">
                    <p> Item's name: {this.props.itemInfo.itemName}</p>
                    <p> Quantity: {this.props.itemInfo.quantity}</p>
                    <p> Owner's name: {this.props.ownerInfo.ownersName}</p>
                    <p> Owner's address: {this.props.ownerInfo.ownersAddress}</p>                   
                    <p> Storage facility: {this.props.storageInfo.storage}</p>
                    <p> City: {this.props.storageInfo.city}</p>
                </div>
            )
        
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Item"
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                    >
                        {oneItem}
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }

}export default ItemInformation;
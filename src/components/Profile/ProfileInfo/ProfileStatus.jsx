import React from 'react';
import classes from './ProfileInfo.module.css';
import Loader from "../../common/Loader/Loader";

class ProfileStatus extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            profileStatus: props.profileStatus
        }
    }

    toggleEditMode = () => {
        this.setState((state,props) => {
            if(state.profileStatus !== props.profileStatus){
                this.props.updateProfileStatus(this.state.profileStatus)
            }
            return {
                isEditMode: !state.isEditMode
            }
        })
    }

    onChangeStatus = (e) => {
        let profileStatus = e.target.value;
        this.setState({
            profileStatus
        })
    }

    render() {
        return (
            <>
                {this.state.isEditMode
                    ? <div><input autoFocus onBlur={this.toggleEditMode} value={this.state.profileStatus}
                    onChange={this.onChangeStatus}/></div>
                    : <div><span onDoubleClick={this.toggleEditMode}>Status: {this.props.profileStatus || '-----'}</span></div>}
            </>


        )
    }
}

export default ProfileStatus;
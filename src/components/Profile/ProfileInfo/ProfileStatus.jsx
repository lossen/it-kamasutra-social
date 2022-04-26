import React from 'react';
import classes from './ProfileInfo.module.css';
import Loader from "../../common/Loader/Loader";

class ProfileStatus extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false
        }
    }

    toggleEditMode = () => {
        this.setState((prev,next) => {
            return {
                isEditMode: !prev.isEditMode
            }
        })
    }

    render() {

        return (
            <>
                {this.state.isEditMode
                    ? <div><input autoFocus onBlur={this.toggleEditMode} value={'Hello'}/></div>
                    : <div><span onDoubleClick={this.toggleEditMode}>LLLL</span></div>}


            </>


        )
    }
}

export default ProfileStatus;
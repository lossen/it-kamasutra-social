import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/Forms/FormControls";
import classes from "../../../Login/Login.module.css";

const ProfileDataForm = ({error,...props}) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <b>Full name:</b>
            <Field name={"fullName"} type="text" placeholder="fullName" component={Input}/>
        </div>
        <div>
            <b>I'm looking for a job:</b>
            <Field name={"lookingForAJob"} type="checkbox" placeholder="lookingForAJob" component={Input}/>
        </div>
        <div>
            <b>My professional skills:</b>
            <Field name={"lookingForAJobDescription"} type="text" placeholder="lookingForAJobDescription" component={Textarea}/>
        </div>
        <div>
            <b>About me:</b>
            <Field name={"aboutMe"} type="text" placeholder="aboutMe" component={Textarea}/>
        </div>
        <div>
            <h5>Contacts: {Object.keys(props.profile.contacts)
                .map((key) => {
                        return <div>
                            <b>{key}</b>
                            <Field name={`contacts.${key}`} type="text" placeholder={key} component={Input}/>
                        </div>

                    }
                )}
            </h5>

        </div>
        {error && <div className={classes.errorBox}>
            <span className={classes.errorTitle}>{error}</span>
        </div>}
        <button>Save</button>
    </form>
}

let ReduxFormEditProfile = reduxForm({
    form: "profileDataForm"
})(ProfileDataForm)

export default ReduxFormEditProfile;

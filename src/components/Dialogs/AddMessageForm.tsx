import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

type PropsTypes = {}
type TNewMessageFormValues = {
    message: string
}
const AddMessageForm: React.FC<InjectedFormProps<TNewMessageFormValues,PropsTypes>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"message"} type={"textarea"} placeholder={'Enter your message'} component={"textarea"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export const WithReduxAddMessageForm = reduxForm<TNewMessageFormValues, PropsTypes>({
    form: 'sendMessage'
})(AddMessageForm)
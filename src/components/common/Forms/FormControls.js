import React from "react";

const FormControl = ({input,meta,Element,...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <>
            <div>
                <Element {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </>
    )
}

export const Input = (props) => {
    return(
        <FormControl {...props} Element={() => <input/>}/>

    )
}


export const Textarea = (props) => {
    debugger
    return(
        <FormControl {...props} Element={() => <input/>}/>
    )
}


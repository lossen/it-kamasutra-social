import React from "react";

const FormControl = ({input,meta,Element,...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </>
    )
}

export const Input = (props) => {
    return(
        <FormControl {...props}>
            <input type="text" {...props.input} {...props}/>
        </FormControl>

    )
}


export const Textarea = (props) => {
    return(
        <FormControl {...props}>
            <textarea {...props.input} {...props}/>
        </FormControl>
    )
}


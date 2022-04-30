import React from "react";

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (<>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </>)
}

export const Input = ({input, ...props}) => {
    return (<FormControl {...props}>
            <input type="text" {...input} {...props}/>
        </FormControl>

    )
}

export const Textarea = (props) => {
    return (<FormControl {...props}>
            <textarea {...props.input} {...props}/>
        </FormControl>)
}


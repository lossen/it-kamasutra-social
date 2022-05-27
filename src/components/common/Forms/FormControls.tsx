import React from "react";

const FormControl:React.FC<TFormControlProps> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (<>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </>)
}

type TFormControlProps = {
    meta: {
        touched: boolean
        error: string
    }
    children?: JSX.Element
}

export const Input:React.FC<TFieldProps & TFormControlProps> = ({input, ...props}) => {
    return (<FormControl {...props}>
            <input type="text" {...input} {...props}/>
        </FormControl>
    )
}

type TFieldProps = {
    input: any
}

export const Textarea:React.FC<TFieldProps & TFormControlProps>  = (props) => {
    return (<FormControl {...props}>
            <textarea {...props.input} {...props}/>
        </FormControl>)
}


import React from "react";
// @ts-ignore
import LoaderGif from '../../../images/loader.gif';

const Loader:React.FC<TOwnProps> = (props) => {
    return props.isFetching ? (
        <img src={LoaderGif} alt="loading"/>
    ) : null;
}

export default Loader;

type TOwnProps = {
    isFetching:boolean
}
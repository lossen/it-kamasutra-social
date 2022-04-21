import React from "react";
import LoaderGif from '../../../images/loader.gif';

const Loader = (props) => {
    return props.isFetching ? (
        <img src={LoaderGif} alt="loading"/>
    ) : null;
}

export default Loader;
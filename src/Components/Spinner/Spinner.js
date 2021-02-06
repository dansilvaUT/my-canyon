import { useState } from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;

function Spinner() {


    return (
        <BounceLoader />
    );
}

export default Spinner;
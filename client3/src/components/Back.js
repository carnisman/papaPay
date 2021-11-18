import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const BackButton = (props) => {
    let history = useHistory();
    return (
    <div
        {...props}
        style={{
        alignItems: "center",
        padding: "1rem 0",
        }}>
            <Button
                onClick={() => history.goBack()}
                variant="contained"
                color="primary"
                >
                    Back
            </Button>
        {props.children}
    </div>
)}

export default BackButton;
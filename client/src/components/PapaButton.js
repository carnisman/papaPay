import React from "react";
import { Button } from "@material-ui/core";

const PapaButton = (props) => {
    return (
        <div
            style={{
            padding: "0.5rem 0"
            }}>
                <Link to="/tutor">
                    <Button 
                    variant="contained" 
                    color="primary" 
                    style={{
                        textAlign: "center", 
                        width:"200px"}}>
                    I´m a Tutor
                    </Button>
                </Link>
        </div>
)}

export default PapaButton
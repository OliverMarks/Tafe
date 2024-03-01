import { useState } from "react";


export default function ExitScreen ({setActivePage}) {
    const closeTab = () => {
        window.opener = null;
        window.open("", "_self");
        window.close();
      };

    return (
        <>
        <h1>Are you sure you want to close the application?</h1>

        <button onClick={closeTab}>Yes</button>  
        <button onClick={() => setActivePage('')}>No</button>
      

</>
    )
}
import React from "react";

const HighLightText=({text})=>{
    return(
        <span className="font-bold bg-gradient-to-br from-[#1FA2FF] via-[#12DF8A] to-[#A6FFCB]
              bg-clip-text text-transparent">
            {text}</span>
    )
}

export default HighLightText
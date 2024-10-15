import { useEffect } from "react";

export default function useOnClickOutside(ref,handler){
    useEffect(()=>{
        //define the listner function to be called on click or touch events

        const listner=(event)=>{
                if(!ref.current || ref.current.contains(event.target)){
                    return;
                }
                //otherwise call the provided handler function
                handler(event);
        };

        //add event listner for mouse down and touchstart events on the documents
        document.addEventListener("mousedown",listner);
        document.addEventListener("touchstart",listner);

        //cleanup function to remove the event listners when the  component unmounts or when the ref/handler dependies change
        return ()=>{
            document.removeEventListener("mousedown",listner);
            document.removeEventListener("touchstart",listner);
        }
    },[ref, handler]);
    // only run this effect when the ref or handler function changes
}
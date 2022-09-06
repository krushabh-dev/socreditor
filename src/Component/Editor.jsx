import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import Quill from "quill";
import { io } from "socket.io-client";
import 'quill/dist/quill.snow.css'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }], 
    ['clean']                                         // remove formatting button
  ];
  

function Editor() {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState(); 

    useEffect(() => {
        var quillServer = new Quill('#editors', {
            theme: 'snow', modules: {
                toolbar: toolbarOptions
              },
          });

        setQuill(quillServer);
    }, [])

    useEffect(() => {
      const socketServer = io("http://localhost:9000/")
      setSocket(socketServer);
      return () => {
        socketServer.disconnect();
      }
    })
    
  return (
    <>
    <Box>
        <Box id="editors"></Box>
    </Box>
    </>
  );
}

export default Editor;

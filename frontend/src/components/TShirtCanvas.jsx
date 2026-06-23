import {useEffect,useRef} from "react";

import {fabric} from "fabric";


export default function TShirtCanvas({

shirtColor,

setObjects,

setSelected

}){


const canvasRef=useRef();

let canvas;



useEffect(()=>{


canvas=new fabric.Canvas(
canvasRef.current,
{
width:700,
height:650,
backgroundColor:"#fff"
}
);



fabric.Image.fromURL(
"/tshirt.png",

(img)=>{


img.scaleToWidth(350);

img.set({

left:180,

top:100,

selectable:false

});


canvas.add(img);


}

);



canvas.on(
"object:added",

()=>{

setObjects(
canvas.getObjects()
);

}

);



canvas.on(
"selection:created",

(e)=>{

setSelected(e.selected[0]);

}

);



window.addText=()=>{


let text=new fabric.Textbox(
"Your Text",
{

left:250,

top:300,

fontSize:40,

fill:"#ff5555"

});


canvas.add(text);


};



return()=>canvas.dispose();


},[]);



return(

<canvas

ref={canvasRef}

/>

)


}
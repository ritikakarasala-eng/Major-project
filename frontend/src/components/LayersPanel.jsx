export default function LayersPanel({objects}){


return(

<div>

<h3>
Layers
</h3>


{
objects.map(
(obj,i)=>(

<div className="layer" key={i}>

Layer {i+1}

</div>

)
)

}


</div>

)

}
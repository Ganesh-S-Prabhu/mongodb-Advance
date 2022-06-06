import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  
  const [items,setitems]=useState([]);
  const [count,setcount]=useState(0);
  const [page,setpage]=useState(1);
  const [sorting,setsorting]=useState({
    value:"_id",
    change:1
  })
  const [filtring,setfiltering]=useState({
    name:"",
    model:"",
    color:"",
    manufacturer:"",
    types:"",
  })
  
  useEffect(()=>{
    getdata();
  },[page,sorting,filtring])

  const handle=(value)=>{
    
     if(page>=1 && page<=count){
       setpage(page+value)
     }else if(page>=count){
       setpage(count)
     }else{
       setpage(1)
     }
     return
  }
  

  const getdata=async()=>{
    try{
let res=await fetch(`http://localhost:9000/vehicles?page=${page}&sortby=${sorting.value}:${sorting.change}&name=${filtring.name}&types=${filtring.types}&color=${filtring.color}`)
let data=await res.json();
console.log(data)
setitems(data.vehicles)
setcount(data.count);
    }catch(err){
      console.log("error",err)
    }
  }

  function handlesort(e){
    if(e.target.value!=''){
      var sort=e.target.value.trim().split(":");
    console.log(sort)
   
    setsorting({
      ...sorting,
      value:sort[0],
      change:sort[1]
    });
    }else{
      setsorting({
        ...sorting,
        value:"_id",
        change:1
      });
    }
   
    
  }

  function handlename(e){
    // console.log(e.target)
   const {name,value}=e.target
     if(e.target.value){
      
      setfiltering({
        ...filtring,
       [name]:value
      });
      // console.log(value)
     }
  }

  return (
    <div className="App">
      <div><select onChange={handlesort}>
        <option value="">Select any option</option>
        <option value="Price:1" >Price Increasing Order</option>
        <option value="Price:-1">Price Decreasing Order</option>
        </select></div>
       <select onChange={handlename} name="name">
         <option name="name" value="">Choose any vehicle Name</option>
         <option name="name" value="Jaguar PT Cruiser">Jaguar PT Cruiser</option>
         <option name="name" value="Polestar A4">Polestar A4</option>
         <option name="name" value="">Mercedes Benz Roadster</option>
         <option name="name" value="">Jaguar Golf</option>
         <option name="name" value="Nissan Escalade">Nissan Escalade</option>
         <option name="name" value="Volvo Fortwo">Volvo Fortwo</option>
         <option name="name" value="Maserati 2">Maserati 2</option>
         <option name="name" value="Lamborghini A4">Lamborghini A4</option>
         <option name="name" value="Maserati Aventador">Maserati Aventador</option>
         <option name="name" value="Cadillac Land Cruiser">Cadillac Land Cruiser</option>
       </select>
       <select onChange={handlename} name="types">
         <option name="types" value="">Select Vehicle Types</option>
         <option name="types" value="Coupe">Coupe</option>
         <option name="types" value="Minivan">Minivan</option>
         <option name="types" value="Wagon">Wagon</option>
         <option name="types" value="Sedan">Sedan</option>
         <option name="types" value="Cargo Van">Cargo Van</option>
         <option name="types" value="Passenger Van">Passenger Van</option>
         <option name="types" value="Extended Cab Pickup">Extended Cab Pickup</option>
         <option name="types" value="Convertible">Convertible</option>
         <option name="types" value="Crew Cab Pickup">Crew Cab Pickup</option>
         <option name="types" value="SUV">SUV</option>
       </select>

       <select onChange={handlename} name="color">
         <option name="color" value="">Select any color</option>
         <option name="color" value="purple">purple</option>
         <option name="color" value="black">black</option>
         <option name="color" value="magenta">magenta</option>
         <option name="color" value="salmon">salmon</option>
         <option name="color" value="lime">lime</option>
         <option name="color" value="violet">violet</option>
         <option name="color" value="fuchsia">fuchsia</option>
         <option name="color" value="indigo">indigo</option>
         <option name="color" value="orchid">orchid</option>
         <option name="color" value="olive">olive</option>
       </select>
      {items.map(e=>{
        return(
          <div key={e._id} id="box">
            <div >Vehicle_Name:  {e.Vehicle_Name}</div>
            <div>Vehicle_types:  {e.vehicle_types}</div>
            <span style={{color:e.Color}}>Vehicle_Color:  {e.Color}</span>
          </div>
          
        )
      })}
      <div>
        <button disabled={page==1} onClick={()=>handle(-1)}>Previous</button>
        <button  disabled={page==count} onClick={()=>handle(+1)}>Next</button>
      </div>
    </div>
  )
}

export default App

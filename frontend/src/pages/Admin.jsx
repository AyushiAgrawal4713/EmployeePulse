import {
 useEffect,
 useState
}
from "react";

import api
from "../api/api";
import MoodChart
from "../components/MoodChart";

import DepartmentChart
from "../components/DepartmentChart";
import Leaderboard
from "./Leaderboard";

function Admin(){

 const [stats,
 setStats]
 =
 useState(null);

 useEffect(()=>{

   loadStats();

 },[]);
 

 const loadStats =
 async()=>{

   try{

      const res =
      await api.get(
      "/users/admin/stats"
      );

      setStats(
      res.data
      );

   }catch(error){

      console.log(error);

   }

 };

 if(!stats){

   return <h2>Loading...</h2>;

 }

 return(

 <div
 style={{
   padding:"20px"
 }}
 >

 <h1>
 Admin Dashboard
 </h1>

 <div
 style={{
   display:"grid",
   gridTemplateColumns:
   "repeat(4,1fr)",
   gap:"20px"
 }}
 >

 <div style={card}>
 <h3>
 Employees
 </h3>
 <h1>
 {stats.employees}
 </h1>
 </div>

 <div style={card}>
 <h3>
 Moods
 </h3>
 <h1>
 {stats.moods}
 </h1>
 </div>

 <div style={card}>
 <h3>
 Recognitions
 </h3>
 <h1>
 {stats.recognitions}
 </h1>
 </div>

 <div style={card}>
 <h3>
 Top Performer
 </h3>
 <h1>
 {
 stats.topPerformer?.name
 }
 </h1>
 </div>

 </div>

 </div>

 );

}

const card={

 background:"#f8fafc",

 padding:"20px",

 borderRadius:"10px",

 textAlign:"center",

 boxShadow:
 "0 0 5px rgba(0,0,0,0.2)"

};
<div
style={{
 display:"flex",
 gap:"50px",
 marginTop:"40px"
}}
>

<MoodChart />

<DepartmentChart />
<div
style={{
 marginTop:"40px"
}}
>

<Leaderboard />

</div>
</div>

export default Admin;
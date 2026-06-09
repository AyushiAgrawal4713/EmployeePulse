import {
 useEffect,
 useState
}
from "react";

import api
from "../api/api";

function Profile(){

 const [profile,
 setProfile]
 =
 useState(null);

 useEffect(()=>{

   loadProfile();

 },[]);

 const loadProfile =
 async ()=>{

   try{

      const user =
      JSON.parse(

         localStorage
         .getItem(
         "user"
         )

      );

      const res =
      await api.get(

      `/users/profile-stats/${user.id}`

      );

      setProfile(
      res.data
      );

   }catch(error){

      console.log(error);

   }

 };

 if(!profile){

   return <h2>Loading...</h2>;

 }

 return(

 <div
 style={{
   padding:"20px"
 }}
 >

 <h1>
 Employee Profile
 </h1>

 <div
 style={{
   border:"1px solid #ddd",
   padding:"20px",
   borderRadius:"10px",
   maxWidth:"600px"
 }}
 >

 <h2>
 {profile.name}
 </h2>

 <p>
 📧 {profile.email}
 </p>

 <p>
 🏢 {profile.department}
 </p>

 <p>
 🏆 Points:
 {profile.points}
 </p>

 <p>
 😊 Moods:
 {profile.moods}
 </p>

 <p>
 👏 Recognitions:
 {profile.recognitions}
 </p>

 <p>
 🥇 Rank:
 #{profile.rank}
 </p>
<h3>
Achievements
</h3>

<ul>

{
profile.recognitions >=1 &&
<li>
⭐ First Recognition
</li>
}

{
profile.points >=50 &&
<li>
🏆 Top Performer
</li>
}

{
profile.moods >=10 &&
<li>
🔥 Mood Champion
</li>
}

</ul>
 </div>

 </div>

 );
 

}

export default Profile;
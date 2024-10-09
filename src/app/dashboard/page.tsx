"use client"

import { useSession} from "next-auth/react";
function DashboarPage(){
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Status: {status}</p>
    </div>
  );  
}
export default DashboarPage
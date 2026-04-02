"use client"
import { OrganizationSwitcher,UserButton} from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="flex min-h-screen gap-4 flex-col justify-center items-center bg-background">
      <h1 className="text-2xl font-semibold"> Welcome to Resonance</h1>
       <div className="flex gap-4 items-center">
          <OrganizationSwitcher/>
          <UserButton/>
       </div>
       
    </div>
  );
}

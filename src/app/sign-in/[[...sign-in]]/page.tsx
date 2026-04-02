
import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){
    
    return (
        <div className="min-h-screen flex flex-col justify-center">

                <SignIn
                 appearance={
                    {
                       elements:{
                          rootBox:"mx-auto",
                          card:"shadow-lg"
                       }
                    }
                 }
                 
                
                />

                
        </div>
    )


}

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){
    
    return (
        <div className="min-h-screen flex flex-col justify-center">

                <SignUp
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
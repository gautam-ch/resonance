import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";


export function GenerateButton({
    size,
    className,
    disabled,
    isSubmitting,
    onSubmit
}:{
    size?:"default" | "sm",
    className?:string,
    disabled:boolean,
    isSubmitting:boolean,
    onSubmit: ()=> void;
}

){
        
    return(

    
            <Button
                size={size}
                className={className}
                disabled={disabled}
                onClick={onSubmit}
            >

            {
                isSubmitting?(
                <>
                    <Spinner className="size-3"/>
                    Generating..  
                </>
                ):(
                    "Generate speech"
                )
            }

            </Button>
        
    )
}
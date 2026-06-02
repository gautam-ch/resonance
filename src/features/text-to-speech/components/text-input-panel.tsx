"use client"
import { Textarea } from "@/components/ui/textarea"

import {TEXT_MAX_LENGTH,COST_PER_UNTI} from "../data/constants"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"
import { useStore } from "@tanstack/react-form"
import { useTypedAppFormContext } from "@/hooks/use-app-form"
import { ttsFormOptions } from "./text-to-speech-form"
import { GenerateButton } from "./generate-button"

export function TextInputPanel(){
     const form = useTypedAppFormContext(ttsFormOptions);
     const text=useStore(form.store,(f)=>f.values.text);
     const isSubmitting=useStore(form.store,(f)=>f.isSubmitting);
     const isValid=useStore(form.store,(f)=>f.isValid);

     return (
          <div className=" flex h-full min-h-0 flex-1 flex-col">
            {/* Text input area*/}
             <div className="relative flex-1 min-h-0 ">
              <form.Field name="text">
                  {(field)=>(
                      <Textarea
                        value={field.state.value}
                        onChange={(e)=>field.handleChange(e.target.value)}
                        placeholder="Start typing or paste your text here.."
                        className="absolute inset-0 resize-none border-0
                        bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base!
                        leading-relaxed tracking-tight shadow-none
                        wrap-break-word focus-visible:ring-0" 
                        maxLength={TEXT_MAX_LENGTH}
                        disabled={isSubmitting}
                    />
                  )}
                    
             </form.Field>  
             {/*bottom fade overlay*/}   
                    <div className="pointer-events-none absolute
                        inset-0-x bottom-0 h-8 bg-liner-to-t from-background to-transparent">
                        </div> 
                    </div>    

             {/*Action Bar*/}
             <div className="shrink-0 p-4 lg-p-6">

                 {/*Mobile layout*/}
                 <div className="flex flex-col gap-3 lg:hidden ">
                    <GenerateButton
                     className="w-full"
                     disabled={isSubmitting}
                     isSubmitting={isSubmitting}
                     onSubmit={()=>form.handleSubmit()}
                    />
                 </div>  

                 {/*Desktop*/}
                 {text.length>0?(
                         <div className="hidden items-center justify-between lg:flex">
                             <Badge
                              variant="outline"
                              className="gap-1.5 border-dashed"
                              >
                              <Coins className="size-3 text-chart-5"/>
                              <span className="text-sm">

                                 <span className="tabular-nums">
                                      ${(text.length*COST_PER_UNTI).toFixed(4)}
                                 </span>{" "}
                                 estimated
                              </span>
                                
                             </Badge>
                             <div className="flex items-center gap-3">
                                <p className="tracking-tight text-sm">
                                    {text.length.toLocaleString()}
                                    <span className="text-muted-foreground">
                                        {" "}
                                        /{" "} {TEXT_MAX_LENGTH.toLocaleString()} characters
                                    </span>
                                </p>
                                 <GenerateButton
                                    className="sm"
                                    disabled={isSubmitting || !isValid}
                                    isSubmitting={isSubmitting}
                                    onSubmit={()=>form.handleSubmit()}
                                 /> 
                             </div>
                        </div>
                 ):(
                     <div className="hidden lg:block">
                        <p className="text-sm text-muted-foreground">
                            Get started by typing or pasting text above
                        </p>

                     </div>
                 )}    
             </div>     
          </div>
     )
}
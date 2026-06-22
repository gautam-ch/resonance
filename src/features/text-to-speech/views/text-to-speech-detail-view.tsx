"use client"
import { SettingPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";

import { TextToSpeechForm, type TTSFormValues } from "../components/text-to-speech-form";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQueries } from "@tanstack/react-query";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";
import { VoicePreviewPanel } from "../components/voice-preview-panel";
import { VoicePreviewMobile } from "../components/voice-preview-mobile";
import { useIsMobile } from "@/hooks/use-mobile";

export function TextToSpeechDetailView({
    generationId,
}:{
    generationId:string;
}){
    
    const isMobile = useIsMobile();
    const trpc = useTRPC();
    const[
        generationQuery,
        voicesQuery
    ] = useSuspenseQueries({
        queries:[
        trpc.generations.getById.queryOptions({id:generationId}), 
        trpc.voices.getAll.queryOptions()
      ]
    });
    
    const data= generationQuery.data;
    const {custom:customVoices,system:systemVoices} = voicesQuery.data;
    const allVoices = [...customVoices,...systemVoices];
    const fallbackVoiceId = allVoices[0]?.id ?? "";
    
    const resolvedVoicedId = data?.voiceId && 
        allVoices.some((v) => v.id === data.voiceId)
        ? data.voiceId
        : fallbackVoiceId;

    const defaultValues:TTSFormValues = {
        text:data.text,
        voiceId:resolvedVoicedId,
        temperature:data.temperature,
        topK:data.topK,
        topP:data.topP,
        repetitionPenalty:data.repetitionPenalty,
    }
    
    const generationVoice={
        id:data.voiceId?? undefined,
        name:data.voiceName
    }



    return(
        <TTSVoicesProvider value={{customVoices,systemVoices,allVoices}}>
        <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
                <div className="flex min-h-0 flex-1 flex-col">    
                        <TextInputPanel/>
                        {isMobile ? (
                          <VoicePreviewMobile 
                            audioUrl={data.audioUrl}
                            voice={generationVoice}
                            text={data.text}
                          />
                        ) : (
                          <VoicePreviewPanel 
                            audioUrl={data.audioUrl}
                            voice={generationVoice}
                            text={data.text}
                          />
                        )}
                </div>
                <SettingPanel/>

        </div>
        </TextToSpeechForm>
        </TTSVoicesProvider>
    )
}
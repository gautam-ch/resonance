import { auth } from "@clerk/nextjs/server";
import {parseBuffer} from "music-metadata";
import {file, z} from "zod";
import {prisma} from "@/lib/db";
import { uploadAudio } from "@/lib/r2";
import { VOICE_CATEGORIES } from "@/features/voices/data/voice-categories";
import type { VoiceCategory } from "@/generated/prisma/enums";

const createVoiceSchema =z.object({
    name:z.string().min(1,"Voice name is required"),
    category:z.enum(VOICE_CATEGORIES as [VoiceCategory,...VoiceCategory[]]),
    language:z.string().min(1,"Language is required"),
    description:z.string().nullish(),
})

const MAX_UPPLOAD_SIZE_BYTES=20*1024*1024; // 20MB
const MIN_AUDIO_DURATION_SECONDS=10; // 10 second

export async function POST(
    request:Request
){
     const {userId,orgId}=await auth();

     if(!userId || !orgId){
        return new Response("Unauthorized",{status:401});
     }
     //why not body : we need file so better to searchParams
     const url = new URL(request.url);

     const validation = createVoiceSchema.safeParse({
        name:url.searchParams.get("name"),
        category:url.searchParams.get("category"),
        language:url.searchParams.get("language"),
        description:url.searchParams.get("description"),
     });

     if(!validation.success){
        return  Response.json(
            {
                error:"Invalid input",
                issues:validation.error.issues,
            },
                {status:400}
         );
     }

     const {name,category,language,description}=validation.data;

     const fileBuffer = await request.arrayBuffer();

     if(!fileBuffer.byteLength){
          return Response.json(
            {error:"Please upload an audio file"},
            {status:400},
          );
     }

     if(fileBuffer.byteLength>MAX_UPPLOAD_SIZE_BYTES){
        return Response.json(
            {error:"Audio file is too large. Max size is 20MB"},
            {status:400},
        );
     }

     const contentType = request.headers.get("content-type");

     if(!contentType){
        return Response.json(
            {error:"Missing Content-Type header"},
            {status:400},
        )
     }

     const normalizedContentType = contentType.split(";")[0]?.trim() || "audio/wav";

     let duration:number;

     try{
          const metadata = await parseBuffer(
            new Uint8Array(fileBuffer),
            {mimeType:normalizedContentType},
            {duration:true},
          );
          duration=metadata.format.duration ?? 0;

     }catch{
        return Response.json(
            {error:"File is not a valid audio file"},
            {status:422},
        )
     }

     if(duration<MIN_AUDIO_DURATION_SECONDS){
        return Response.json(
            {error:`Audio too short (${duration.toFixed(1)}s) Minimum duration is 10 seconds`},
            {status:422},
        )
     }


     let createdVoiceId:string | null = null;

     try{
          const voice = await prisma.voice.create({
            data:{
                name,
                variant:"CUSTOM",
                orgId,
                description,
                category,
                language,
            },
            select:{
                id:true,
            }
          })

          createdVoiceId=voice.id;

          const r2ObjectKey = `voices/orgs/${orgId}/${voice.id}`;

          await uploadAudio({
             buffer:Buffer.from(fileBuffer),
             key:r2ObjectKey,
             contentType:normalizedContentType,

          })

          await prisma.voice.update({
            where:{id:voice.id},
            data:{r2ObjectKey},
          })


     }catch{
          
        if(createdVoiceId){
            await prisma.voice.delete({
                where:{id:createdVoiceId},
            }).catch((err)=>{
                console.error("Failed to delete voice after upload failure",err);
            })
        }

        return Response.json(
            {error:"Failed to create voice,Please retry"},
            {status:500},
        )
     }

     return Response.json(
        {message:"Voice created successfully"},
        {status:201},
     )
}
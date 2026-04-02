import { prisma } from "@/lib/db"


export default async function TestPage(){
     const voices = await prisma.voice.findMany({});

     return (
        <div className="p-8 min-h-screen flex flex-col items-center">
        <div className="text-2xl font-semibold"> Voices-{voices.length}</div>

        <div className="space-y-2">
            {
                voices.map((v,id)=>(
                    <div key={id}>
                        {v.name}-{v.variant}
                    </div>
                ))
            }
        </div>
        </div>
     )
}
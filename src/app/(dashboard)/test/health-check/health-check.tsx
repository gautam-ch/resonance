"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


export  function HealthCheck() {
    const trpc=useTRPC();
    const {data }= useSuspenseQuery(trpc.health.queryOptions());
    return(
        <div>
             <p>Health check</p>
             <p>data status: {data.status} </p>
        </div>
    )
}
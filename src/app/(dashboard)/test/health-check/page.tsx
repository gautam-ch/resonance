import { Suspense } from "react";
import { HealthCheck } from "./health-check";
import {trpc,prefetch, HydrateClient} from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";


export default function(){
    prefetch(trpc.health.queryOptions());

     return(
        <HydrateClient>
          <ErrorBoundary fallback={<div>Error occurred</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                <HealthCheck/>
            </Suspense> 
          </ErrorBoundary>
        </HydrateClient>
     )
}
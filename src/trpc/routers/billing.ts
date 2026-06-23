import {polar} from "@/lib/polar";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter,orgProcedure } from "../init";
import { env } from "@/lib/env";

export const billingRouter = createTRPCRouter({
    createCheckout: orgProcedure.mutation(async ({ ctx }) => {
                  
         const result = await polar.checkouts.create({
            products:[env.POLAR_PRODUCT_ID],
            externalCustomerId:ctx.orgId,
            successUrl:env.APP_URL
         })

         if(!result.url){
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Failed to create checkout session"
            })
         }

         return {checkoutUrl:result.url};
    }),
    createPortalSession:orgProcedure.mutation(async ({ ctx }) => {
        const result = await polar.customerSessions.create({
            externalCustomerId:ctx.orgId,
        })

        if(!result.customerPortalUrl){
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Failed to create customer portal session"
            })
        }

        return {portalUrl:result.customerPortalUrl};


    }),
    getStatus:orgProcedure.query(async ({ ctx }) => {
               try{
                     const customerState=await polar.customers.getStateExternal({
                        externalId:ctx.orgId
                     })

                     const hasActiveSubscription=
                     (customerState.activeSubscriptions ?? []).length>0;

                     let estimatedCostCents=0;

                     for(const sub of customerState.activeSubscriptions ?? []){
                        for(const meter of sub.meters ?? []){
                            estimatedCostCents+=meter.amount ?? 0;
                        }
                     }

                     return {
                        hasActiveSubscription,
                        estimatedCostCents,
                        customerId:customerState.id
                     }
               }catch{

                   return {
                    hasActiveSubscription:false,
                    estimatedCostCents:0,
                    customerId:null
                   }
               }     
    })
})
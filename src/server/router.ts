	// @/src/server/router.ts
  import { initTRPC } from '@trpc/server';
  import { z } from "zod"
  
  import { Context } from "./context"
  
  const t = initTRPC.context<Context>().create();
  
  // Base router and procedure helpers
  const router = t.router;
  const publicProcedure = t.procedure; 
  
  export const serverRouter = router({
  
    /////all the users:
    findAllUsers: publicProcedure
      .query(({ ctx  }: {ctx:Context}) => {
      return ctx.prisma.user.findMany();
      }
    ),


    // post image blob to database
    insertImage: publicProcedure
      .input(z.object({
        image: z.string(),
      }))
      .mutation(({ input, ctx }: {input: {image: string}, ctx: Context}) => {
        return ctx.prisma.image.create({
          data: {
            image: input.image,
          },
        });
      }
      ),
  

/////all the audits:
    findAllAudits: publicProcedure
      .query(({ ctx  }: {ctx:Context}) => {
        // console.log("find all audits")
        // console.log(ctx.prisma.audit.findMany())
      return ctx.prisma.audit.findMany();
      }
    ),


    // /////all the products:
    // findAllProducts: publicProcedure
    //   .query(({ ctx  }: {ctx:Context}) => {
    //   return ctx.prisma.product.findMany();
    //   }
    // ),
  
  
  //     /////find product reviews by ID: 
  //   findProductReviews: publicProcedure
  //   .input(z.object({
  //     productId: z.number(),
  //   }))
  //   .query(async ({ input, ctx }) => {
  //     const { productId } = input;
  
  //     try {
  //       const reviews = await ctx.prisma.productReview.findMany({
  //         where: { productId: productId },
  //       });
  //       // console.log(reviews); 
  //       return reviews;
  //     } catch (error) {
  //       console.error('Error fetching product reviews:', error);
  //       throw error; 
  //     }
  //   }),
  
  // //find seller reviews by the seller's ID. 
  //     findSellerReviews: publicProcedure
  //   .input(z.object({
  //     sellerId: z.number(),
  //   }))
  //   .query(async ({ input, ctx }) => {
  //     const { sellerId } = input;
  
  //     try {
  //       const reviews = await ctx.prisma.sellerReview.findMany({
  //         where: { sellerId: sellerId },
  //       });
  //       // console.log(reviews); 
  //       return reviews;
  //     } catch (error) {
  //       console.error('Error fetching seller reviews:', error);
  //       throw error; 
  //     }
  //   }),
  
  
  // ///find seller/user by their id
  //     findSellerById: publicProcedure
  //   .input(z.object({
  //     id: z.number(),
  //   }))
  //   .query(({ input, ctx }: { input: { id: number }, ctx: Context }) => {
  //     const { id } = input;
  //     return ctx.prisma.user.findFirst({
  //       where: {
  //         id: id,
  //       },
  //     });
  //   }),
  
  //     //find product by seller Id 
  //     findUserListing: publicProcedure
  //   .input(z.object({
  //     userId: z.number(),				
  //   }))
  //     .query(async ({ input, ctx }) => {
  //     const { userId } = input;
  
  //     try {
  //       const listings = await ctx.prisma.userListing.findMany({
  //         where: { userId: userId },
  //       });
  //       // console.log(listings); 					
  
  //             const productIds = listings.map((listing: { productId: any; }) => listing.productId);
  //             const products = ctx.prisma.product.findMany({
  //       where: {
  //         id: {
  //           in: productIds,
  //         },
  //       },
  //       select: {
  //                 id: true,
  //         title: true,
  //                 description: true,
  //         imagepath: true,
  //                 price: true,
  //                 rating: true,
  //       },
  //     });
  //         console.log(`Products: ${products}`)
  //     return products;
  //     } catch (error) {
  //       console.error('Error fetching user listings:', error);
  //       throw error; 
  //     }
  //   }),
      
      
    insertUser: publicProcedure
      .input(z.object({
        fName: z.string(),
        lName: z.string(),
        username: z.string(),
        password: z.string(),
      }))
      .mutation(({ input, ctx }: {input: {fName: string, lName: string, username: string, password: string}, ctx: Context}) => {
        return ctx.prisma.user.create({
          data: {
            fName: input.fName,
            lName: input.lName,
            username: input.username,
            password: input.password,
          },
        });
      }
      ),
  
    login: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
      }))
      
      .query(({ input, ctx }: {input: {username: string, password: string}, ctx: Context}) => {
        return ctx.prisma.user.findFirst({
          where: {
            username: input.username, password: input.password,
          },
        });
      }
      ),
  
  
  
  
    //   insertOne: publicProcedure
    //     .input(z.object({
    //         title: z.string(),
    //         description: z.string(),
    //         imagePath: z.string(),
    //         price: z.number(),
  
    //       })
    //     )
    //     .mutation(({ input, ctx }: {input: {title: string, description: string, imagePath: string, price: number}, ctx: Context}) => {
    //       return ctx.prisma.product.create({
    //         data: { title: input.title },
    //       });
    //     }
    //   ),
    //   updateOne: publicProcedure
    //     .input(z.object({
    //         id: z.number(),
    //         title: z.string(),
    //         checked: z.boolean(),
    //     }))
    //     .mutation(({ input, ctx }) => {
    //       const { id, ...rest } = input;
  
    //       return ctx.prisma.product.update({
    //         where: { id },
    //         data: { ...rest },
    //       });
    //     }
    //   ),
    //   deleteAll: publicProcedure
    //     .input(z.object({
    //         ids: z.number().array(),
    //     }))
    //     .mutation(({ input, ctx }) => {
    //       const { ids } = input;
  
    //       return ctx.prisma.product.deleteMany({
    //         where: { id: { in: ids } },
    //       });
    //     }
    //   ),
  
  
  
  
  
  });
  
  export type ServerRouter = typeof serverRouter;
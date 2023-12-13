// @/src/server/router.ts
import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

const t = initTRPC.context<Context>().create();
import bcrypt from "bcryptjs";

// Base router and procedure helpers
const router = t.router;
const publicProcedure = t.procedure;

export const serverRouter = router({
  /////all the checklists:
  findAllChecklists: publicProcedure.query(({ ctx }: { ctx: Context }) => {
    return ctx.prisma.checklist.findMany();
  }),

  // insert checklist line item
  insertChecklist: publicProcedure
    .input(
      z.object({
        auditid: z.number(),
        sql: z.number(),
        cltext: z.string(),
        process: z.string(),
      })
    )
    .mutation(
      ({
        input,
        ctx,
      }: {
        input: {
          auditid: number;
          sql: number;
          cltext: string;
          process: string;
        };
        ctx: Context;
      }) => {
        return ctx.prisma.checklist.create({
          data: {
            auditid: input.auditid,
            sql: input.sql,
            cltext: input.cltext,
            process: input.process,
          },
        });
      }
    ),

  // update checklist line item
  updateChecklist: publicProcedure
    .input(
      z.object({
        id: z.number(),
        auditid: z.number(),
        sql: z.number(),
        cltext: z.string(),
        process: z.string(),
      })
    )
    .mutation(
      ({
        input,
        ctx,
      }: {
        input: {
          id: number;
          auditid: number;
          sql: number;
          cltext: string;
          process: string;
        };
        ctx: Context;
      }) => {
        const { id, ...rest } = input;

        return ctx.prisma.checklist.update({
          where: { id },
          data: { ...rest },
        });
      }
    ),

  // delete checklist line item
  deleteChecklist: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { id } = input;

      return ctx.prisma.checklist.deleteMany({
        where: { id: id },
      });
    }),

  /////all the users:
  findAllUsers: publicProcedure.query(({ ctx }: { ctx: Context }) => {
    return ctx.prisma.user.findMany();
  }),

  //all the audits:
  findAllAudits: publicProcedure.query(({ ctx }: { ctx: Context }) => {
    // console.log("find all audits")
    // console.log(ctx.prisma.audit.findMany())
    return ctx.prisma.audit.findMany();
  }),

  insertAudit: publicProcedure
    .input(
      z.object({
        title: z.string(),
        qmsref: z.string(),
      })
    )
    .mutation(
      ({
        input,
        ctx,
      }: {
        input: { title: string; qmsref: string };
        ctx: Context;
      }) => {
        return ctx.prisma.audit.create({
          data: {
            title: input.title,
            qmsref: input.qmsref,
            active: true,
            rev: "1",
          },
        });
      }
    ),

  insertUser: publicProcedure
    .input(
      z.object({
        fName: z.string().min(1),
        lName: z.string().min(1),
        username: z.string().min(3),
        password: z.string().min(5),
      })
    )
    .mutation(({ input, ctx }) => {
      //has user password
      const password = bcrypt.hashSync(input.password, 10);

      const user = ctx.prisma.user.create({
        data: { ...input, password },
      });

      return { user };
    }),

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

  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )

    .query(
      ({
        input,
        ctx,
      }: {
        input: { username: string; password: string };
        ctx: Context;
      }) => {
        return ctx.prisma.user.findFirst({
          where: {
            username: input.username,
            password: input.password,
          },
        });
      }
    ),

  // insertOne: publicProcedure
  //   .input(z.object({
  //       title: z.string(),
  //       description: z.string(),
  //       imagePath: z.string(),
  //       price: z.number(),

  //     })
  //   )
  //   .mutation(({ input, ctx }: {input: {title: string, description: string, imagePath: string, price: number}, ctx: Context}) => {
  //     return ctx.prisma.product.create({
  //       data: { title: input.title },
  //     });
  //   }
  // ),
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
  deleteAudit: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { id } = input;

      return ctx.prisma.audit.deleteMany({
        where: { id: id },
      });
    }),
});

export type ServerRouter = typeof serverRouter;

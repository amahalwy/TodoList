import { PrismaClient } from "@prisma/client";

export default async (req) => {
  const prisma = new PrismaClient();

  // const { owner, nominations } = req.body;

  // const id = uuid();
  // const data = {
  //   id,
  //   owner,
  //   nominations,
  // };

  // try {
  //   const tinyResponse = await tinyURL(id);

  //   const list = await prisma.list.create({
  //     data: { ...data, tinyurl: tinyResponse },
  //   });

  //   return res.json(list);
  // } catch {
  //   res.json({ error: true });
  // }
};

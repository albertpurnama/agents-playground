import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsedBody = req.body;

  try {
    const participant = await prisma.participants.findUniqueOrThrow({
      select: {
        system_message: true,
      },
      where: {
        id: parsedBody.identity as string,
      },
    });

    const sys = participant?.system_message;
    res.status(200).json({
      system_message: sys,
    });
  } catch (e) {
    res.status(500).json({
      message: "unable to get system message",
      error: e,
    });
  }
  return;
}

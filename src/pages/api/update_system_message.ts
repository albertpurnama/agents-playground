import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsedBody = req.body;

  try {
    const participant = await prisma.participants.update({
      where: {
        id: parsedBody.identity as string,
      },
      data: {
        system_message: parsedBody.systemMessage as string,
      },
    });

    res.status(200).json({
      participant,
    });
  } catch (e) {
    res.status(500).json({
      message: "unable to get system message",
      error: e,
    });
  }
  return;
}

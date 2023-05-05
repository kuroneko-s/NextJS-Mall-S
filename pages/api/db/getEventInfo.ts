import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { Book } from "@prisma/client";
import { EventInfo } from "./Common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";
  const idNum = Number(id.toString());

  const bookArr: Book[] = [];
  let bookIds: number[] = [];

  const event = await prismaClient.event.findUnique({
    where: {
      id: idNum,
    },
  });

  if (event === null) {
    return res.json({ ok: false, error: "Not Found Event Id: " + id });
  }

  const categories = await prismaClient.eventAndCategory.findMany({
    where: {
      eventId: idNum,
    },
  });

  for (const target of categories) {
    const books = await prismaClient.book.findMany({
      where: {
        categoryId: target.categoryId,
      },
    });

    const ids = books.map((book) => book.isbn);
    bookIds = [...bookIds, ...ids];
  }

  const books = await prismaClient.eventAndBook.findMany({
    where: {
      evnetId: idNum,
    },
  });

  const ids = books.map((book) => book.bookId);
  bookIds = [...bookIds, ...ids];

  for (const bookId of [...new Set([...bookIds])]) {
    const book = await prismaClient.book.findUnique({
      where: {
        isbn: bookId,
      },
      include: {
        writer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (book !== null) {
      bookArr.push(book);
    }
  }

  return res.json({
    ok: true,
    data: {
      Event: event,
      Books: bookArr,
    } as EventInfo,
  });
}

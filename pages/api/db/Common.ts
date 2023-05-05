import { BookWithWriter } from "@lib/interface/db";
import { Event } from "@prisma/client";

export interface EventInfo {
  Event: Event;
  Books: BookWithWriter[];
}

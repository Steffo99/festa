import { Event } from "@prisma/client";
import { default as useSWR } from "swr";

export function useMyEventsSWR() {
    return useSWR<Event[]>("/api/events/mine")
}

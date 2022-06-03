import { Event } from "@prisma/client";
import useSWR, { SWRResponse } from "swr";

export function useMyEvents(): SWRResponse<Event[]> {
    return useSWR("/api/events/mine")
}

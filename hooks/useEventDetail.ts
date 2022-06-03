import { Event } from "@prisma/client";
import useSWR, { SWRResponse } from "swr";

export function useEventDetail(slug: string): SWRResponse<Event> {
    return useSWR(`/api/events/${slug}`)
}

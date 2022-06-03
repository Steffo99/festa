import { Event } from "@prisma/client";
import { default as useSWR } from "swr";

export function useEventDetailsSWR(slug: string) {
    return useSWR<Event>(`/api/events/${slug}`)
}

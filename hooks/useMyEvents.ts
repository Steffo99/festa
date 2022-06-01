import useSWR from "swr";

export function useMyEvents() {
    return useSWR("/api/events/mine")
}

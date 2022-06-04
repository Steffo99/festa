import { Event } from "@prisma/client"
import { default as Link } from "next/link"

type ListEventsProps = {
    data: Event[]
}

export function ListEvents(props: ListEventsProps) {
    const contents = props.data.map(e => (
        <li key={e.slug}>
            <Link href={`/events/${e.slug}`}>
                {e.name}
            </Link>
        </li>
    ))

    return <ul className="list-events">{contents}</ul>
}

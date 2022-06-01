import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { HTMLProps } from "react";
import { useMyEvents } from "../hooks/useMyEvents";
import { Loading } from "./Loading";
import { Event } from "@prisma/client";


export function ActionEventList(props: HTMLProps<HTMLFormElement>) {
    const {t} = useTranslation()
    const { data, error } = useMyEvents()

    const newClassName = classNames(props.className, {
        "negative": error,
    })
    
    let contents: JSX.Element

    if(error) {
        contents = <>
            <p>
                {t("eventListError")}
            </p>
            <code>
                {JSON.stringify(error)}
            </code>
        </>
    }
    else if(!data) {
        contents = <Loading/>
    }
    else {
        if(data.length === 0) {
            contents = <>
                <p>
                    {t("eventListCreateFirst")}
                </p>
            </>
        }
        else {
            contents = <>
                <p>
                    {t("eventListDescription")}
                </p>
                <div>
                    {data.map((event: Event) => <div><a href={`/events/${event.slug}`}>{event.name}</a></div>)}
                </div>
                <p>
                    {t("eventListCreateAnother")}
                </p>
                <form className="form-monorow">
                    <input
                        type="text"
                        placeholder={t("eventListCreatePlaceholder")}
                    />
                    <input
                        type="submit"
                        className="positive square-40"
                        value="→"
                    />
                </form>
            </>
        }
    }

    return (
        <div className={newClassName}>
            {contents}
        </div>
    )
}
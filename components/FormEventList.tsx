import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { HTMLProps } from "react";
import { useMyEvents } from "../hooks/useMyEvents";
import { Loading } from "./Loading";
import { Event } from "@prisma/client";


export function FormEventList(props: HTMLProps<HTMLFormElement>) {
    const {t} = useTranslation()
    const { data, error } = useMyEvents()

    const newClassName = classNames(props.className, {
        "negative": error,
    })
    
    let message: JSX.Element
    let contents: JSX.Element

    if(error) {
        message = t("formEventListError")
        contents = (
            <div>
                <code>
                    {JSON.stringify(error)}
                </code>
            </div>
        )
    }
    else if(!data) {
        message = <Loading/>
        contents = <></>
    }
    else {
        console.debug(data)
        if(data.length === 0) {
            message = t("formEventListFirst")
            contents = (
                <div>zzz</div>
            )
        }
        else {
            message = t("formEventListAnother")
            contents = (
                <div>
                    {data.map((event: Event) => <div><a href={`/events/slug`}>{event.name}</a></div>)}
                </div>
            )
        }
    }


    return (
        <form className={newClassName}>
            <p>
                {message}
            </p>
            {contents}
        </form>
    )
}
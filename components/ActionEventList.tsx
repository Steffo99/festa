import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { HTMLProps } from "react";
import { useMyEvents } from "../hooks/useMyEvents";
import { Loading } from "./Loading";
import { EventList } from "./EventList";
import { EventCreate } from "./EventCreate";


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
        contents = <Loading text={t("eventListLoading")}/>
    }
    else {
        if(data.length === 0) {
            contents = <>
                <p>
                    {t("eventListCreateFirst")}
                </p>
                <EventCreate/>
            </>
        }
        else {
            contents = <>
                <p>
                    {t("eventListDescription")}
                </p>
                <EventList data={data}/>
                <p>
                    {t("eventListCreateAnother")}
                </p>
                <EventCreate/>
            </>
        }
    }

    return (
        <div className={newClassName}>
            {contents}
        </div>
    )
}
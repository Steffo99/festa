import { default as classNames } from "classnames";
import { useTranslation } from "next-i18next";
import { HTMLProps } from "react";
import { useMyEventsSWR } from "../hooks/swr/useMyEventsSWR";
import { Loading } from "./Loading";
import { ListEvents } from "./ListEvents";
import { EventCreate } from "./EventCreate";


export function ActionEventList(props: HTMLProps<HTMLFormElement>) {
    const { t } = useTranslation()
    const { data, error } = useMyEventsSWR()

    const newClassName = classNames(props.className, {
        "negative": error,
    })

    let contents: JSX.Element

    if (error) {
        contents = <>
            <p>
                {t("eventListError")}
            </p>
            <code>
                {JSON.stringify(error)}
            </code>
        </>
    }
    else if (!data) {
        contents = <Loading text={t("eventListLoading")} />
    }
    else {
        if (data.length === 0) {
            contents = <>
                <p>
                    {t("eventListCreateFirst")}
                </p>
                <EventCreate />
            </>
        }
        else {
            contents = <>
                <p>
                    {t("eventListDescription")}
                </p>
                <ListEvents data={data} />
                <p>
                    {t("eventListCreateAnother")}
                </p>
                <EventCreate />
            </>
        }
    }

    return (
        <div className={newClassName}>
            {contents}
        </div>
    )
}
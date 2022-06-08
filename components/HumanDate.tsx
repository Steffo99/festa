import { useTranslation } from "next-i18next"

type HumanDateProps = {
    date: Date
}


export function HumanDate({date}: HumanDateProps) {
    const {t} = useTranslation()

    if(Number.isNaN(date.getTime())) {
        return (
            <span className="disabled">
                {t("dateNaN")}
            </span>
        )
    }

    return (
        <time dateTime={date.toISOString()}>
            {date.toLocaleString()}
        </time>
    )
}
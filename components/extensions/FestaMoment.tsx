import { useTranslation } from "next-i18next"

type HumanDateProps = {
    date: Date
}

/**
 * Component that formats a {@link Date} to a machine-readable and human-readable HTML `time[datetime]` element. 
 */
export function FestaMoment({ date }: HumanDateProps) {
    const { t } = useTranslation()

    if (Number.isNaN(date.getTime())) {
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
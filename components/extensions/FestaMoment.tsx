import { useTranslation } from "next-i18next"

type FestaMomentProps = {
    date: Date,
}

/**
 * Component that formats a {@link Date} to a machine-readable and human-readable HTML `time[datetime]` element. 
 */
export function FestaMoment({ date }: FestaMomentProps) {
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
import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginContext } from '../contexts/login';
import { useDefinedContext } from '../utils/definedContext';
import { FormLoginTelegram } from '../components/FormLoginTelegram';


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


export default function PageIndex() {
    const { t } = useTranslation("common")
    const [login, _] = useDefinedContext(LoginContext)

    return (
        <main id="page-index" className="page">
            <hgroup className="hero-titles">
                <h1>
                    {t("siteTitle")}
                </h1>
                <h2>
                    {t("siteSubtitle")}
                </h2>
            </hgroup>
            {login ?
                <div className="hero-action">
                    <label htmlFor="input-name">
                        <p>
                            {t("eventsInputDescriptionFirst")}
                        </p>
                    </label>
                    <form 
                        className="form-event-create"
                    >
                        <input 
                            id="input-name" 
                            placeholder={t("eventsInputName")}
                            type="text"
                        />
                        <input
                            id="input-submit"
                            type="submit"
                            aria-label={t("eventsInputSubmitLabel")}
                            value="→"
                            className="square-40 positive"
                        />
                    </form>
                </div>
            :
                <FormLoginTelegram
                    className="hero-action"
                />
            }
        </main>
    )
}

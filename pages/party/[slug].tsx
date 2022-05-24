import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import TelegramLoginButton from 'react-telegram-login'
import * as Telegram from "../../utils/telegram"

interface PageProps {
    userData: Telegram.LoginData | null
}

export async function getServerSideProps(context: NextPageContext): Promise<{props: PageProps}> {
    const props: PageProps = {
        userData: null,
    }

    const token = process.env.BOT_TOKEN
    if(token === undefined) {
        throw new Error("BOT_TOKEN is not set on the server-side, cannot perform login validation.")
    }

    if(context.query.hash !== undefined) {
        const loginResponse = new Telegram.LoginResponse(context.query)
        if(loginResponse.isRecent() && loginResponse.isValid(process.env.BOT_TOKEN)) {
            props.userData = loginResponse.serialize()
        }
    }

    return {props}
}

const Page: NextPage<PageProps> = ({userData}) => {
    const router = useRouter()
    
    return (
        <div>
            {userData ? 
                JSON.stringify(userData)
            :
                <TelegramLoginButton
                    dataAuthUrl={router.asPath}
                    botName="festaappbot"
                />
            }
        </div>
    )
}

export default Page

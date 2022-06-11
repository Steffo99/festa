import { NextApiRequest, NextApiResponse } from "next";
import { festaAPI } from "../../../utils/api";
import { festaNoConfig } from "../../../utils/api/configurator";
import { festaBearerAuthRequired, FestaToken } from "../../../utils/api/authenticator";
import { festaNoBody } from "../../../utils/api/bodyValidator";
import { festaDebugAuth } from "../../../utils/api/executor";
import { festaNoQuery } from "../../../utils/api/queryValidator";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await festaAPI(req, res, {
        configurator: festaNoConfig,
        authenticator: festaBearerAuthRequired,
        queryValidator: festaNoQuery,
        bodyValidator: festaNoBody,
        executor: festaDebugAuth<FestaToken>(),
    })
}

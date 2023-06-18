import axios, { isCancel, AxiosError } from 'axios';

exports.handler = async function (event, context) {
    const requestData = event.queryStringParameters;
    console.log('requestData:', requestData);

    const lastFmBaseUrl = process.env.LAST_FM_URL;
    const lastFmUrl = new URL(lastFmBaseUrl);
    
    let params = requestData.params;
    params.api_key = process.env.LAST_FM_API_KEY;

    let lastFmConfig = {
        params: params,
        headers: {
            'user-agent': process.env.LAST_FM_USER_AGENT
        }
    };

    try {
        axios.get(lastFmUrl.toString(), lastFmConfig)
            .then((response) => {
                console.log('response.data:', response.data);
                return {
                    statusCode: 200,
                    body: response.data
                }
            })
            .catch((error) => {
                return {
                    statusCode: 500,
                    body: JSON.stringify({error: error.message})
                }
            });
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }

    // 'api_key': process.env.LAST_FM_API_KEY,
}
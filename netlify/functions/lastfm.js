import axios, { isCancel, AxiosError } from 'axios';

exports.handler = async function (event, context) {
    const requestData = event.queryStringParameters;
    console.log('requestData:', requestData);

    const lastFmBaseUrl = process.env.LAST_FM_URL;
    const lastFmUrl = new URL(lastFmBaseUrl);
    
    // let params = requestData.params;
    let params = {
        'format': requestData.format,
        'method': requestData.method,
        'user': requestData.user,
        'api_key': process.env.LAST_FM_API_KEY
    };
    console.log('params:', params);

    let lastFmConfig = {
        params: params,
        headers: {
            'user-agent': process.env.LAST_FM_USER_AGENT
        }
    };
    console.log('lastFmConfig:', lastFmConfig);

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
                console.log('axios error:', error.message);
                return {
                    statusCode: 500,
                    body: JSON.stringify({error: error.message})
                }
            });
    } catch (error) {
        console.log('function error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }

    // 'api_key': process.env.LAST_FM_API_KEY,
}
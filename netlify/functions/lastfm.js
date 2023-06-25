import axios, { isCancel, AxiosError } from 'axios';

exports.handler = async function (event, context, callback) {
    const requestData = event.queryStringParameters;
    console.log('requestData:', requestData);

    const lastFmBaseUrl = process.env.LAST_FM_URL;
    
    let params = requestData.params || {};
    // let params = requestData.params;
    // let params = {
    //     'format': requestData.format,
    //     'method': requestData.method,
    //     'api_key': process.env.LAST_FM_API_KEY
    // };

    if (process.env.LAST_FM_API_KEY) {
        params.api_key = process.env.LAST_FM_API_KEY;
    }

    if (requestData.user) {
        params.user = requestData.user;
    }

    console.log('params:', params);

    let lastFmConfig = {
        params: params,
        headers: {
            'user-agent': process.env.LAST_FM_USER_AGENT,
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Credentials': 'true'
        }
    };
    console.log('lastFmConfig:', lastFmConfig);

    try {
        console.log('running axios get request');
        await axios.get(lastFmBaseUrl, lastFmConfig)
            .then((response) => {
                console.log('body:', JSON.stringify(response.data));
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(response.data)
                });
            })
            .catch((error) => {
                console.error('axios error:', error.message);
                return {
                    statusCode: 500,
                    body: JSON.stringify({error: error.message})
                }
            });
    } catch (error) {
        console.error('function error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }

    // 'api_key': process.env.LAST_FM_API_KEY,
}
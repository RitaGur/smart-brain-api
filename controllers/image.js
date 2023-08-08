import fetch from "node-fetch";

const clarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'b271c65df4f349a492272a6aa1eacd6c';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'rita2015';
    const APP_ID = 'my-first-application-qk9igj';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
}

export const HandleApiCall = (request, response) => {
    const afterRequestResult = clarifaiRequestOptions(request.body.input);

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", afterRequestResult)
        .then(data => response.json(data))
        .catch(err => response.status(400).json('unable to work with API'));
}

export const handleImage = (request, response, db) => {
    const { id } = request.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            response.json(entries[0].entries);
        })
        .catch(err => response.status(400).json('unable to get entries'));
}
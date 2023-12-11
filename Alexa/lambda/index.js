/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const axios = require('axios');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to relaxa, I\'m preparing the scene and audio for you. You can ask me to switch between scenes and audios';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else can I do for you?')
            .getResponse();
    }
};

const NextSceneIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NextSceneIntent';
    },
    async handle(handlerInput) {
        // const speakOutput = 'Switching to next scene.';
        var speakOutput = ""
        
        // Example HTTP request using axios
        try {
            const response = await axios.post('https://d04f-2603-8000-8f00-4646-3ceb-f808-b7ea-5dab.ngrok-free.app/api/data',{
                message: "next scene"
                // Include other data you want to send in the request body
            });
            // const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            //     title: 'foo',
            //     body: 'bar',
            //     userId: 1,
            //     // Include other data you want to send in the request body
            // });
            
            // Check if the HTTP status code is in the success range
            if (response.status >= 200 && response.status < 300) {
                speakOutput = 'Switching to the next scene, success!';
                
            } else {
                speakOutput = 'Switching to the next scene, fail.';
                
            }

            // Handle the HTTP response
            console.log(response.data);

        } catch (error) {
            // Handle HTTP request error
            console.error(error);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else can I do for you?')
            .getResponse();
    }
};

const NextAudioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NextAudioIntent';
    },
    async handle(handlerInput) {
        //const speakOutput = 'Switching to next audio.';
        var speakOutput = ""
        
        // Example HTTP request using axios
        try {
            const response = await axios.post('https://d04f-2603-8000-8f00-4646-3ceb-f808-b7ea-5dab.ngrok-free.app/api/data', {
                message: "next audio",
                // Include other data you want to send in the request body
            });
            // const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            //     title: 'foo',
            //     body: 'bar',
            //     userId: 1,
            //     // Include other data you want to send in the request body
            // });
            
            // Check if the HTTP status code is in the success range
            if (response.status >= 200 && response.status < 300) {
                speakOutput = 'Switching to the next audio, success!';
                
            } else {
                speakOutput = 'Switching to the next audio, fail.';
                
            }

            // Handle the HTTP response
            console.log(response.data);

        } catch (error) {
            // Handle HTTP request error
            console.error(error);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else can I do for you?')
            .getResponse();
    }
};

const SwitchSceneIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SwitchSceneIntent';
    },
    async handle(handlerInput) {
        // Get the 'audio' slot value from the request
        const sceneSlotValue = handlerInput.requestEnvelope.request.intent.slots['scene'].value;

        // Your logic using the slot value
        const speakOutput = `You selected scene: ${sceneSlotValue}.`;
        
        // Example HTTP request using axios
        try {
            const response = await axios.post('https://d04f-2603-8000-8f00-4646-3ceb-f808-b7ea-5dab.ngrok-free.app/api/data', {
                message: `${sceneSlotValue}`
                // Include other data you want to send in the request body
            });
            // const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            //     title: 'foo',
            //     body: 'bar',
            //     userId: 1,
            //     // Include other data you want to send in the request body
            // });
            

            // Handle the HTTP response
            console.log(response.data);

        } catch (error) {
            // Handle HTTP request error
            console.error(error);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else can I do for you?')
            .getResponse();
    }
};

const SwitchAudioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SwitchAudioIntent';
    },
    async handle(handlerInput) {
        // Get the 'audio' slot value from the request
        const audioSlotValue = handlerInput.requestEnvelope.request.intent.slots['audio'].value;

        // Your logic using the slot value
        const speakOutput = `You selected audio: ${audioSlotValue}.`;
        
        // Example HTTP request using axios
        try {
            const response = await axios.post('https://d04f-2603-8000-8f00-4646-3ceb-f808-b7ea-5dab.ngrok-free.app/api/data', {
                message: `${audioSlotValue}`
                // Include other data you want to send in the request body
            });
            // const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            //     title: 'foo',
            //     body: 'bar',
            //     userId: 1,
            //     // Include other data you want to send in the request body
            // });

            // Handle the HTTP response
            console.log(response.data);

        } catch (error) {
            // Handle HTTP request error
            console.error(error);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else can I do for you?')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        NextAudioIntentHandler,
        NextSceneIntentHandler,
        SwitchSceneIntentHandler,
        SwitchAudioIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
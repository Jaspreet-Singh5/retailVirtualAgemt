// projects/qutrain/locations/global/agents/982f9a05-81db-423d-8e55-50e2f1b5e5ec
// projects/PROJECT_ID/locations/REGION_ID/agents/AGENT_ID

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = 'qutrain';
const location = 'global';
const agentId = '982f9a05-81db-423d-8e55-50e2f1b5e5ec';
const query = 'Hello';
const languageCode = 'en'

// Imports the Google Cloud Some API library
const {SessionsClient} = require('@google-cloud/dialogflow-cx');
/**
 * Example for regional endpoint:
 *   const location = 'us-central1'
 *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
 */
//  const location = 'us-central1'
//  const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
const client = new SessionsClient();

async function detectIntentText() {
  const sessionId = Math.random().toString(36).substring(7);
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  console.info(sessionPath);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };
  const [response] = await client.detectIntent(request);
  console.log(`User Query: ${query}`);
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      console.log(`Agent Response: ${message.text.text}`);
    }
  }
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
  console.log(
    `Current Page: ${response.queryResult.currentPage.displayName}`
  );
}

detectIntentText();
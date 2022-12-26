import { LabelEditedEvent } from "@octokit/webhooks-types"; // Change this to your webhook type

import { EventBridgeEvent } from "aws-lambda";

export const handler = async (
  event: EventBridgeEvent<"transaction", LabelEditedEvent>
): Promise<void> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  try {
    // Put logic here for your applications
  } catch (e: any) {
    console.error(e);
    throw e;
  }
};

import { ssm } from "./ssm";
import { SecretScanningAlertCreatedEvent } from "@octokit/webhooks-types";

import { EventBridgeEvent } from "aws-lambda";

export const handler = async (
  event: EventBridgeEvent<"transaction", SecretScanningAlertCreatedEvent>
): Promise<void> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  try {
    await ssm();
  } catch (e: any) {
    console.error(e);
    throw e;
  }
};

import * as cdk from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const lambdaFunction = new NodejsFunction(this, "BinSchedulerFunction", {
      entry: path.join(__dirname, "../lambda/bin-scraper-lambda.ts"), // Corrected path
      handler: "handler", // Exported handler function
      runtime: Runtime.NODEJS_18_X,
      environment: {
        DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
        CHANNEL_ID: process.env.CHANNEL_ID || "",
        HOUSE_NUMBER: process.env.HOUSE_NUMBER || "",
        POSTCODE: process.env.POSTCODE || "",
      },
    });

    // Define the schedule (9:50 AM every Sunday)
    const schedule = Schedule.cron({
      minute: "50",
      hour: "9",
      weekDay: "SUN",
    });

    // Create a rule to trigger the Lambda function
    new Rule(this, "BinSchedulerRule", {
      schedule: schedule,
      targets: [new LambdaFunction(lambdaFunction)],
    });
  }
}

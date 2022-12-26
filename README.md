# AWS GitHub Boilerplate

## tl;dr

A boilerplate that contains the foundations for building an application that reacts to webhooks from a [GitHub App](https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps), deployed to [AWS](https://aws.amazon.com/?nc2=h_lg).

## Motivation

There are many different ways to deploy an application to AWS which respond to webhooks from GitHub, this repository is homing one approach that contains the following best practises:

- Using two factor authentication on the incoming webhook (IP and webhook secret validation).
- Uaing a state machine to coordinate the logic of the application.
- Leverages GitHub Apps as the proxy which fires the webhook from GitHub.

## Introduction

Do you want to deploy an application to AWS that responds to a GitHub Webhook? This boilerplate may be useful to you.

## Pre-requisite

This repository does require some knowledge of:

- [GitHub Apps](https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps)
- [AWS](https://aws.amazon.com/?nc2=h_lg)

You do not need to be an expert, but it helps having some foundational knowledge.

The documentation in this repository also assums a techincal audience.

## Getting Started

#### Stage One: Use template.

1. Generate a new repository off this template by clicking the [Use Template](https://github.com/advanced-security/aws-github-boilerplate/generate) option.

#### Stage Two: AWS Role, Enviroment and Secrets Setup

This repository makes use of the in-built OIDC feature within GitHub workflows. Please read the following article on how to get setup. Create a role within AWS IAM and configure the role to use OpenID Connect. More instructions can be found here: [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/enterprise-cloud@latest/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

When you create the role, attach the following policies:

<img width="1342" alt="AWS IAM Role" src="https://user-images.githubusercontent.com/6696451/209571182-8af0a3f5-bf0f-478f-b187-a2dfff0447f8.png">

Once you have created your role, and set up the identity, please:

1. Create a new [GitHub Enviroment](https://docs.github.com/en/enterprise-cloud@latest/actions/deployment/targeting-different-environments/using-environments-for-deployment) called `main`.
1. In the `main` enviroment, create a GitHub secret called `AWS_ACCOUNT_ID`. Put the AWS Account ID here where the role is created.
1. In the `main` enviroment, create a GitHub secret called`AWS_ROLE_NAME`: Put the AWS IAM role name here.

> **Warning**: We recommend you update your AWS IAM Role to filter the subject claim from the `main` environment. See instructions on how to do that [here](https://docs.github.com/en/enterprise-cloud@latest/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#filtering-for-a-specific-environment). This adds another layer of protection.

#### Stage Three: Create a GitHub App

Create a GitHub App, [using these instructions](https://docs.github.com/en/enterprise-cloud@latest/developers/apps/building-github-apps/creating-a-github-app).

> **Warning**: You are welcome to put dummy values in the input fields for the new app, as we don't know the right values yet. The only value you need to put a valud value in is: `Webhook Secret`, please put the a seret in here, that you will

#### Stage Four: Update AWS Systems Manager (Parameter Store)

Create the following parameters in AWS Systems Manager.

1. `/github-boilerplate/APP_CLIENT_ID`: The GitHub App Client ID.
2. `/github-boilerplate/APP_CLIENT_SECRET`: The GitHub App Client Secret.
3. `/github-boilerplate/APP_ID`: The GitHub App ID.
4. `/github-boilerplate/APP_INSTALLATION_ID`: The GitHub App Installation ID.
5. `/github-boilerplate/APP_PRIVATE_KEY`: The GitHub App Private Key.
6. `/github-boilerplate/GITHUB_WEBHOOKS_SECRET`: The secret you assigned to the webhook.

#### Stage Five: Run the Deploy

You can run the workflow manually using the [workflow_dispatch](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) event.

#### Stage Six: Test the Deploy

Once the deploy has been kicked off, it's worth checking the github workflow output and also the cloud formation output. Check logs for any errors and correct as needed.

> **Warning** There are likely edge cases that have not been taken into consideration. As you find errors, please open issues on this repository and we will update the `README`.

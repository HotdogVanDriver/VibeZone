# Discord Power Table

This project contains a Node.js script that calculates the expected power requirements for different ranks in the "Whiteout Survival" game and sends a formatted message with the results to a specified Discord channel via a webhook.

## Overview

The script uses a predefined formula to calculate the power requirements for the ranks R1 through R4. The power requirements increase daily by a certain percentage which is different for each rank. The script then formats the results in a message and sends it to a Discord channel using a webhook.

## Setup

To use this script, you will need to set the `WEBHOOK_URL` environment variable to the URL of your Discord webhook. This can be done in your Vercel project settings.

The script is intended to be run on a schedule using GitHub Actions. The included `.github/workflows/daily-rebuild.yml` file is set up to trigger the script once per day.

## Deployment

This project is deployed on Vercel. Each time the script runs, it calculates the power requirements based on the current date and the date when the power requirements started increasing (June 8, 2023). 

## Usage

The script is automatically run once per day via GitHub Actions. It sends a message to the specified Discord channel with the updated power requirements for each rank.

Please note that the calculations are based on a fixed formula and a fixed start date. If the game's power increase mechanics change or the start date is adjusted, the script will need to be updated accordingly.

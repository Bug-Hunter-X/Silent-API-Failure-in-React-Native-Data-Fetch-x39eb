# Silent API Failure in React Native Data Fetch

This repository demonstrates a common but subtle bug in React Native applications that fetch data from APIs. The component fetches data, handles loading and error states gracefully, but silently fails if the API returns a non-JSON response or a response with an unexpected structure.

## Bug Description

The `MyComponent` fetches data and displays it.  It handles loading and explicit errors. However, if the API returns a non-JSON response (e.g., a 500 error with HTML), `response.json()` will throw an error, but the error handling might not catch all scenarios (especially network errors).

## Solution

The solution improves error handling by explicitly checking the response type before parsing it as JSON and provides better feedback to the user.
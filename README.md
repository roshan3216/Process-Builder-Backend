# Process-Builder-Backend

## Description

This app uses Gemini API for generating the steps involved in a process automatically or manually.

## Getting Started

```
$ npm install
```

• Generate an Gemini API key from Google AI Studio
• Create a mongo db connection string

Add the above two in an environment variable with the names specified in .env.example

Start the app 
```
npm start
```

#### Cosideration 

I have used mongodb atlas as the database storage for storing the processes generated instead of MySQL as the input could be auto generated or manual.
Mongodb provides us with the functionality of having a flexible schema to store our documents.
Based on the inputs one would be having to store different formdata based on process generation mode (either auto or manual).
It would be easier to manage as the processes keep on growing.

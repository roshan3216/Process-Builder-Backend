import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const geminiAPI = async (userInput) => {
    try {
        
        const model = genAI.getGenerativeModel({model: 'gemini-pro'});

        const prompt = `
        Valid fields are steps and details.
        Text : I need to assign tasks to the team members for a project.
        Output: [
            {
                "step": 1,
                "details": "Define project goals and tasks."
            },
            {
                "step": 2,
                "details": "Identify team members and their skills."
            },
            {
                "step": 3,
                "details": "Assign tasks based on team members' skills and project requirements."
            },
            {
                "step": 4,
                "details": "Set deadlines for task completion."
            },
            {
                "step": 5,
                "details": "Communicate task assignments to team members."
            },
            {
                "step": 6,
                "details": "Monitor progress and provide support as needed."
            }
        ]

        Text : ${userInput}.
        Output: 
        
        `;
    
        const result = await model.generateContent(prompt);
        const response = result.response;
        
        const text = response.text();
        console.log(text,'[text]-[geminiAPI]');

        const filteredString = text.replace('/\s+g', '');
        console.log(filteredString,'[filteredStirng]');
        const json = JSON.parse(filteredString);
        console.log(json, '[json]');
        return [json, null];
    } catch (err) {
        console.error(err,'[error in getting gemini api response]');

        // throw new Error('Error in gemini API');
        return [null, err];
    }
}


const recursiveCall = async(prompt) =>{
    const resp = await geminiAPI (prompt);
    if(!resp[0] || !resp[0].length){
        return recursiveCall(prompt);
    }

    return resp;
}

export default recursiveCall;
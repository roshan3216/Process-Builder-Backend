import { Process } from "../db/model.js"
import geminiAPI from "./googleai.js";

const compare = (a,b) =>{
    const aDate = new Date(a.updatedAt);
    const bDate = new Date(b.updatedAt);
    console.log("aDate = ", aDate, ", bDate = ",bDate );
    if(aDate > bDate){
        return -1;
    }else if (aDate < bDate){
        return 1;
    }
    return 0;
}



export const getProcess = async (req,res) =>{
    try {
        const resp = await Process.find();
        resp.sort(compare);

        console.log(JSON.stringify(resp, null, 2),'[resp]-[getProcess]');
        return res.status(200).json(resp);
    } catch (err) {
        console.error(err,'[error in getting all processes]');
        return res.status(500).json('Internal Server Error');
    }
}

export const automatedProcess = async ( req , res ) =>{
    try {
        const body = req.body;
        console.log(body,'[body]-[automatedProcess]');

        if(!body || !body.prompt){
            return res.status(400).json('Please fill the form');
        }

        const aiResponse = await geminiAPI(body.prompt);
        console.log(aiResponse,'[aiResponse]-[automatedProccess]');
        
        return res.status(200).json(aiResponse);
        
    } catch (err) {
        console.error(err, '[error in automatedProcess controller]');
        return res.status(500).json('Internal Server Error');
    }

}

export const submitProcess = async ( req, res ) =>{
    try {
        const body = req.body;
        console.log(body,'[body]-[submitProcess]');

        const formData = body.formData;
        const mode = body.mode;
        const prompt = body.prompt;

        if(!body || !formData || !mode || !prompt){
            return res.status(400).json('Please fill the form correctly');
        }
        
        const process = new Process({
            formData: formData,
            prompt: prompt,
            generatedBy: mode,
        });

        console.log(process,'[process]-[submitProcess]');

        const response = await process.save();
        console.log(response,'[response]-[submitProcess]');
    
        return res.status(200).json({status: "OK", message: "Success"});
    } catch (err) {
        console.error(err,'[error in submitting process]');

        return res.status(500).json('Internal Server Error');
    }
}
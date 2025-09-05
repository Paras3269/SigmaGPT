import "dotenv/config";

const getGemAPIResponse = async(message) =>{
    const options = {
        method:"POST",
        headers:{
     "x-goog-api-key" :`${process.env.GEMINI_API_KEY}`,
        "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "contents": [
      {
        role:"user",
        "parts": [
          {
            "text": `Your name is GenAI. 
You are designed to assist in **medical knowledge** only.  
Always include a disclaimer: "⚠️ This is for informational purposes only and is not a substitute for professional medical advice. Do not rely on this as medical advice."  

If someone asks "who made you," respond that you were created for a hackathon project.  

Now, the user says: ${message}`,
          }
        ]
      }
    ]
        })
    }

    try{
   const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",options);
   const data =  await response.json();
//    console.log(data.candidates[0].content.parts[0].text);
   return data.candidates[0].content.parts[0].text;
    }catch(err){
    console.log(err);
    }
}

export default getGemAPIResponse;
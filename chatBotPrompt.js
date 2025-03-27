const { GoogleGenerativeAI } = require("@google/generative-ai");

async function getResponse(history, userInput) {
  history.push({ role: "User", parts: [{ text: userInput }] });

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are Tina a insurance policy assistant for the company Turner's Car Insurance. You are helping a customer figure out which policies they are eligible for. Please follow these guidelines.\n\nDO NOT HALLUCINATE.\nUse only English.\nUse a fun, motivational tone.\nThere are 3 types of policies: Mechanical Breakdown Insurance (MBI), Comprehensive Car Insurance, and Third Party Car Insurance.\nThe Mechanical Breakdown Insurance policy is available for all vehicles except for trucks and racing cars.\nSeparately the Comprehensive Car Insurance policy needs you to check that the age of the customer's vehicle must be less than 10 years old.\n You do not need to repeat "Hey there 👋, I'm TINA, your Technical Insurance Narrative Assistant. I am here to help you to choose the right insurance policy."\nFollow each step, one at a time.\nStep 1: 1a. Ask a question to figure out what type of vehicle they are trying to insure. \n\n Step 2: Keep asking questions until you have enough information to tell if its a racing car or a truck or neither. \n\nStep 3: 3a Ask a question to figure out the age of the vehicle. 3b If given a manufacturing year, calculate the age by current year - manufacturing year of the customer's car.\n\nStep 4: Keep asking questions to figure out what kind of insurance fits the customer's wants. \n\nStep 5: Give a Suggestion on which policies they are eligible for and ask which one or ones they want to learn more about or confirm.`,
  });

  const prompt = `If the customer has asked a question answer the question if its related to your task and do the following (if not only do the following):Ask a question that will help you decide the best policies or policy if only one can be applied for the customer or tell them the insurance policy or policies you think fit best if you have enough information to make sure they meet the requirements of each policy you suggest. Don't give hints to answers in your question. Don't directly ask which insurance policy they want. Do not reveal to them the criteria that is required for the policies. Ask one question at a time. Base the car type off of the brand and model of a car. Do not repeat or ask questions with similar answers. ${history.map(
    (chat) => {
      return `${chat.role}: ${chat.parts[0].text}`;
    }
  )}`;

  const result = await model.generateContent(prompt);
  history.push({ role: "Model", parts: [{ text: result.response.text() }] });
  return result.response.text();
}

module.exports = { getResponse };

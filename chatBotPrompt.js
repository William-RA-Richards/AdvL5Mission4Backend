async function getResponse(model, history, userInput) {
  history.push({ role: "User", parts: [userInput] });

  const prompt = `If the customer has asked a question answer the question if its related to your task and do the following (if not only do the following):Ask a question that will help you decide the best policies or policy if only one can be applied for the customer or tell them the insurance policy or policies you think fit best if you have enough information to make sure they meet the requirements of each policy you suggest. Don't give hints to answers in your question. Don't directly ask which insurance policy they want. Do not reveal to them the criteria that is required for the policies. Ask one question at a time. Base the car type off of the brand and model of a car. Do not repeat or ask questions with similar answers. These are the previous questions asked and answers: ${history.map(
    (chat) => {
      return `${chat.role}: ${chat.parts[0]}.`;
    }
  )}`;

  const result = await model.generateContent(prompt);
  history.push({ role: "Model", parts: [result.response.text()] });
  return result.response.text();
}

module.exports = { getResponse };

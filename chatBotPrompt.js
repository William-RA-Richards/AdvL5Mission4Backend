async function getResponse(model, history, userInput) {
  history.push({ role: "User", parts: [userInput] });

  const prompt = `Ask a question that will help you decide the best policy for the customer or tell them the insurance policy you think fits best if you have enough information. Don't give hints to answers in your question. Don't directly ask which insurance policy they want. Do not tell them the criteria that is required for the policies. Ask one question at a time. Base the car type off of the brand and model of a car. These are the previous questions asked and answers: ${history.map(
    (chat) => {
      return `${chat.role}: ${chat.parts[0]}.`;
    }
  )}`;

  const result = await model.generateContent(prompt);
  history.push({ role: "Model", parts: [result.response.text()] });
  return result.response.text();
}

module.exports = { getResponse };

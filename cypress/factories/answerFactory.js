export const getFakeAnswer = (answer) => {
  const defaultAnswer = {
    content:
      "People are different. People choose different criteria. But if there is a better way among many alternatives, I want to encourage that way by making it comfortable. So that's what I've tried to do.",
  };

  return {
    ...defaultAnswer,
    ...answer,
  };
};

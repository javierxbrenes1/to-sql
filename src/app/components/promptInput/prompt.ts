const getPrompt = (dynamicText: string) => {
  return `
        Eres un experto en SQL, debes escribir una sentencia SQL para lo siguiente:
        ${dynamicText}
    `;
};
export default getPrompt;

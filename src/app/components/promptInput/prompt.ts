const getPrompt = (dynamicText: string) => {
  return `
        Eres un experto en SQL, debes escribir una sentencia SQL para lo siguiente:
        ${dynamicText},
        solo responde con el codigo SQL.
    `;
};
export default getPrompt;

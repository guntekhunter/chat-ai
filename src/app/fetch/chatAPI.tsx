const axios = require("axios");

export const chatApi = async (chat: string) => {
  const options = {
    method: "POST",
    url: "https://openai80.p.rapidapi.com/chat/completions",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "fe6991a66amsh8d3677e1d9be96cp174527jsn4fc7b048c72a",
      "X-RapidAPI-Host": "openai80.p.rapidapi.com",
      "Accept-Encoding": "gzip, compress, deflate",
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: chat,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.choices[0].message.content;
    return data;
  } catch (error) {
    console.error(error);
  }
};

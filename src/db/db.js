
const query = async (text, params) => {
  console.log("FAKE DB QUERY:", text);

  return {
    rows: [
      { id: 1, name: "Danila" },
      { id: 2, name: "Test User" }
    ]
  };
};

module.exports = { query };
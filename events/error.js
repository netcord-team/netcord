module.exports = {
  name: "error",
  once: false,
  run: (client, error) => {
      console.error(`Error: ${error}`);
      console.log('Cannot fire ready, an error occurred.');
  }
  
}
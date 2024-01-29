function index(request, response) {
  response.send("Usernames");
}

module.exports = {
  index: index,
};

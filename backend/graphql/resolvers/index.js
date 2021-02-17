// Once all the resolvers are setup, require them here

module.exports = {
    Query: {
        helloWorld() {
            return "Hello World";
        }
    }
};
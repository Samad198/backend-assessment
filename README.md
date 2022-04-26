# backend-assessment

# Initialize the project
- run ``npm install`` in the root directory to build node modules
- create a mongodb database that can be connected to with the connection string in src/configs/mongoose
- create a file in the root directory called ``.env`` and add the following variables which are used to connect to your mongodb database
  - DB_USER
  - DB_PASS
  - DB_DATABASE
- For example:
  - DB_USER=me
  - DB_PASS=password
  - DB_DATABASE=Cluster0

# Run the project

- To run the script that parses the input csv found in the src folder, run ``npm run parsecsv`` in the root directory. To change the csv input, edit the contents of input.csv
- To run tests found in src/tests/unit, run ``npm run test`` in the root directory
- To run the express server, run ``npm run start``

Once the express server is running you should get the output ``Running on port 3000`` on the console and should be able to access the routes ``http://localhost:3000/`` in your browser. Try the following for different results after running the parsecsv script:

- ``http://localhost:3000/products``
- ``http://localhost:3000/products?colour=C1&size=S4``

# Tasks completed
- created a script that imports product details from a csv file and outputs a summary of completed actions to the console
- stored product data in a mongo database and modelled data using mongoose
- created tests for the service using jest
- successfully mocked mongo model functionality in tests
- created an API to return a list of products with filter options for Colour and Size using express

# Further improvements
- I hard coded quite a few strings in tests and errors which would be better off in variables for better reusability and easier changes
- Write more cases that should pass. Only used the one example that was given in the requirements
- could use transactions to make sure all the data is stored or database is reverted
- could use different method for checking a product exists in the database without having to get all products
- need to add tests for api
- need to write tests for and handle what happens if the database connection fails


# Problems faced
- lack of mongo knowledge on best way to create and close connections
- being able to test functionality without hitting the database for unit tests


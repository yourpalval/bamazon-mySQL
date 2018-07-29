var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err; 
    console.log("Item Id   Product Name   Department Name  Price  Quantity");
    for (let i = 0; i < results.length; i++) {
      console.log("--------------------------------------------------");
      console.log(
        results[i].item_id +
          "  " +
          results[i].product_name +
          "  " +
          results[i].department_name +
          "   " +
          results[i].price +
          "   " +
          results[i].stock_quantity
      );
      console.log("--------------------------------------------------");
    }
  });
}

function selectProduct() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What is the ID number of the product you want to buy?"
        },
        {
          name: "ID",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }
      });
  });
}

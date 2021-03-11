require("dotenv").config();

const print_my_arguments = (msg) => {
  // var args = arguments;
  if (process.env.LOGGING_LEVEL > 1) {
    console.log(msg);
    // console.log(args);
    // for(let i=0; i<args.length; i++){
    //     console.log(args[i]);
    // }
  }
};

module.exports = print_my_arguments;

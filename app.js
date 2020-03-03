const readline = require("readline");
const request = require("request-promise");
const fs = require("fs");

const sendRequesToServer = async (weight) => {
  const options = {
    method: "POST",
    url: `http://amitai-net.co.il/weight_dose2.asp`,
    headers: {
      "cache-control": "no-cache",
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'en,he;q=0.9',
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
        'weight': weight,
        'age': ''
    }
  };

  try {
    const res = request(options);
    return res;
  } catch (error) {
    return error;
  }
};

const createFolder = () => {
  const dir = "./docs";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("docs folder created");
  }
};


const init = async () =>{
  createFolder();
  console.log("\n=========================\n");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("insert weight \n", async function(code) {
    const arr = code.split(",");
    for(weight of arr){
        let res = await sendRequesToServer(weight);
        res = res.replace("n11/css/style.css", "../style.css");
        fs.writeFileSync(`./docs/${weight}.html`, res);
    }
    rl.close();
  });
  
  rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
  });
}
init();

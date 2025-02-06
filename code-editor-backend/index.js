const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to execute code
app.post("/run", async (req, res) => {
  const { language, code } = req.body;

  // Map the language to the appropriate file
  const filename = {
    python: "script.py",
    java: "Main.java",
    cpp: "main.cpp",
  }[language];

  if (!filename) return res.json({ error: "Unsupported language" });

  try {
    // Write the code to a file
    fs.writeFileSync(filename, code);

    const dockerCommand = {
      python: `docker run --rm -v ${__dirname}:/app -w /app code-runner python3 script.py`,
      java: `docker run --rm -v ${__dirname}:/app -w /app code-runner bash -c "javac Main.java && java Main"`,
      cpp: `docker run --rm -v ${__dirname}:/app -w /app code-runner bash -c "g++ -o main main.cpp && ./main"`,
    }[language];

    // Execute the Docker command
    exec(dockerCommand, (error, stdout, stderr) => {
      // Cleanup the file after running the code
      fs.unlinkSync(filename);

      if (error || stderr) {
        return res.json({ output: stderr || error.message });
      }
      res.json({ output: stdout });
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to write or execute the code: " + err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

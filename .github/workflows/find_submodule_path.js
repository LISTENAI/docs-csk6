const { execSync } = require("child_process");

const gitRepo = process.argv[2];
const moduleName = process.argv[3];

// submodule foreach
const submodule = execSync(
  `git submodule foreach 'echo "name=$name,path=$sm_path"'`,
  {
    cwd: gitRepo,
  }
).toString("utf-8");

const result = submodule
  .split("\n")
  .filter((_, i) => i % 2 != 0)
  .map((line) => {
    // match name and path
    return Object.assign(
      ...line.split(",").map((item) => {
        const [key, value] = item.split("=");
        // assign
        return { [key]: value };
      })
    );
  })
  .find((item) => item.name == moduleName);

console.log(result.path);

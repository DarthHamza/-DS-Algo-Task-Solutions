const prompt = require("prompt-sync")({ sigint: true });

class TreeNode {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  addChild = (node) => {
    if (this.children.length < 2) {
      this.children.push(node);
      console.log(`${node.name} child of ${this.name}`);
    } else console.log("Child is an orphan.");
  };

  getChildWithName = (name) => {
    for (let child of this.children) {
      if (child.name === name) {
        return child;
      }
    }
    return null;
  };

  traverse = () => {
    let nodes = [this];
    while (nodes.length > 0) {
      let current = nodes.pop();
      console.log(current.name);
      nodes = [...nodes, ...current.children];
    }
  };
}

const root = new TreeNode("Family");
let fullName = prompt("Enter name of child (type 'done' if you're finished): ");

while (fullName !== "done") {
  let current = root;

  let names = fullName.split(" ").reverse();
  let firstName = names.pop();
  let lastName = names.shift();

  if (lastName === current.name) {
    if (names) {
      for (let name of names) {
        let child = current.getChildWithName(name);
        if (child) {
          current = child;
        } else {
          let newNode = new TreeNode(name);
          current.addChild(newNode);
          current = newNode;
        }
      }
    }
    let newNode = new TreeNode(firstName);
    current.addChild(newNode);
  }

  console.log("--------------------------------------------------");
  fullName = prompt("Enter name of child (type 'done' if you're finished): ");
}

root.traverse();

const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
const componentPath = path.join(__dirname, 'src/');
const renderer = new ReactDocGenMarkdownRenderer({
  componentsBasePath: __dirname
});

//output path
const readmeFile = path.join(__dirname, 'README.md');

//empty file
fs.writeFileSync(readmeFile, '');


//loop through all files in path
fs.readdirSync(componentPath).forEach(file => {
  //only do jsx files
  if(file.indexOf('.jsx') === -1) return;
  console.log("file", file);
  const content = fs.readFileSync(path.join(componentPath, file));
  //read each file
  const doc = reactDocgen.parse(content);

  //append the results to the file
  fs.appendFileSync(readmeFile, renderer.render(
  /* The path to the component, used for linking to the file. */
  `${componentPath}${file}`,
  /* The actual react-docgen AST */
  doc,
  /* Array of component ASTs that this component composes*/
  []))
});
function correspondingNode(tree1, tree2, node1) {
    // dom
const path = []
let currNode = node1

while(currNode !== tree1){
    const parent = currNode.parentNode
    const currIndex = Array.from(parent.children).indexOf(currNode)
    path.push(currIndex)
    currNode = parent
}
return path.reduceRight((foundNode,childIndex)=>{
    return foundNode.children[childIndex];
},tree2)
}




const dom1 = document.createElement("div");
dom1.innerHTML = `
<main>
<h1>Heading</h1>
<div>
<h2>test1</h2>
<p>test2 <em>emphasis</em></p>
</div>
</main>
`;

const dom2 = document.createElement("div");
dpm2.innerHTML = `
<article>
<h1>Heading</h1>
<div>
<h2>test1</h2>
<p>test2 <em>emphasis</em></p>
</div>
</article>
`;

correspondingNode(dom1,dom2,dom1.querySelector('h1'));

figma.showUI(__html__, { width: 320, height: 380 });

figma.on("selectionchange", () => {
  updateSelection();
});

function updateSelection() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({
      type: "selection-update",
      selection: [],
      hasSelection: false
    });
    return;
  }
  
  const selectionData = selection.map(node => ({
    id: node.id,
    name: node.name,
    type: node.type
  }));
  
  figma.ui.postMessage({
    type: "selection-update",
    selection: selectionData,
    hasSelection: true
  });
}

figma.ui.onmessage = msg => {
  if (msg.type === "copy-to-clipboard") {
    figma.notify("Node ID copied to clipboard!");
  }
  
  if (msg.type === "copy-all-to-clipboard") {
    figma.notify("All node IDs copied to clipboard!");
  }
  
  if (msg.type === "init-ui") {
    updateSelection();
  }
};
function multipleSeperator() {
  const list = "apples,banana;cheeries;cheeries";
  const fruits = list.split(",");
  console.log("fruites:", fruits);

  const multiSep = list.split(/[,;]/);
  console.log("multiSep", multiSep);
}
multipleSeperator();

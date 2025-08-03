function markdownToHTML(text) {
  return text
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
    .replace(/\*(.*)\*/gim, "<i>$1</i>")
    .replace(/`(.*?)`/gim, "<code>$1</code>")
    .replace(/\n$/gim, "<br />");
}

function highlightSyntax(code) {
  return code
    .replace(/(\/\/.*)/g, `<span class="comment">$1</span>`)
    .replace(/("(.*?)"|'(.*?)')/g, `<span class="string">$1</span>`)
    .replace(
      /\b(const|let|var|function|if|else|return|for|while|try|catch|throw|new|await|async)\b/g,
      `<span class="keyword">$1</span>`
    )
    .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, `<span class="literal">$1</span>`);
}

function runCode(editor, output) {
  const code = editor.innerText;
  output.innerHTML = "";

  try {
    const result = eval(code);
    if (result !== undefined) {
      logOutput(result, output);
    }
  } catch (err) {
    logOutput(err.message, output, true);
  }
}

function logOutput(msg, output, isError = false) {
  const div = document.createElement("div");
  div.innerText = typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg;
  div.style.color = isError ? "red" : "lightgreen";
  output.appendChild(div);
}


function updateLineNumbers(editor) {
  const content = editor.textContent.replace(/\u200B/g, "");
  const logicalLines = content.split(/\n|\r|\r\n/).length;

  let lineCount = logicalLines;

  if (logicalLines === 1) {
    const range = document.createRange();
    range.selectNodeContents(editor);
    const rects = range.getClientRects();
    const visualLines = rects.length || 1;
    lineCount = visualLines;
  }

  lineNumbers.innerHTML = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join(
    ""
  );
}

function toggleRunButton(editor) {
  const content = editor.textContent.replace(/\u200B/g, "").trim();
  const isEmpty = content === "";
  runBtn.disabled = isEmpty;
  runBtn.title = isEmpty ? "Editor is empty" : "";
}

function highlightCurrentLine() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(editor);
  preCaretRange.setEnd(range.endContainer, range.endOffset);

  const lineIndex = preCaretRange.toString().split(/\n/).length - 1;

  lineNumbers.querySelectorAll("span").forEach((span, idx) => {
    span.classList.toggle("active-line", idx === lineIndex);
  });
}

export default {
  markdownToHTML,
  highlightSyntax,
  runCode,
  logOutput,
  updateLineNumbers,
  toggleRunButton,
  highlightCurrentLine,
};

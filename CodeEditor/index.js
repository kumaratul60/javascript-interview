document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("code-text");
  const output = document.getElementById("output");
  const lineNumbers = document.getElementById("line-numbers");
  const themeToggle = document.getElementById("theme-toggle");
  const runBtn = document.getElementById("run-btn");

  let runTriggeredBy = null;

  editor.focus();
  updateLineNumbers();
  toggleRunButton();
  // updateHighlightedSyntax();

  // Observe editor changes for enabling/disabling run
  const observer = new MutationObserver(() => {
    toggleRunButton();
    updateLineNumbers();
  });
  observer.observe(editor, { childList: true, subtree: true, characterData: true });

  // Scroll sync
  editor.addEventListener("scroll", () => {
    lineNumbers.scrollTop = editor.scrollTop;
  });

  editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      runTriggeredBy = "keyboard";
      runCode();
    }
    requestAnimationFrame(() => {
      updateLineNumbers();
      toggleRunButton();
      //  updateHighlightedSyntax();
    });
  });

  editor.addEventListener("input", () => {
    requestAnimationFrame(() => {
      updateLineNumbers();
      toggleRunButton();
      //  updateHighlightedSyntax();
    });
  });

  editor.addEventListener("click", highlightCurrentLine);
  //   editor.addEventListener("keyup", highlightCurrentLine);

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
  });

  runBtn.addEventListener("click", () => {
    runTriggeredBy = "button";
    runCode();
  });

  function runCode() {
    const code = editor.innerText;
    output.innerHTML = "";
    const source = runTriggeredBy || "unknown";

    try {
      const result = eval(code);
      if (result !== undefined) {
        logOutput(result);
      }
    } catch (err) {
      logOutput(err.message, true);
    }

    runTriggeredBy = null;
  }

  function logOutput(msg, isError = false) {
    const div = document.createElement("div");
    div.innerText = typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg;
    div.style.color = isError ? "red" : "lightgreen";
    output.appendChild(div);
  }

  function updateLineNumbers() {
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

    lineNumbers.innerHTML = Array.from(
      { length: lineCount },
      (_, i) => `<span>${i + 1}</span>`
    ).join("");
  }

  function toggleRunButton() {
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

  //   function updateHighlightedSyntax() {
  //     const code = editor.innerText;
  //     const escaped = code
  //       .replace(/&/g, "&amp;")
  //       .replace(/</g, "&lt;")
  //       .replace(/>/g, "&gt;");
  //     highlightedCode.innerHTML = highlightSyntax(escaped);
  //   }

  const originalLog = console.log;
  console.log = (...args) => {
    args.forEach((arg) => logOutput(arg));
    originalLog.apply(console, args);
  };
});

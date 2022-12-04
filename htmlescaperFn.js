function escHTML(text) {
    var repl = {
        "<": "&lt;", ">": "&gt;", "&": "&amp;", """: " & quot; "};                      
    return text.replace(/[<>&"]/g, function (character) {
            return repl[character];
        });
    }
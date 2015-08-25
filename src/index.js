
var path = require('path')
var st   = require('stack-trace');

var root = exports.root = __dirname;

// Returns true if p is a file / folder inside
// of base.
var containsPath = exports.containsPath = function(base, p) {
  base = path.resolve(base);
  p    = path.resolve(p);

  if(base === p) {
    // base and p point to the same thing
    return true;
  } else {
    // base contains p
    return p.indexOf(base + '/') === 0
  }
}



// Returns the path to the file that is
// using the ppaths library.
var calledFrom = exports.calledFrom = function() {
  stack = st.get();
  for(var i = 0; i < stack.length; ++i) {
    var s = stack[i];
    var n = s.getFileName();

    if(!containsPath(root, n)) {
      // FIXME: This might not always be accurate.
      if(n === "repl" && s.isToplevel()) {
        return process.cwd();
      } else {
        return n;
      }
    }

  }
}

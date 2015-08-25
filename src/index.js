
var path       = require('path');
var fs         = require('fs');
var existsSync = fs.existsSync;

var st     = require('stack-trace');


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

    if(!containsPath(__dirname, n)) {
      // FIXME: This might not always be accurate.
      if(n === "repl" && s.isToplevel()) {
        return process.cwd();
      } else {
        return n;
      }
    }

  }
}




var __roots = exports.__roots = {}


// Finds the package root for the caller
var getPackageRoot = exports.getPackageRoot = function() {
  return __getPackageRoot(calledFrom())
}

// Searches the cache to see if it knows the package root
// that dir belongs to.  If it's not in the cache, then it
// invokes __findPackageRoot to discover dir's package root.
var __getPackageRoot = exports.__getPackageRoot = function(dir) {
  return __roots[dir] || (__roots[dir] = __findPackageRoot(dir));
}

// Searches the filesystem to discover the package root for dir.
function __findPackageRoot(dir) {
  var p = path.join(dir, "__plocal");

  if(existsSync(p)) {
    return dir;
  } else {
    var nextDir = path.dirname(dir);

    if(nextDir === dir) {
      throw new Error("Marker not found");
    }

    return __getPackageRoot(nextDir);
  }
}



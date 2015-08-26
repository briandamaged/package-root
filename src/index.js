
var path       = require('path');
var fs         = require('fs');
var existsSync = fs.existsSync;

var _  = require('lodash');
var st = require('stack-trace');

var marker = "__package_root";
var marker_missing_msg = "Unable to find package root. (Could not locate " + marker + " marker)";


// This function serves as a package-relative
// 'require' statement.
module.exports = exports = function(path) {
  return require(exports.join(path));
}


// Constructs paths that are relative to the package root.
exports.join = function() {
  var args = _.flatten([getPackageRoot(), arguments]);
  return path.join.apply(null, args);
}



// Returns true if p is a file / folder inside of base.
//
// TODO: Move this into a separate library.
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




// Returns the path to the file that is using
// the package-root library.  (Why is this useful?
// It gives us a starting point when we begin
// searching for the __package_root file)
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



// Cache enables faster lookup of package roots.
var __roots = exports.__roots = {}


// Finds the package root for the caller
var getPackageRoot = exports.getPackageRoot = function() {
  var firstDir = path.dirname(calledFrom());
  return __getPackageRoot(firstDir)
}

// Searches the cache to see if it knows the package root
// that dir belongs to.  If it's not in the cache, then it
// invokes __findPackageRoot to discover dir's package root.
var __getPackageRoot = exports.__getPackageRoot = function(dir) {
  return __roots[dir] || (__roots[dir] = __findPackageRoot(dir));
}

// Searches the filesystem to discover the package root for dir.
function __findPackageRoot(dir) {
  var p = path.join(dir, marker);

  if(existsSync(p)) {
    return dir;
  } else {
    var nextDir = path.dirname(dir);

    if(nextDir === dir) {
      throw new Error(marker_missing_msg);
    }

    return __getPackageRoot(nextDir);
  }
}



# package-root #

Is your application or package suffering from relative-path Hell?  Do your ```require``` statements look like the following?

```javascript
var config           = require("../../../config"           );
var middleware       = require("../../../lib/middleware"   );
var users_controller = require("../../../controllers/users");
```

Don't worry -- ```package-root``` is here to help!  With ```package-root```, you can generate package-relative paths with ease!

```javascript
var pr = require('package-root');

var config           = require(pr("config")            );
var middleware       = require(pr("lib/middleware")    );
var users_controller = require(pr("controllers/users") );
```

There -- I bet you feel better already!


## Installation ##

```shell
npm install package-root
```


## Usage ##

### Setup ###

```package-root``` discovers your package's root by searching for a file named ```__package_root```.  For example, let's imagine that our application / package is structured as follows:

```
.
├── package.json
└── src
    ├── config.json
    ├── controllers
    │   ├── index.js
    │   └── users.js
    └── mw
        ├── auth.js
        └── index.js
```

Since the package's code lives in the ```src/``` folder, we'll want to place the ```___package_root``` file there.  Afterwards, the filesystem will look like this:

```
.
├── package.json
└── src
    ├── config.json
    ├── controllers
    │   ├── index.js
    │   └── users.js
    ├── mw
    │   ├── auth.js
    │   └── index.js
    └── __package_root
```

### Generating Paths ###

Now that you've planted the ```__package_root``` file in the appropriate location, you can generate package-relative paths as follows:

```javascript
var pr = require('package-root');

// Creates a path relative to the src/ folder
var config_path = pr("config");
var config      = require(config_path);
```

Of course, we didn't really need to create the ```config_path``` temporary variable.  We could have just done this:

```javascript
var pr     = require('package-root');

var config = require(pr("config"));
```

Pretty simple, huh?


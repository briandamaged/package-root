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

var config           = pr("config");
var middleware       = pr("lib/middleware");
var users_controller = pr("controllers/users");
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

### Package-relative require statements ###

Now that you've planted the ```__package_root``` file in the appropriate location, you can perform package-relative ```require```s as follows:

```javascript
var pr = require('package-root');

// Path is relative to src/
var config = pr("config");
```

### Package-relative path joins ###

Of course, maybe you just want to obtain the path to some file in your package.  You can achieve this by using the ```join``` function:

```javascript
var pr = require('package-root');

// Generate the path to the package's config.json file
var config_path = pr.join("config.json");
```

Just like ```path.join```, ```package-root```'s ```join``` function can accept a variable number of arguments:

```javascript
var users_controller_path = pr.join("controllers", "users.js");
```

Pretty simple, huh?
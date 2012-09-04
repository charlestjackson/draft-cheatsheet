# Meteor

Meteor is an ultra-simple environment for building modern web
applications.

With Meteor you write apps:

* in pure Javascript
* that send data over the wire, rather than HTML
* using your choice of popular open-source libraries

Documentation is available at http://docs.meteor.com/

## Quick Start

Install Meteor:

    curl https://install.meteor.com | /bin/sh

Create a project:

    meteor create try-meteor

Run it:

    cd try-meteor
    meteor

Deploy it to the world, for free:

    meteor deploy try-meteor.meteor.com

## Slow Start (for developers)

If you want to run on the bleeding edge, or help develop Meteor, you
can run Meteor directly from a git checkout.

    git clone git://github.com/meteor/meteor.git
    cd meteor

If you're the sort of person who likes to build everything from scratch,
you can build all the Meteor dependencies (node.js, npm, mongodb, etc)
with the provided script. If you do not run this script, Meteor will
automatically download pre-compiled binaries when you first run it.

    # OPTIONAL
    ./admin/generate-dev-bundle.sh

Now you can run meteor directly from the checkout (if you did not
build the dependency bundle above, this will take a few moments to
download a pre-build version).

    ./meteor --help

Or install to ```/usr/local``` like the normal install process. This
will cause ```meteor``` to be in your ```PATH```.

    ./install.sh
    meteor --help
    
After installing, you can read the docs locally. The ```/docs``` directory is a meteor application, so simply change into the ```/docs``` directory and launch the app:
	
	cd docs/
	meteor

You'll then be able to read the docs locally in your browser at ```http://localhost:3000/```

## Developer Resources

Get in touch! We'd love to hear what you think. You can get involved
in several ways:

* Announcement list: sign up at http://www.meteor.com/
* IRC: ```#meteor``` on ```irc.freenode.net```
* Ask a question: http://stackoverflow.com/questions/tagged/meteor
* Email us: ```contact@meteor.com```
* How to contribute to Meteor: https://github.com/meteor/meteor/wiki
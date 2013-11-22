JSZLib
======

JSZlib is a Javascript implementation of zlib, for modern web browsers.  It uses
typed arrays instead of binary strings for storing data.  Simplistic testing suggests
that this can give about a 2-fold speedup, and also means that JSZlib is a good
match for tools which use ArrayBuffers and/or typed arrays to access binary data.

JSZlib currently just implements the "inflate" part of zlib, but there will hopefully
be a port of the "deflate" portion in the future.

JSZlib is based very closely on jzlib (http://www.jcraft.com/jzlib/), and is distributed
under the same (BSD-style) license.  The author of jzlib, ymnk, in turn credits Jean-loup
Gailly and Mark Adler for the original zlib code.

Using it
--------

Simplest way is just to call jszlib_uncompress.  Takes an ArrayBuffer, returns an ArrayBuffer,
throws an exception if something breaks.  You can also use a ZStream class which behaves
much like ZStream from jzlib.  This might be useful if you need to uncompress partial data --
some kinds of streaming network protocol, for instance -- but is overkill for most applications.
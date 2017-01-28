# tldrlegal

[![npm version](https://badge.fury.io/js/tldrlegal.svg)](https://badge.fury.io/js/tldrlegal)

The easiest way to find out if your JavaScript project meets its dependencies' licensing requirements.

[tldrlegal](https://github.com/eladnava/tldrlegal) is a Node.js command-line tool that checks your dependencies for license requirements using a legal resource called [tldrlegal.com](https://tldrlegal.com/) which provides plain English software license interpretations.

A few examples of license obligations in JavaScript dependencies which are not uncommon:

* **State Changes** - You must state significant changes made to the software.
* **Disclose Source** - You must disclose your source code when you distribute your software.
* **Give Credit** - You must display an acknowledgement in all advertising materials mentioning features or use of the software.

## Usage

```shell
npm install -g tldrlegal

cd my-js-project
tldrlegal
```

## Preview

![Preview](https://raw.github.com/eladnava/tldrlegal/master/assets/output.png) 

## Command Line Options

```shell
tldrlegal --help

  Usage: tldrlegal [options]

  Options:

    -h, --help       output usage information
    -V, --version    output the version number
    --folder <path>  set path to project root with node_modules/ directory
```

## Requirements

* Node.js v6.x.x or newer

## Disclaimer

1. This tool is not a replacement for proper legal consultation.
2. Please be advised that the information provided by this tool may not be 100% accurate.

## Credits

1. Thanks to all the contributors of [tldrlegal.com](https://tldrlegal.com) who helped make this possible.
2. Thanks to all the contributors of [franciscop/legally](https://github.com/franciscop/legally), a package that determines your dependencies' licenses with great accuracy.

## License

Apache 2.0

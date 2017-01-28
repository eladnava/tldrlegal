# tldrlegal

[![npm version](https://badge.fury.io/js/tldrlegal.svg)](https://badge.fury.io/js/tldrlegal)

The easiest way to find out if your JavaScript project meets its dependencies' licensing requirements.

[tldrlegal](https://github.com/eladnava/tldrlegal) is a Node.js command-line tool that checks your dependencies for license requirements using an unofficial legal resource called [TLDRLegal.com](https://tldrlegal.com/) which provides plain English software license explanations.

A few examples of license obligations which are not uncommon:

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

![Preview](https://raw.github.com/eladnava/tldrlegal/master/assets/preview.png) 

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

## Sample Output

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                 License Obligation Summary                 │
│                                                            │
├─────────────────────────────────────┬──────────────────────┤
│ Obligation                          │ Packages             │
├─────────────────────────────────────┼──────────────────────┤
│ Must State Changes                  │ 9 packages           │
│ Must Rename (If License Modified)   │ 1 packages           │
│ Must Give Credit                    │ 0 packages           │
│ Must Disclose Source                │ 0 packages           │
│ Must Include Original               │ 0 packages           │
└─────────────────────────────────────┴──────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                              State Changes                              │
│                                                                         │
├────────────────────────────────────────────────────────────┬────────────┤
│ You must state significant changes made to these packages. │ License    │
├────────────────────────────────────────────────────────────┼────────────┤
│ aws-sdk@2.3.16                                             │ Apache 2.0 │
│ aws-sign2@0.6.0                                            │ Apache 2.0 │
│ caseless@0.11.0                                            │ Apache 2.0 │
│ ejs@2.4.2                                                  │ Apache 2.0 │
│ forever-agent@0.6.1                                        │ Apache 2.0 │
│ jmespath@0.15.0                                            │ Apache 2.0 │
│ oauth-sign@0.8.2                                           │ Apache 2.0 │
│ request@2.72.0                                             │ Apache 2.0 │
│ tunnel-agent@0.4.3                                         │ Apache 2.0 │
└────────────────────────────────────────────────────────────┴────────────┘

┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                           Rename (If License Modified)                           │
│                                                                                  │
├─────────────────────────────────────────────────────────────────────┬────────────┤
│ You must rename these packages' licenses if you change their terms. │ License    │
├─────────────────────────────────────────────────────────────────────┼────────────┤
│ xml-name-validator@2.0.1                                            │ WTFPL      │
└─────────────────────────────────────────────────────────────────────┴────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│                                  Unknown Licenses                                   │
│                                                                                     │
├──────────────────────────────────────────┬──────────────────────────────────────────┤
│ Package                                  │ License                                  │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ json-schema@0.2.2                        │ AFL 2.1                                  │
└──────────────────────────────────────────┴──────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                                    Disclaimer                                    │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ None of the above information is legal advice.                                   │
├──────────────────────────────────────────────────────────────────────────────────┤
│ This tool is not a replacement for proper legal consultation.                    │
│ Also, be advised that the information above may not be 100% accurate.            │
└──────────────────────────────────────────────────────────────────────────────────┘
```

## Disclaimer

1. This tool is not a replacement for proper legal consultation.
2. Please be advised that the information provided by this tool may not be 100% accurate.

## License

Apache 2.0

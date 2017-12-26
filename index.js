#!/usr/bin/env node

var fs = require('fs');
var log = require('npmlog');
var program = require('commander');
var output = require('./lib/output');
var licensing = require('./lib/licensing');
var legally = require('legally/lib/legally');
var obligationInfo = require('./metadata/obligationInfo');
var licenseObligations = require('./metadata/licenseObligations');

// Define arguments and options
program
    .version('1.0.0')
    .option('--folder <path>', 'set path to project root with node_modules/ directory')
    .option('--closed-source', 'whether the project is being distributed as closed-source (for example as a binary or client-side with webpack)')
    .parse(process.argv);

// Main project directory
var projectDirectory = program.folder || process.cwd();

// Is the node_modules directory missing?
if (!fs.existsSync(projectDirectory + '/node_modules')) {
    return log.error('tldrlegal', 'Please run this tool from within a JavaScript project with a node_modules directory.');
}

// Fetch dependencies and their licenses by directory
var packages = legally(projectDirectory);

// Result variables
var results = {}, unknownLicenses = [];

// Traverse all dependencies
for (var packageName in packages) {
    // Get SPDX license code
    var license = licensing.getPreferredPackageLicense(packages[packageName], program.closedSource);

    // Get obligations for this license
    var obligations = licenseObligations[license];

    // No obligations documented for this license?
    if (!obligations) {
        // Add to list of unknown licenses
        unknownLicenses.push([packageName, license]);

        // Nothing else to do here
        continue;
    }

    // Traverse obligations for this license
    for (var obligation in obligations) {
        // Is this an irrelevant obligation?
        if (!licensing.isObligationRelevant(obligation, program.closedSource)) {
            continue;
        }

        // Prepare an array of packages for this obligation
        if (!results[obligation]) {
            results[obligation] = [];
        }

        // Add current package and its license under this obligation
        results[obligation].push({name: packageName, license: license});
    }
}

// Traverse possible license obligations
for (var obligation in obligationInfo) {
    // Is this an irrelevant obligation?
    if (!licensing.isObligationRelevant(obligation, program.closedSource)) {
        continue;
    }

    // Already have results for this obligation?
    if (results[obligation]) {
        continue;
    }

    // Initialize obligation array for summary view
    results[obligation] = [];
}

// Output everything
output(results, unknownLicenses, packages);
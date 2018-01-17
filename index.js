#!/usr/bin/env node

var fs = require('fs');
var log = require('npmlog');
var program = require('commander');
var output = require('./lib/output');
var licensing = require('./lib/licensing');
var legally = require('legally/lib/legally');
var obligationInfo = require('./metadata/obligationInfo');
var licenseObligations = require('./metadata/licenseObligations');
var licenseCompatibility = require('./metadata/licenseCompatibility');

// Define arguments and options
program
    .version('1.0.0')
    .option('--folder <path>', 'set path to project root with node_modules/ directory')
    .option('--closed-source', 'whether the project is being distributed as closed-source (for example as a binary or client-side with webpack)')
    .option('--compatibility', 'output license compatibility (whether all dependencies can be distributed together)')
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
var results = {}, unknownLicenses = [], allPackageLicenses = {};

// Traverse all dependencies
for (var packageName in packages) {
    // Get SPDX license code
    var license = licensing.getPreferredPackageLicense(packages[packageName], program.closedSource);

    // set up for checking compatibility
    if (program.compatibility) {
        allPackageLicenses[packageName] = license;
    }

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

if (program.compatibility) {
    var licenseTypes = {};
    for (var packageName in allPackageLicenses) {
        var license = allPackageLicenses[packageName];
        var licenseType = licenseCompatibility[license.replace(/\s/, '-')];

        if (licenseType) {
            licenseTypes[license] = licenseType;
        } else {
            unknownLicenses.push([packageName, license]);
        }
    }

    var licenses = Object.keys(licenseTypes);
    var pairwise = []
    for (var i = 0; i < licenses.length; i++) {
        for (var j = i + 1; j < licenses.length; j++) {
            pairwise.push([licenses[i], licenses[j]], [licenses[j], licenses[i]])
        }
    }

    pairwise.forEach((pair) => {
        console.log(licenseTypes[pair[0]], licenseTypes[pair[1]]);
        var compatibile = licensing.forwardCompatibility(licenseTypes[pair[0]], licenseTypes[pair[1]]);

        if (!compatibile) {
            var packages = [];

            var derivativePackages = [];
            for (var packageName in allPackageLicenses) {
                if (allPackageLicenses[packageName] === pair[1]) {
                    derivativePackages.push(packageName);
                }
            }
            for (var packageName in allPackageLicenses) {
                if (allPackageLicenses[packageName] === pair[0]) {
                    var name = `${packageName} is not compaitble with ${derivativePackages.join(',')}`;
                    packages.push({name: name, license: `${pair[0]} < ${pair[1]}` });
                }
            }
            results['compatibility'] = packages;
        }
    })
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

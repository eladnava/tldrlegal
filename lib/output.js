var table = require('legally/src/table');
var obligationInfo = require('../metadata/obligationInfo');

module.exports = function (results, unknownLicenses, packages) {
    // Output summary table
    outputSummary(results, packages);

    // Output obligations and their packages
    outputObligationsAndPackages(results);

    // Output packages whose license is not recognized
    outputUnknownLicenses(unknownLicenses);

    // Output general disclaimer
    outputDisclaimer();
}

function outputSummary(results, packages) {
    // Table rows
    var rows = [];

    // Traverse obligations
    for (var obligation in results) {
        // Get obligation title
        var obligationTitle = obligationInfo[obligation].title;

        // Add table row for this obligation
        rows.push(['Must ' + obligationTitle, results[obligation].length + ' packages']);
    }

    // Generate and output table
    table(rows, { Obligation: 35, Packages: 20 }, { title: `License Obligation Summary (${Object.keys(packages).length} Packages)` });
}

function outputObligationsAndPackages(results) {
    // Traverse obligations
    for (var obligation in results) {
        // No results for this obligation?
        if (results[obligation].length === 0) {
            continue;
        }

        // Table rows
        var rows = [];

        // Fetch obligation info for this obligation
        var info = obligationInfo[obligation];

        // Traverse obligation packages
        for (var package of results[obligation]) {
            // Add package to table
            rows.push([package.name, package.license]);
        }

        // Generate and output table for each obligation
        table(rows, { [info.desc]: info.desc.length, License: 10 }, { title: info.title });
    }
}

function outputUnknownLicenses(unknownLicenses) {
    // No unknown licenses?
    if (unknownLicenses.length === 0) {
        return;
    }
    
    // Generate and output table
    table(unknownLicenses, { Package: 40, License: 40 }, { title: 'Unknown Licenses' });
}

function outputDisclaimer() {
    // Table rows
    var notices = [
        ['This tool is not a replacement for proper legal consultation.'],
        ['Also, be advised that the information above may not be 100% accurate.']
    ];

    // Disclaimer notice
    var disclaimer = 'None of the above information is legal advice.';

    // Generate and output table
    table(notices, { [disclaimer]: 80 }, { title: 'Disclaimer' });
}

var obligationInfo = require('../metadata/obligationInfo');
var licenseObligations = require('../metadata/licenseObligations');

// Invalid but common SPDX license codes
var invalidSPDX = [
    'BSD',
    'BSD like'
];

exports.isObligationRelevant = function (obligation, closedSource) {
    // In closed source mode, all obligations are relevant
    return closedSource || !obligationInfo[obligation].closedSourceOnly;
}

exports.getPreferredPackageLicense = function (lib, closedSource) {
    // License sources, prioritized by integrity
    var sources = [lib.package, lib.license, lib.readme];

    // Fallback license
    var fallbackLicense;

    // Traverse license sources (README / package.json / LICENSE file)
    for (var sourceLicenses of sources) {
        // Possible licenses list
        var possibleLicenses = [];

        // Traverse detected licenses for this source
        for (var license of sourceLicenses) {
            // Ignore inspecific BSD
            if (invalidSPDX.indexOf(license) !== -1) {
                fallbackLicense = license;
                continue;
            }

            // Add to licenses list along with obligation count
            possibleLicenses.push({ license: license, obligations: getObligationCount(license, closedSource) });
        }

        // No licenses detected for this source?
        if (possibleLicenses.length === 0) {
            continue;
        }

        // Sort licenses by obligations ASC
        possibleLicenses.sort(function (a, b) {
            // -1 means place a before b
            return (a.obligations < b.obligations ? -1 : 1);
        });

        // Return license with least obligations for this source
        return possibleLicenses[0].license;
    }

    // Defautl to fallback license, if no fallback then return '-'
    return fallbackLicense || '-';
}


exports.forwardCompatibility = function (sourceType, derivativeType) {
    if (sourceType === 'public_domain') {
        return true
    } else if (sourceType === 'permissive' || sourceType === 'weakly_protective') {
        var compatibleTypes = [
            'public_domain',
            'permissive',
            'weakly_protective',
            'protective',
            'strongly_protective',
            'network_protective',
        ];
        return compatibleTypes.indexOf(derivativeType) > 0;
    } else if (sourceType === 'strongly_protective') {
        var compatibleTypes = [
            'weakly_protective',
            'protective',
            'strongly_protective',
            'network_protective',
        ];
        return compatibleTypes.indexOf(derivativeType) > 0;
    } else if (sourceType === 'network_protective') {
        var compatibleTypes = [
            'network_protective',
        ];
        return compatibleTypes.indexOf(derivativeType) > 0;
    } else {
        return null;
    }
}

function getObligationCount(license, closedSource) {
    // Set default obligation count as high as possible so this license isn't preferred
    var obligationCount = 100;

    // Got obligations for this license?
    if (licenseObligations[license]) {
        // Reset obligation count
        obligationCount = 0;

        // Traverse obligation codes
        for (var obligation in licenseObligations[license]) {
            // Is obligation irrelevant?
            if (!exports.isObligationRelevant(obligation, closedSource)) {
                continue;
            }

            // It's not irrelevant
            obligationCount++;
        }
    }

    // Return obligation count
    return obligationCount;
}

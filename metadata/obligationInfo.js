module.exports = {
    giveCredit: {
        title: 'Give Credit',
        desc: 'You must display an acknowledgement in all advertising materials mentioning features or use of these packages.'
    },
    stateChanges: {
        title: 'State Changes',
        desc: 'You must state significant changes made to these packages.'
    },
    discloseSource: {
        title: 'Disclose Source',
        desc: 'You must disclose your source code when you distribute your software.'
    },
    includeOriginal: {
        title: 'Include Original',
        desc: 'You must distribute copies of these original packages or instructions to obtain copies with your software.'
    },
    rename: {
        title: 'Rename (If License Modified)',
        desc: 'You must rename these packages\' licenses if you change their terms.'
    },
    includeLicense: {
        // Only warn about this obligation in closed-source mode
        closedSourceOnly: true,
        title: 'Include License',
        desc: 'You must include the license notice in all copies or substantial uses of these packages.'
    },
    includeCopyright: {
        // Only warn about this obligation in closed-source mode
        closedSourceOnly: true,
        title: 'Include Copyright',
        desc: 'You must include the copyright notice in all copies or substantial uses of these packages.'
    },
    includeNotice: {
        // Only warn about this obligation in closed-source mode
        closedSourceOnly: true,
        title: 'Include Notice',
        desc: 'If these packages have a "NOTICE" file with attribution notes, you must include that NOTICE when you distribute. You may append to these NOTICE files.'
    },
}
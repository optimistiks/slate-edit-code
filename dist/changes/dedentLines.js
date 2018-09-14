'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

// Return the index of the first character that differs between both string, or
// the smallest string length otherwise.
function firstDifferentCharacter(a, b) {
    if (a.length > b.length) {
        return firstDifferentCharacter(b, a);
    }

    var indexes = Array(a.length).fill().map(function (v, i) {
        return i;
    });
    var index = indexes.find(function (i) {
        return a[i] !== b[i];
    });

    return index == null ? a.length : index;
}

/**
 * Dedent all lines in selection
 */

function dedentLines(opts, change,
// Indent to remove
indent) {
    var value = change.value;
    var document = value.document,
        selection = value.selection;

    var lines = document.getBlocksAtRange(selection).filter(function (node) {
        return node.type === opts.lineType;
    });

    return lines.reduce(function (c, line) {
        // Remove a level of indent from the start of line
        var textNode = line.nodes.first();
        var lengthToRemove = firstDifferentCharacter(textNode.text, indent);
        return c.removeTextByKey(textNode.key, 0, lengthToRemove);
    }, change);
}

exports.default = dedentLines;
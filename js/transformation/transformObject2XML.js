function _escapeAttrValue(value) {
    if (typeof value !== 'string') {
        return value;
    }
    // 这里需要转义> < & "，不过前几个先不做了
    return value.replace(/["]/g, function (match, i, str) {
        switch (match) {
        case '"': {
            return '"';
        }
        default: {
            return match;
        }
        }
    });
}

function _transformAttrs(attrs) {
    if (!attrs) {
        return '';
    }

    return $.map(attrs, (attrValue, attrKey) => `${attrKey.toLowerCase()}="${_escapeAttrValue(attrValue)}"`).join(' ');
}

function transform(object) {
    if (!object.children || !object.children.length) {
        return `<${object.tag} ${_transformAttrs(object.attrs)}/>`;
    }

    return `
        <${object.tag} ${_transformAttrs(object.attrs)}>
            ${
                typeof object.children === 'string' ?
                    object.children :
                    $.map(object.children, (child) => transform(child)).join('')
            }
        </${object.tag}>
    `;
}

export default transform;

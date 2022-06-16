const getExtensionFromUrl = (url) => {
    if (url == null || undefined) {
        return;
    }
    let extensionContainer = ''
    const urlReverse = url.split('').reverse().join('');
    for (let index = 0; index < url.length; index++) {
        if (urlReverse[index] === '.' || extensionContainer.length > 4) {
            break;
        }
        extensionContainer += urlReverse[index]
    }
    return extensionContainer.split('').reverse().join('');
}



export { getExtensionFromUrl }
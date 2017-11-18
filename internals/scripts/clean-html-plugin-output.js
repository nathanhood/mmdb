function CleanHtmlPluginOutput() {}

CleanHtmlPluginOutput.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            const criticalCSS = '';
            const html = '';
            const preloadedState = '';

            htmlPluginData.html = eval('`' + htmlPluginData.html + '`');

            callback(null, htmlPluginData);
        });
    });
};

module.exports = CleanHtmlPluginOutput;

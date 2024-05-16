module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
    ];

    const plugins = [
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        "@babel/plugin-proposal-class-properties",
    ];

    return {
        presets,
        plugins,
    };
};

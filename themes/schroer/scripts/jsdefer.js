hexo.extend.helper.register('jsdefer', function (path) {
    return '<script type="text/javascript" src="' + path + '" defer></script>';
});

/*
 * stopSearch stops DevTools.search()
 *
 */
var stopSearch = function(app) {
    var regionTree = regionInspector(app, '', false);
    var views = getViewList(regionTree);
    var $els = $(_.pluck(views, 'el'));

    _.each($els, function(el) {
        var $el = $(el);
        $el.removeAttr('data-view-id');
        _resetOutline($el);
        $el.off('.regionSearch');
    });

    $('.dev-tools.view-summary').remove();
};

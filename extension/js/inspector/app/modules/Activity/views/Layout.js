define([
  'marionette',
  'util/Radio',
  'app/modules/Activity/models/ActivityNode',
  'app/modules/Activity/views/ActivityTree',
  'app/modules/Activity/views/ActionList',
  'app/modules/Activity/views/ActivityInfo',
  'app/modules/Activity/views/ActivityGraph'
], function(Marionette, Radio, ActivityNode, ActivityTree, ActionList, ActivityInfo, ActivityGraph) {

  return Marionette.View.extend({

    template: 'activity/layout.html',

    regions: {
      activityGraph: '[data-region="activity-graph"]',
      activityList: '[data-region="activity-list"]',
      activityInfo: '[data-region="activity-info"]',
    },

    attributes: {
      view: 'activity-layout'
    },

    activityCommands: {
      'show:info': 'showInfo',
      'click:graph': 'findAndShowInfo'
    },

    actionCommands: {
      'onClickToggle': 'showGraph'
    },

    className: 'app-tool activity',

    activityCollection: undefined,
    activityRoot: undefined,

    initialize: function(options) {
      options = options || {};
      this.activityCollection = options.activityCollection;
      this.actionCollection = options.actionCollection;
      this.actionCollection.activityCollection = options.activityCollection;

      Radio.connectCommands('activity', this.activityCommands, this);
      Radio.connectCommands('activity', this.actionCommands, this);

    },

    onRender: function() {
      this.actionCollection.resetCollapse();
      this.getRegion('activityList').show(new ActionList({
        collection: this.actionCollection
      }));
    },

    showGraph: function(actionId) {

      var actionModel = this.actionCollection.findByActionId(actionId);

      if (actionModel.isCollapsed) {

        this.getRegion('activityGraph').empty();

      } else {
        
        var filteredActivityCollection = this.activityCollection.filterByActionId(actionId);

        this.getRegion('activityGraph').show(new ActivityGraph({
          activityCollection: filteredActivityCollection
        }));

      }

    },

    showInfo: function(activityModel) {
      this.getRegion('activityInfo').show(new ActivityInfo({
        model: activityModel
      }));
    },

    findAndShowInfo: function(eventId) {
      var activityModel = this.activityCollection.findByEventId(eventId);
      this.showInfo(activityModel);
    }
  });
});

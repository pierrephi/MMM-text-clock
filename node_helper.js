const NodeHelper = require('node_helper');
const locale = require('./locale');

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SET_LANGUAGE') {
      this.sendSocketNotification(
        'SET_LANGUAGE',
        JSON.stringify(
          Object.assign({}, payload, locale[payload.language]),
          (_, value) => {
            if (typeof value === 'function') {
              return '__FUNC__' + value.toString();
            }

            return value;
          },
          2
        )
      );
    }
  },
});

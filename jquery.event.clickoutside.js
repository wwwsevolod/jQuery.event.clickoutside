/**
 * Listen to click out of element, i recommend you to use it with 'jQuery(selector).one' method of listening events;
 * It's not so fast, but i dont know any use case where you need to use it everywhere and not with $.fn.one
 * @example
 *     jQuery('div').one('clickoutside', function() {
 *         alert('Ahoi! You clicked out of any div\'s');
 *     });
 * @author vivanov <www@sevolod.ru>
 * @type {Object}
 */
jQuery.event.special.clickoutside = {
    setup: function() {
        jQuery.event.special.clickoutside.containers = [];
        jQuery('body').bind('click.clickoutside', jQuery.event.special.clickoutside.handler);
    },
    add: function() {
        jQuery.event.special.clickoutside.containers.push(this);
    },
    remove: function() {
        var index = jQuery.inArray(this, jQuery.event.special.clickoutside.containers);
        if (index !== -1) {
            jQuery.event.special.clickoutside.containers.splice(index, 1);
        }
    },
    teardown: function() {
        jQuery.event.special.clickoutside.containers = null;
        jQuery('body').unbind('click.clickoutside', jQuery.event.special.clickoutside.handler);
    },
    handler: function(e) {
        var arr = jQuery.event.special.clickoutside.containers;
        if (!arr) {
            return;
        }
        for (var n = 0; n < arr.length; n++) {
            jQuery.event.special.clickoutside.checkAndTrigger(arr[n], e.target);
        }
    },
    checkAndTrigger: function(container, target) {
        var $container = jQuery(container);
        if ($container.find(target).length) {
            return;
        }
        if ($container.is(target)) {
            return;
        }
        $container.trigger('clickoutside');
    }
}
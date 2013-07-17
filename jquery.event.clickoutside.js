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
(function($) {
    var containers;

    var checker = function(container, target) {
        var $container = $(container);
        if ($container.find(target).length) {
            return;
        }
        if ($container.is(target)) {
            return;
        }
        $container.trigger('clickoutside');
    }

    var clickHandler = function(e) {
        if (!containers.length) {
            return;
        }
        for (var n = 0; n < arr.length; n++) {
            checker(arr[n], e.target);
        }
    }

    $.event.special.clickoutside = {
        setup: function() {
            containers = [];
            $('body').bind('click.clickoutside', clickHandler);
        },
        add: function() {
            containers.push(this);
        },
        remove: function() {
            var index = $.inArray(this, containers);
            if (index !== -1) {
                containers.splice(index, 1);
            }
        },
        teardown: function() {
            containers = null;
            $('body').unbind('click.clickoutside', clickHandler);
        }
    }
})(jQuery);
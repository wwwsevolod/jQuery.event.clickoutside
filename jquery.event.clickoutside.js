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
    var counter = 0;
    var uniqueId = 0;
    var containers = [];
    var checker = function(event) {
        var target = event.target;
        var $container = $(this);
        if ($container.find(target).length) {
            return;
        }
        if ($container.is(target)) {
            return;
        }
        $container.trigger('clickoutside');
    };

    $.event.special.clickoutside = {
        setup: function() {
            counter++;
            uniqueId++;
            containers.push(this);
            containers.push(uniqueId);
            $('body').bind('click.clickoutsideHelper' + uniqueId, jQuery.proxy(checker, this));
        },
        teardown: function() {
            var index = jQuery.inArray(containers, this);
            if (index == -1) {
                return;
            }
            counter--;
            var uniqueIdOfElement = containers[index + 1];
            containers.splice(index, 2);
            $('body').unbind('click.clickoutsideHelper' + uniqueIdOfElement);
        }
    };
})(jQuery);
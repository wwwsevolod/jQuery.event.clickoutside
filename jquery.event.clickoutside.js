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
    var uniqueId = 0,
        containers = [];

    function checker(event) {
        var target = event.target;
        var $this = $(this);
        if ($this.find(target).length) {
            return;
        }
        if ($this.is(target)) {
            return;
        }
        $this.trigger('clickoutside');
    }

    $.event.special.clickoutside = {
        noBubble: true,
        setup: function() {
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
            var uniqueIdOfElement = containers[index + 1];
            containers.splice(index, 2);
            $('body').unbind('click.clickoutsideHelper' + uniqueIdOfElement);
        }
    };
})(jQuery);
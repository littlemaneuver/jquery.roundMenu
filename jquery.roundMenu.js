/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 19.06.13
 * Time: 11:21
 * To change this template use File | Settings | File Templates.
 */
(function ($, document) {
    $.fn.roundMenu = function (config) {
        var _self = this,
            children = _self.children();
//      main calulation about angleRange and position of the menu container
        var calcRadians = function (config) {
            var position = _self.position(),
                r = config.radius,
                height = _self.height() + position.top,
                width = _self.width() + position.left,
                childrenCount = children.length,
                centerX = width/4 + r,
                centerY = height/ 2,
                angleRange = {
                    max: Math.PI - Math.atan(Math.abs(position.top - centerY)/r),
                    min: Math.PI + Math.atan(Math.abs(height - centerY)/r)
                },
                angleStep = (angleRange.max - angleRange.min - config.angleCorrection * Math.PI / 180) / (childrenCount +1);
            return {
                centerX: centerX,
                centerY: centerY,
                r: r,
                angleRange: angleRange,
                angleCorrection: config.angleCorrection * Math.PI / 180,
                angleStep: angleStep,
                position: position,
                height: height,
                width: width
            }
        };
//        apply changes to menu items, seems they'll be posiotioned on circuit curve
        var buildMenu = function (coords) {
            var childWidth,
                childHeight,
                startPos = coords.angleRange.min /*+ coords.angleCorrection / 2*/,
                x, y;
            $.each(children, function (i, child) {
                child = $(child);
                x = Math.round(coords.r * Math.cos(startPos) + coords.centerX);
                y = Math.round(coords.r * Math.sin(startPos) + coords.centerY);
                child.css('position', 'absolute');
                childWidth = child.width();
                childHeight = child.height();
                child.css({
                    top: y - coords.position.top /*- childHeight/2*/,
                    left: x - coords.position.left /*- childWidth/2*/,
                    position: 'absolute'
                });
                startPos += coords.angleStep;
            });

        };
//        invoke all inner functions for building circular menu
        var init = function () {
            var defaults = {
                radius: 3000,
                vertical: true,
                angleCorrection: 4
            };
            config = $.extend({}, defaults, config);
            var coords = calcRadians(config);
            _self.css('position', 'relative');
            console.log(coords)
            buildMenu(coords);
        };
        console.log(init(config));
        return _self;
    }
}) (jQuery, window.document)
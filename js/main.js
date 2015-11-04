var SliderWidget = (function(){

    var _insertValues = function($this) {
        var
            container = $this.closest('.filter__slider'),
            from = container.find('.filter__slider-input_from'),
            to = container.find('.filter__slider-input_to');

        var values = $this.slider('option', 'values');

        from.val(values[0]);
        to.val(values[1]);
    }

    return {
        init: function(){

            $('.filter__slider-element').each(function(){
                var
                    $this = $(this),
                    min = parseInt($this.data('min')),
                    max = parseInt($this.data('max'));

                $this.slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [min, max],
                    slide: function() {
                        _insertValues($this);
                    },
                    create: function(){
                        _insertValues($this);
                    }
                });
            });
        }
    }
}());

var ViewStateChange = (function(){

    var _previousClass = '';

    var _changeState = function($this){
        var
            item = $this.closest('.sort__view-item'),
            view = item.data('view'),
            listOfItems = $('#products-list'),
            modificationPrefix = 'products__list_',
            classOfViewState = modificationPrefix + view;

        if (_previousClass == '') {
            _previousClass = listOfItems.attr('class');
        }

        _changeActiveClass($this);
        listOfItems.attr('class', _previousClass + ' ' + classOfViewState);
    };

    var _changeActiveClass = function($this) {
        $this
            .closest('.sort__view-item').addClass('active')
            .siblings().removeClass('active');
    }

    return {
        init: function(){
            $('.sort__view-link').on('click', function(e){
                e.preventDefault();
                _changeState($(this));
            });
        }
    }
}());

var resetResult = (function(){

    var _reset = function(e){

        e.preventDefault();

        var $this = $(this);

        var _accordeonItem = $this.closest('.menu-setup__item');
        var _input = _accordeonItem.find('input');

        _input.each(function(){
            $(this).prop('checked', false);
        })

    };

    return {
        init: function() {
            $('.accordeon__reset-filter').on('click', _reset)
        }
    }

})();

var Slideshow = (function(){

    var _changeSlide = function($this){
        var
            container = $this.closest('.products__slideshow'),
            path = $this.find('img').attr('src'),
            display = container.find('.products__slideshow-img');


        $this.closest('.products__slideshow-item').addClass('active')
            .siblings().removeClass('active');

        display.fadeOut(function(){
            $(this).attr('src', path).fadeIn();
        });
    }

    return {
        init: function(){
            $('.products__slideshow-link').on('click', function(e){
                e.preventDefault();

                var
                    $this = $(this);

                _changeSlide($this);

            });
        }
    }
}());


var Accordeon = (function(){

    var _openAccordion = function ($this) {
        var
            item = $this.closest('.menu-setup__item'),
            list = $this.closest('.menu-setup__list'),
            items = list.find('.menu-setup__item'),
            content = item.find('.menu-setup__list-presence'),
            otherContent = list.find('.menu-setup__list-presence'),
            duration = 300;

        if(!item.hasClass('active')){
            item.removeClass('active');
            item.addClass('active');

            content.stop(true, true).slideDown(duration);
        }else {
            content.stop(true, true).slideUp(duration);
            item.stop(true, true).removeClass('active');
        }
    }

    return {
        init: function() {
            $('.accordion__trigger').on('click', function(e){
                e.preventDefault();
                _openAccordion($(this));
            });
        }
    }
})();

$(document).ready(function(){

    resetResult.init();

    ViewStateChange.init();

    if ($('.filter__slider-element').length){
        SliderWidget.init();
    }
    if ($('.accordion__trigger').length) {
        Accordeon.init();
    }
    if ($('.products__slideshow').length) {
        Slideshow.init();
    }
    if ($('.sort__select-elem').length){
        $('.sort__select-elem').select2({
           minimumResultsForSearch: Infinity
        });
    }

    $('.attension__text').columnize({
        width: 500
    });
});


$(function(){

    // default variables
    var tail = $('.tail'),
            filterCard = $('.filter-card'),
            filters = $('.ex-filter').children(),
                filter = $('.filter-button'),
                all = $('.all');



    var $grid = $('.filter-cards-wrap');
        //$sizer = $grid.find('.shuffle__sizer');

    var Shuffle = window.Shuffle;

    $grid.shuffle({
        itemSelector: '.filter-card',
        initialSort: {
            by: function($el) {
                return $el.find('.filter-card-title').text().toLowerCase();
            }
        }
    });

    $('.filter-cards-wrap--roadmap').shuffle('shuffle', 'new');

    // filter icons display tail
    filter.not(all).on('mouseenter', function() {
        var that = $(this);

        tail.text(that.attr('tail'));
        that.mousemove(function(e) {
            tail.css({'left': e.pageX-(tail.width()/2), 'top': e.pageY+20});
        });
        tail.addClass('active');

        if(filters.is(that)) {
            that.addClass('is-hover');
        }

    }).on('mouseleave', function() {
        tail.removeClass('active');
        $(this).removeClass('is-hover');
    });

    // header filter buttons 
    filters.on('click', function() {
        var that = $(this);

        filters.removeClass('is-checked is-hover');
        that.addClass('is-checked');

        var group = $(this).attr('data-group');

        $('.roadmap__filter-legend-item').removeClass('is-checked');
        $(".roadmap__filter-legend-item[data-group='" + group +"']").addClass('is-checked');

        $grid.shuffle('shuffle', $(this).attr('data-group'));
    });

    var newfilter = $('.filter-new').length;
    $('.roadmap__filter-legend-item[data-group="new"]').html(newfilter);

    var ongoing = $('.filter-ongoing').length;
    $('.roadmap__filter-legend-item[data-group="ongoing"]').html(ongoing);

    var completed = $('.filter-completed').length;
    $('.roadmap__filter-legend-item[data-group="completed"]').html(completed);


    // shuffle js .filter-card hover fix
    $grid.on('layout.shuffle', function() {
        setTimeout(function() {  
            filterCard.each(function() {
                var style = $(this).attr('style');
                $(this).attr('style', style+' -webkit-transition: all 200ms ease !important; transition: all 200ms ease !important;');
            });
        }, 50);
    });
    filterCard.on('mouseenter', function() {
        $(this).css('margin-top', '-5px');       
    }).on('mouseleave', function() {
        $(this).css('margin-top', '0px');
    });


    
});
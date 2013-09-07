(function ($) {

  $(function() {
    $('.view ul.pager-showmore').each(function(){
      var $pagerElement = $(this);
      var $parentElement = $pagerElement.parents('.view');

      var $pagerLink = $('a', $pagerElement);
      var pagerText = $pagerLink.text();

      // Clear out default and recreate link
      $pagerLink.remove();
      $pagerLink = $('<a>').attr('href', '#').text(pagerText).data('nextpage', 1);

      $('li', $pagerElement).append($pagerLink);

      // Get DOM id of view
      var c = $parentElement.attr('class');
      var domID = c.substr(c.indexOf('view-dom-id-')+12).split(' ')[0];

      var view = Drupal.views.instances['views_dom_id:' + domID];

      // Bind click event
      $pagerLink.click(function(e){
        e.preventDefault();
        $(this).text('Loading...');

        var submitData = view.pagerAjax.submit;
        submitData.page = $(this).data('nextpage');

        $.post('/views/ajax', submitData,
          function(data) {
            for (var i in data) {
              if (data[i].command == 'insert') {
                var $d = $(data[i].data);

                // Append and animate the elements
                var $elems = $('.view-content:last', $d).contents();
                $elems.addClass('newcontent');
                $('.view-content:last', $parentElement).append($elems);
                $('.view-content .newcontent', $parentElement).hide().slideDown('slow', function(){
                  $(this).removeClass('newcontent');
                });

                // Figure out current and max pages
                var $u = $('ul.pager-showmore', $d);
                var pageCurrent = $u.attr('current');
                var pageMax = $u.attr('max');

                // We're on the last page! remove the pager
                if (pageCurrent == pageMax) {
                  $pagerElement.remove();
                } else { // Fill in the next page and reset the text
                  $pagerLink
                    .data('nextpage', parseInt(pageCurrent))
                    .text(pagerText);
                } // End if/else last page
              } // End if Insert
            } // End Loop over commands
          } // End success handler function
        );
      });
    });
  });

})(jQuery);
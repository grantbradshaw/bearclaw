'use strict';

/* eslint-env jquery, browser */
$(document).ready(() => {

  $('#trackedItems').on('click', '.js-delete-scrape', function() {
    var confirmation = window.confirm('Are you sure?');
    if (!confirmation) return false;

    var target = this;
    var scrapeId = $(target).closest('[data-item-id]').attr('data-item-id').replace(/"/g, '');
    var deletePath = window.location.pathname + '/' + scrapeId + '/delete';
    var csrf_token = $('meta[name="csrf-token"]').attr('content');
    $.post(deletePath, {_csrf: csrf_token}, function(res) {
      if (res.success) {
        $(target).closest('tr').hide();
      }
    })
    .fail(function(res) {
      console.log(res.responseText);
    });
  });

});

var navPills = [];
var tabPanes = [];
var selectedClothes = {
  topclothes: "",
  botclothes: "",
  shoes: "",
  hairstyle: "",
  necklaces: "",
  handbags: "",
  background: "",
};

$(document).ready(function () {
  $.getJSON("./../data/Data.json", function (data) {
    navPills = data.navPills;
    tabPanes = data.tabPanes;
    generateTabs(navPills);
  });

  function generateTabs(tabsData) {
    var tabsContainer = $(".nav-pills");
    tabsData.forEach(function (tab) {
      var tabElement = $("<li/>")
        .addClass("nav-item")
        .append(
          $("<a/>")
            .addClass("nav-link")
            .attr("href", "#")
            .text(tab.showName)
            .data("type", tab.type)
            .click(function (event) {
              event.preventDefault();
              loadTabContent($(this).data("type"));
            })
        );
      tabsContainer.append(tabElement);
    });
    loadTabContent(tabsData[0].type);
  }

  function loadTabContent(type) {
    var tabContent = $('.tab-content');
    tabContent.empty(); 
  
    var items = tabPanes.filter(function(item) {
      return item.type === type;
    });
  
    items.forEach(function(item) {
      var itemElement = $('<div/>')
        .addClass('product')
        .append($('<img/>').attr('src', item.imgSrc_jpg))
        .append($('<p/>').text(item.name))
        .append($('<button/>')
          .addClass('btn btn-primary try-on')
          .text('Thử')
          .data('type', item.type) 
          .data('imgSrcPng', item.imgSrc_png)
          .click(function() {
            tryOnItem($(this).data('type'), $(this).data('imgSrcPng'));
          })
        );
      tabContent.append(itemElement);
    });
  }
  
});

function updateModel() {
  for (var part in selectedClothes) {
    if (selectedClothes[part]) {
      $("." + part).css(
        "background-image",
        "url(" + selectedClothes[part] + ")"
      );
    }
  }
}

function tryOnItem(type, imgSrcPng) {
  selectedClothes[type] = imgSrcPng;
  updateModel();
}

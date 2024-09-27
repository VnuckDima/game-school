import $ from 'jquery';

$(document).ready(function() {
	// select
	function group_select() {
	    var el = $('.gm__select');

		el.on('click', function (event) {
			if ($(this).hasClass('is-open')) {
				$(this).removeClass('is-open');
				$(this).find('.gm__select-list').hide();
			}
			else {
				$(this).addClass('is-open');
				$(this).find('.gm__select-list').slideDown();
			}

			$('.gm__menu').jScrollPane().data('jsp').reinitialise();

			event.stopPropagation();
		})

		el.find('.gm__select-list li').bind('click touchstart', function(){
		    $(this).parent().prev().html($(this).text());
		    products_list_refresh($(this).data('key'));
		})

		$(document).click(function() {
			el.find('.gm__select-list').hide();
			el.removeClass('is-open');
		});

		el.find('.gm__select-list li').first().click();
	}
	group_select();
   
    // product list
	var products = $('.gm__menu-item');
    products.draggable({
        appendTo: 'body',
        helper: 'clone',
        cursor: 'move',
        cursorAt: { top: 50, left: 50 },
        drag: function(event, ui) {
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var itemWidth = $(this).outerWidth();
            var itemHeight = $(this).outerHeight();

            if (ui.position.left < 0) {
                ui.position.left = 0;
            }
            if (ui.position.left + itemWidth > windowWidth) {
                ui.position.left = windowWidth - itemWidth;
            }

            if (ui.position.top < 0) {
                ui.position.top = 0;
            }
            if (ui.position.top + itemHeight > windowHeight) {
                ui.position.top = windowHeight - itemHeight;
            }
        }
    });

	
	function HandleGaEvent(category, action) {
		// Example function to handle Google Analytics events
		console.log('GA Event:', category, action);
		// Implement actual GA event tracking code here
	}
	
	function products_list_refresh(group) {
	    $('.gm__menu-item').each(function () {
	        var groups = $(this).data('group');
            if ($.inArray(group.toString(), groups) == 0)
	            $(this).show();
	        else
	            $(this).hide();
	    });
	}

	// plate
	var plate = $('.gm__plate_big .gm__plate-in');
	plate.droppable({
	  drop: function( event, ui ) {
	  	if (ui.draggable.hasClass('gm__menu-item_food')) {
	  		var limit = 7,
	  				items = plate.find('.gm__plate-main').length,
	  				kcal = ui.draggable.data('kcal'),
	  				xe = ui.draggable.data('xe'),
	  		        key = ui.draggable.data('key');
	  		if (items < limit) {
	  		    var drag_pic = null;
	  		    if (ui.draggable.data('pic') != "") {
	  		        drag_pic = $('<img src="' + ui.draggable.data('pic') + '">');
	  		    }
	  		    else {
	  		        drag_pic = ui.draggable.find('.gm__menu-pic img').clone();
	  		    }
	  		    var drag_new = $('<div class="gm__plate-main" data-key="' + key + '" data-kcal="' + kcal + '" data-xe="' + xe + '"></div>').html(drag_pic).appendTo(this);
	  		    products_sum_refresh();
	  		}
	  		else {
	  			var warning = $(this).data('warning');
	  			$('.' + warning).fadeIn();
	  		};
	  		if (items >= 4) {
	  			plate.addClass('is-more-4');
	  		}
	  		else {
	  			plate.removeClass('is-more-4');
	  		}
	  		var plate_prod = plate.find('.gm__plate-main');
	  		if (items == 6) {
	  			plate_prod.eq(0).addClass('is-moved');
	  			plate_prod.eq(2).addClass('is-moved');
	  			plate_prod.eq(3).addClass('is-moved');
	  			plate_prod.eq(5).addClass('is-moved');
	  		};
	  		plate_item = plate.find('.gm__plate-main');
	  		plate_item.draggable({
	  			appendTo: 'body',
	  			revert: true,
	  			drag: function ( event, ui ) {
	  				var left = $(this).position().left,
	  						top = $(this).position().top,
	  						main_items = plate.find('.gm__plate-main').length;
	  				if (left < -50 || left > 200 || top < -50 ||top > 200) {
	  					$(this).draggable('destroy');
	  					$(this).remove();
	  					plate_prod.removeClass('is-moved');
	  					if (main_items == 5) {
	  						plate.removeClass('is-more-4');
	  					};
	  				};
	  			},
	  			stop: function() {
	  			    products_sum_refresh();
	  			}
	  		});
	  	};
	  }
	});

	// desert
	var desert = $('.gm__plate_small .gm__plate-in');
	desert.droppable({
	  drop: function( event, ui ) {
	  	if (ui.draggable.hasClass('gm__menu-item_food')) {
	  		var limit = 2,
	  				items = desert.find('.gm__plate-desert').length,
	  				kcal = ui.draggable.data('kcal'),
	  				xe = ui.draggable.data('xe'),
	  		        key = ui.draggable.data('key')
	  		if (items < limit) {
	  		    var drag_pic = null;
	  		    if (ui.draggable.data('pic') != "") {
	  		        drag_pic = $('<img src="' + ui.draggable.data('pic') + '">');
	  		    }
	  		    else {
	  		        drag_pic = ui.draggable.find('.gm__menu-pic img').clone();
	  		    }
	  		    var drag_new = $('<div class="gm__plate-desert" data-key="' + key + '" data-kcal="' + kcal + '" data-xe="' + xe + '"></div>').html(drag_pic).appendTo(this);
	  		    products_sum_refresh();
	  		}
	  		else {
	  			var warning = $(this).data('warning');
	  			$('.' + warning).fadeIn();
	  		};
	  		plate_item = desert.find('.gm__plate-desert');
	  		plate_item.draggable({
	  			appendTo: 'body',
	  			revert: true,
	  			drag: function ( event, ui ) {
	  				var left = $(this).position().left,
	  						top = $(this).position().top;
	  				if (left < -50 || left > 100 || top < -50 ||top > 100) {
	  					$(this).draggable('destroy');
	  					$(this).remove();
	  				};
	  			},
	  			stop: function() {
	  			    products_sum_refresh();
	  			}
	  		});
	  	};
	  }
	});

	// drink
	var drink = $('.gm__cup .gm__cup-in');

	// Проверим, правильно ли элемент найден
	if (drink.length === 0) {
	  console.error('Элемент .gm__cup-in не найден');
	} else {
	  console.log('Элемент .gm__cup-in найден');
	}
	
	drink.droppable({
	  drop: function (event, ui) {
		// Отладка события drop
		console.log('Событие drop для drink сработало');
		
		if (ui.draggable.hasClass('gm__menu-item_drink')) {
		  console.log('Элемент имеет класс gm__menu-item_drink');
		  
		  var items = $(this).find('.gm__cup-drink').length, 
			kcal = ui.draggable.data('kcal'),
			xe = ui.draggable.data('xe'),
			key = ui.draggable.data('key'),
			current = $(this).find('.gm__cup-drink'); 
	
		  if (current.length) {
			current.remove();
		  }
	
		  var drag_pic = null;
	
		  if (ui.draggable.data('pic') != "") {
			drag_pic = $('<img src="' + ui.draggable.data('pic') + '">');
		  } else {
			drag_pic = ui.draggable.find('.gm__menu-pic img').clone();
		  }
	
		  var drag_new = $('<div class="gm__cup-drink" data-key="' + key + '" data-kcal="' + kcal + '" data-xe="' + xe + '"></div>').append(drag_pic).appendTo($(this));
	
		  drag_pic.on('load', function () {
			drag_pic.css({
			  "margin-top": (drag_new.outerHeight() - drag_pic.outerHeight()) / 2 + 'px',
			  "margin-left": (drag_new.outerWidth() - drag_pic.outerWidth()) / 2 + 'px'
			});
		  });
	
		  setTimeout(function () {
			drag_new.addClass('is-active');
		  }, 1);
	
		  products_sum_refresh();
	
		  drag_new.draggable({
			appendTo: 'body',
			revert: true,
			drag: function (event, ui) {
			  var left = $(this).position().left,
				top = $(this).position().top;
	
			  if (left < -50 || left > 50 || top < -50 || top > 50) {
				$(this).draggable('destroy');
				$(this).remove();
			  }
			},
			stop: function () {
			  products_sum_refresh(); 
			}
		  });
		} else {
		  console.log('Элемент не имеет класс gm__menu-item_drink');
		}
	  }
	});

    // kcal and xe
	var choosen_xe = $('.gm__xe'),
            choosen_kcal = $('.gm__kcal');
	function products_sum_refresh() {
	    var cal = 0;
	    var xe = 0;

	    plate.find('.gm__plate-main').each(function () {
	        cal += $(this).data("kcal");
	        xe += $(this).data("xe");
	    });

	    desert.find('.gm__plate-desert').each(function () {
	        cal += $(this).data("kcal");
	        xe += $(this).data("xe");
	    });

	    drink.find('.gm__cup-drink').each(function () {
	        cal += $(this).data("kcal");
	        xe += $(this).data("xe");
	    });

	    choosen_kcal.text(cal);
	    choosen_xe.text((Math.round(xe * 100) / 100));
	}

	// background
	var background_btn = $('.gm__dots button'),
			background_el = $('.gm__bg-item');
	background_btn.on('click', function () {
		background_btn.removeClass('is-active');
		$(this).addClass('is-active');
		var background_index = $(this).index();
		background_el.hide();
		background_el.eq(background_index).show();
	}).first().trigger('click');

	// warning
	$('.gm__warning-arrow').on('click', function () {
		$(this).parent().parent().fadeOut();
	});

	// help
	/* var ask = $('.gm__ask'),
			help = $('.gm__help'),
			help_close = help.find('.gm__help-close');
	ask.on('click', function () {
		help.fadeIn();
	});
	help_close.on('click', function () {
		help.fadeOut();
	}); */

	// switch
	var switch_btn = $('.gm__tip-switch'),
			calories = $('.gm__calories'),
			tooltip = $('.gm__tooltip'),
			tooltip_kcal = tooltip.find('.gm__tooltip-kcal'),
			tooltip_xe = tooltip.find('.gm__tooltip-xe'),
			menu_item = $('.gm__menu-item');
	switch_btn.on('click', function () {
		$(this).toggleClass('is-active');
		tooltip.fadeToggle();
		calories.fadeToggle();
	});
	menu_item.hover(function () {
		var this_kcal = $(this).data('kcal'),
				this_xe = $(this).data('xe');
		tooltip_kcal.text(this_kcal);
		tooltip_xe.text(this_xe);
		tooltip.addClass('is-open');
	}, function () {
		tooltip.removeClass('is-open');
	});
	switch_btn.click();

	/* const helpSwitch = document.getElementById('gm__tip-title')
	helpSwitch.click() */

	// input xe
	var input_xe = $('.gm__input-xe');
	var plan_xe = $('.gm__plan-xe'),
	        selected_xe = $('.gm__selected-xe'),
	        selected_kcal = $('.gm__selected-kcal');
	input_xe.keyup(function (e) {
	    this.value = this.value.replace(/[^0-9]/g, '');
	    if (e.keyCode == 13) {
	        $(".gm__step_2 .gm__btn_next").click();
	    }
	});


	// step
	var step = $('.gm__step'),
			btn_next = $('.gm__btn'),
			warning_min = $('.gm__warning_min'),
            table_result = $('.gm__result-table table');
	btn_next.on('click', function () {
		var attr = $(this).attr('data-step');
		if (typeof attr !== typeof undefined && attr !== false) {
			if (attr == 'gm__step_5') {
				var plate_length = plate.find('.gm__plate-main').length,
						desert_length = desert.find('.gm__plate-desert').length,
						drink_length = drink.find('.gm__cup-drink').length;
				if (plate_length > 0 || desert_length > 0 || drink_length > 0) {
				    var keys = [];
				    var values = [];

				    plate.find('.gm__plate-main').each(function () {
				        result_check($(this).data("key"), keys, values);
				    });

				    desert.find('.gm__plate-desert').each(function () {
				        result_check($(this).data("key"), keys, values);
				    });

				    drink.find('.gm__cup-drink').each(function () {
				        result_check($(this).data("key"), keys, values);
				    });

				    table_result.empty();

				    for (var index in keys) {
				        var key = keys[index];
				        var value = values[index];

				        var product = $('.gm__menu-item[data-key="' + key + '"]');
						$('<tr><td class="gm__result-img" colspan="2"><img src="' + product.find('img').attr('src') +
						'" alt=""></td><td class="gm__result-prod" colspan="3">' + product.find('.gm__menu-title').text() +
						'</td></tr><tr><td colspan="2">' + value + ' порци' + result_ending(value) + ' ' + value * product.data('unit') + ' ' + product.data('measure') +
						'</td><td>' + Math.round(value * product.data('xe') * 100) / 100 + ' ХЕ</td><td>' +
						value * product.data('kcal') + ' кКал</td></tr>').appendTo(table_result);
				    }

				    var title = $('.gm__result-title');
				    title.css('padding-top', '0px');
				    title.css('padding-bottom', '0px');

				    var table = $('.gm__result-in');
				    var result = null;

				    var results = $('.gm__result-text');
				    results.css('margin-top', '0px');
				    results.hide();

				    var choosen = parseFloat(choosen_xe.text());
				    var plan = parseFloat(input_xe.val());

				    if (choosen >= plan + 2) {
				        result = $(results[0]);
				    }
				    else if (choosen <= plan - 2) {
				        result = $(results[1]);
				    }
				    else if (choosen != plan) {
				        result = $(results[2]);
				    }
				    else {
				        result = $(results[3]);
				    }

				    result.show();

				    selected_xe.text(choosen_xe.text() + " XE");
				    selected_kcal.text(choosen_kcal.text() + " Ккал");

				    step_next($(this));

				    var totalDif = 507 - table.outerHeight() - title.outerHeight() - result.outerHeight();
				    var titleDif = totalDif / (2 * (result.outerHeight() / title.outerHeight() + 1));

				    title.css('padding-top', titleDif + 'px')
				    title.css('padding-bottom', titleDif + 'px')
				    result.css('margin-top', (totalDif - 2 * titleDif) / 2 + 'px');
				}
				else {
					warning_min.fadeIn();
				}
			}
			else if (attr == 'gm__step_3') {
				if (!$(this).hasClass('gm__btn_edit')) {
					if (input_xe.val() == '') {
						input_xe.parent().addClass('is-error');
					}
					else {
						plate.empty();
						desert.empty();
						drink.empty();
						input_xe.parent().removeClass('is-error');
						plan_xe.text(input_xe.val() + " XE");
						step_next($(this));
						$('.gm__menu').jScrollPane().data('jsp').reinitialise();
					}
				}
				else {
					step_next($(this));
				}
			}
			else {
			    step_next($(this));

			    if (attr == 'gm__step_2') {
			        HandleGaEvent('Plate', 'Plate|Start');
			    }
			}
		};
	});

	function result_ending(value) {
	    if (value % 10 == 1) {
	        return 'я';
	    }
	    else if (value % 10 > 1 && value % 10 < 5) {
	        return 'и';
	    }
	    else {
	        return 'й';
	    }
	}

	function result_check(key, keys, values) {
	    for (var index in keys) {
	        if (key == keys[index])
	        {
	            values[index]++;
	            return;
	        }
	    }

	    keys.push(key);
	    values.push(1);
	}

	function step_next (argument) {
		var next_step = argument.data('step');
		step.hide();
		$('.' + next_step).fadeIn();
	}

	$('.gm__btn_print').on('click', function () {
	    window.print();
	});
});

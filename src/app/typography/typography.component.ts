import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Hero } from './hero';

declare const $: any;
 

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html'
})




export class TypographyComponent implements OnInit, AfterViewInit {

  title = 'Tour of Heroes';
  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];
  myHero = this.heroes[0];

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initMaterialView();
  }


  

  initMaterialView() {

    $.material.init();

    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();

    // Code for the Validator
    const $validator = $('.wizard-card form').validate({
      rules: {
        firstname: {
          required: true,
          minlength: 3
        },
        lastname: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          minlength: 3,
        }
      },

      errorPlacement: function (error, element) {
        $(element).parent('div').addClass('has-error');
      }
    });

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
      'tabClass': 'nav nav-pills',
      'nextSelector': '.btn-next',
      'previousSelector': '.btn-previous',

      onNext: function (tab, navigation, index) {
        const $valid = $('.wizard-card form').valid();
        if (!$valid) {
          $validator.focusInvalid();
          return false;
        }
      },

      onInit: (tab, navigation, index) => {
        //check number of tabs and fill the entire row
        const $total = navigation.find('li').length;
        const $wizard = navigation.closest('.wizard-card');

        const $first_li = navigation.find('li:first-child a').html();
        const $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
        $('.wizard-card .wizard-navigation').append($moving_div);

        this.refreshAnimation($wizard, index);

        $('.moving-tab').css('transition', 'transform 0s');
      },

      onTabClick: function (tab, navigation, index) {
        var $valid = $('.wizard-card form').valid();

        if (!$valid) {
          return false;
        } else {
          return true;
        }
      },

      onTabShow: (tab, navigation, index) => {
        const $total = navigation.find('li').length;
        const $current = index + 1;

        const $wizard = navigation.closest('.wizard-card');

        // If it's the last tab then hide the last button and show the finish instead
        if ($current >= $total) {
          $($wizard).find('.btn-next').hide();
          $($wizard).find('.btn-finish').show();
        } else {
          $($wizard).find('.btn-next').show();
          $($wizard).find('.btn-finish').hide();
        }

        const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

        setTimeout(function () {
          $('.moving-tab').text(button_text);
        }, 150);

        const checkbox = $('.footer-checkbox');

        if (!index) {
          $(checkbox).css({
            'opacity': '0',
            'visibility': 'hidden',
            'position': 'absolute'
          });
        } else {
          $(checkbox).css({
            'opacity': '1',
            'visibility': 'visible'
          });
        }

        this.refreshAnimation($wizard, index);
      }
    });

    $('[data-toggle="wizard-radio"]').click(function () {
      const wizard = $(this).closest('.wizard-card');
      wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
      $(this).addClass('active');
      $(wizard).find('[type="radio"]').removeAttr('checked');
      $(this).find('[type="radio"]').attr('checked', 'true');
    });

  };


  refreshAnimation($wizard, index: number) {
    const $total = $wizard.find('.nav li').length;
    let $li_width = 100 / $total;

    const total_steps = $wizard.find('.nav li').length;
    let move_distance = $wizard.width() / total_steps;
    let index_temp = index;
    let vertical_level = 0;

    const mobile_device = $(document).width() < 600 && $total > 3;

    if (mobile_device) {
      move_distance = $wizard.width() / 2;
      index_temp = index % 2;
      $li_width = 50;
    }

    $wizard.find('.nav li').css('width', $li_width + '%');

    const step_width = move_distance;
    move_distance = move_distance * index_temp;

    const $current = index + 1;

    if ($current === 1 || (mobile_device === true && (index % 2 === 0))) {
      move_distance -= 8;
    } else if ($current === total_steps || (mobile_device === true && (index % 2 === 1))) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = Number(index / 2);
      vertical_level = vertical_level * 38;
    }

    $wizard.find('.moving-tab').css('width', step_width);
    $('.moving-tab').css({
      'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
      'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)' 
    });
  }

}

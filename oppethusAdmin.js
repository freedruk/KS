      var KS = KS || {};
      var predates = predates || [];
      //[{year:"2011",month:"05",day:"08",startHour:"15",startMinute:"30",endHour:"15",endMinute:"45",cssClasses:"",svid:"1"},
      //{year:"2012",month:"02",day:"10",startHour:"15",startMinute:"30",endHour:"15",endMinute:"0",cssClasses:"",svid:"2"}];


$(function() {

KS.admin_oppethus = (function($, KS, dates, undefined) {
  var _adminDates,
    _settings,
    _rowTemplate;

  _adminDates = dates;
  _settings = {
    ksDatesContainerClass: ".bv-oppethus-container",
    rowTemplateClass: ".bv-js-oppethus-template",
    startHourClass: ".bv-oppethus-timepicker-start-hour",
    startMinuteClass: ".bv-oppethus-timepicker-start-minute",
    endHourClass: ".bv-oppethus-timepicker-end-hour",
    endMinuteClass: ".bv-oppethus-timepicker-end-minute",
    datePickerClass: '.bv-datepicker',
    postToSiteVisionFormId: '#Super-Steer-Fighter-Plus-alpha'
  };
  _rowTemplate = $(_settings.rowTemplateClass);

  var _init = function() {
    _buildKSDateTable();

    $(".bv-add-oppethus").on("click", function(event) {
      var $newRow = $(_settings.rowTemplateClass).first().clone();
      $newRow.removeClass("bv-js-oppethus-template");
      $newRow.removeClass("bv-hide-template");
      $newRow.appendTo($(_settings.ksDatesContainerClass));
      _addKSDateConfig($newRow);
      _setDateByRow($newRow);
    });

    $(".bv-store-oppethus").on("click", function(event) {
      _storeKSData();
    });
  };

  var _buildKSDateTable = function() {
    var $container = $(_settings.ksDatesContainerClass);

    _adminDates.forEach(function(ksDateObject){
      var $newRow = $(_settings.rowTemplateClass).first().clone();
      $newRow.removeClass("bv-js-oppethus-template");
      $newRow.removeClass("bv-hide-template");
      $newRow.appendTo($(_settings.ksDatesContainerClass));
      _addKSDateConfig($newRow);
      _setKSDateObjectByRow($newRow, ksDateObject);
    });
  }

  var _removeKSDate = function(event) {
    $row = $(event.target).parent().parent();
    $row.remove();
  };

  var _storeKSData = function() {
    var $form;

    $form = $(_settings.postToSiteVisionFormId);
    _adminDates = [];

    $(".bv-oppethus-container > div").each(function(index, el) {
      var ksDateObject = _getKSDateObjectByRow($(el));
      ksDateObject.startHour = ksDateObject.startHour.val();
      ksDateObject.startMinute = ksDateObject.startMinute.val();
      ksDateObject.endHour = ksDateObject.endHour.val();
      ksDateObject.endMinute = ksDateObject.endMinute.val();  
      ksDateObject.startDate = '';
      ksDateObject.endDate = '';
      ksDateObject.cssClasses = '';
      ksDateObject.ksid = ((Math.random()*1000)*(Math.random()*100)).toString(); 
      _adminDates.push(ksDateObject);
    });

    $form.find("input[id=data]").first().val(JSON.stringify(_adminDates));
    $form.submit();
    console.log(JSON.stringify(_adminDates));
  };

  var _addKSDateConfig = function($row) {
    $row.find(".bv-datepicker").datepicker({
      dateFormat: 'yy-mm-dd',
      showOn: "button",
      buttonImage: "/images/18.2d0ecb6414dadc4ff24712c5/1433452719109/calendar-o_f15d25_32.png",
      buttonImageOnly: true,
      buttonText: ""      
    });
    _addEventHandlers($row);
  };

  var _addEventHandlers = function($row) {
    $row.find('select').on('change', _checkTimes);
    $row.find('.bv-remove-oppethus').on('click', _removeKSDate);
  };

  var _setDateByRow = function($row) {
    var today = new Date();
    var dd = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate();
    var mm = (today.getMonth() < 10) ? '0' + today.getMonth() : today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    var s_today = yyyy + "-" + mm + '-' + dd;

    $row.find(_settings.datePickerClass).first().val(s_today);
  }

  var _setKSDateObjectByRow = function($row, ksDateObject) {
    var $startHour = $row.find(_settings.startHourClass).first();
    var $startMinute = $row.find(_settings.startMinuteClass).first();
    var $endHour = $row.find(_settings.endHourClass).first();
    var $endMinute = $row.find(_settings.endMinuteClass).first();
    var $date = $row.find(_settings.datePickerClass).first();
    var s_date = ksDateObject.year + "-" + ksDateObject.month + "-" + ksDateObject.day;

    $startHour.val(ksDateObject.startHour);
    $startMinute.val(ksDateObject.startMinute);
    $endHour.val(ksDateObject.endHour);
    $endMinute.val(ksDateObject.endMinute);
    $date.val(s_date);
  }

  var _getKSDateObjectByRow = function($row) {
    var $startHour = $row.find(_settings.startHourClass).first();
    var $startMinute = $row.find(_settings.startMinuteClass).first();
    var $endHour = $row.find(_settings.endHourClass).first();
    var $endMinute = $row.find(_settings.endMinuteClass).first();
    var $date = $row.find(_settings.datePickerClass).first();
    var a_date = $date.val().split('-');
    var startDate = new Date(a_date[0], a_date[1], a_date[2], $startHour.val(), $startMinute.val());
    var endDate = new Date(a_date[0], a_date[1], a_date[2], $endHour.val(), $endMinute.val());

    var ksDateObject = {
      year: a_date[0],
      month: a_date[1],
      day: a_date[2],
      startHour: $startHour,
      startMinute: $startMinute,
      endHour: $endHour,
      endMinute: $endMinute,
      startDate: startDate,
      endDate: endDate
    };
    //alert(ksDateObject.endDate)   
    return ksDateObject;
  };
  var _checkTimes = function(event) {
    var $row = $(event.target).parent().parent();
    var ksDateObject = _getKSDateObjectByRow($row);
    if (ksDateObject.startDate > ksDateObject.endDate) {
      ksDateObject.endHour.val(ksDateObject.startHour.val());
      ksDateObject.endMinute.val(ksDateObject.startMinute.val());
    }
  };

  return {
    init: _init
  }
})(jQuery, KS, predates);   

KS.admin_oppethus.init();
});
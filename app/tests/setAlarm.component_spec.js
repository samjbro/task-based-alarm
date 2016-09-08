var reflect = require("reflect-metadata");
var component = require("../pages/setAlarm/setAlarm.component");
var appSettings = require("application-settings");


describe("Tests for /pages/setAlarm/setAlarm.component.ts", function() {

     var setAlarmComponent;
     beforeEach(function() {
         setAlarmComponent = new component.SetAlarmPage();
     });

    it("Verifies that configureTime set a default time value", function() {

        var timePicker = jasmine.createSpyObj('timePicker', ['hour', 'minute'])

        appSettings.setNumber("hour", 9)
        appSettings.setNumber("minute", 25)
        setAlarmComponent.configureTime(timePicker);

        expect(timePicker.hour).toEqual(9);
        expect(timePicker.minute).toEqual(25);
    });

    it("is able to save a set time value", function() {

      
    });
});

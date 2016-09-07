"use strict";
/**
This tests build components with minimun parameters and checks
that don't trows errors
*/
describe("TreeMap default tests", function () {
    var chart;
    var voidSelectorEquality = function (selector, result) {
        return selector.length === result || selector[0].length === result ? true : false;
    };

    beforeEach(function () {
        jasmine.addCustomEqualityTester(voidSelectorEquality);
    });

    afterEach(function () {});

    it("default values", function () {
        var container = $("body").container("default");
        var chart = new TreeMap({
            container: container
        });
        expect(chart).not.toBe(null);
        expect(chart._data).not.toBeNull();
        expect(chart.container).not.toBeNull();
    });

    it("check builded layers", function () {
        var container = $("body").container("default1");
        var chart = new TreeMap({
            container: container
        });
        expect(chart.container).toBeDefined();
        var svg = chart.container.select("svg");
        expect(svg).toBeDefined();
        expect($(svg).children().length === 0);
    });
});

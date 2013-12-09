/*jshint laxbreak:true*/
/*global chai, describe, it, window*/

// Tests for numgen component/module
describe("numgen", function() {
    var nL = 100,
        nI, expect, NumGen;
    
    // node
    if (typeof chai === "undefined") {
        NumGen = require("../numgen");
        expect = require("./lib/chai").expect;
    }
    // browser
    else {
        NumGen = window.NumGen;
        expect = chai.expect;
    }
    
    describe("ordinary number sequence", function() {
        var reverseSign = function(data) {
            return data.value * -1;
        };
        
        it("should generate sequence that contains only the specified number", function() {
            function test() {
                expect( ng.getValue() )
                    .equal(nN);
                for (nI = 0; nI < nL; nI++) {
                    expect( ng.getNext() )
                        .equal(nN);
                }
            }
            
            var nN = 7,
                ng = new NumGen({
                                    startValue: nN,
                                    valueChange: null
                                });
            
            test();
            
            nN *= 49;
            ng.setStartValue(nN)
                .reset();
            test();
        });
        it("should generate -1/+1 sequence", function() {
            var ng = new NumGen({
                                    startValue: 1,
                                    valueChange: reverseSign
                                });
            
            expect( ng.getValue() )
                .equal(1);
            for (nI = 0; nI < nL; nI++) {
                expect( ng.getNext() )
                    .equal(nI % 2 === 0 ? -1 : 1);
            }
        });
        it("should generate +N/-N sequence", function() {
            var nN = 123,
                ng = new NumGen({
                                    startValue: -nN,
                                    valueChange: reverseSign
                                });
            
            expect( ng.getValue() )
                .equal(-nN);
            for (nI = 0; nI < nL; nI++) {
                expect( ng.getNext() )
                    .equal(nI % 2 === 0 ? nN : -nN);
            }
        });
        it("should generate sequence of even numbers: 2, 4, 6, 8, 10, ...", function() {
            var ng = new NumGen({
                                    valueChange: 2
                                });
            
            for (nI = 0; nI < nL; nI++) {
                expect( ng.getNext() % 2 )
                    .equal(0);
            }
        });
        it("should generate sequence of odd numbers: 1, 3, 5, 7, 9, ...", function() {
            var ng = new NumGen({
                                    startValue: -1,
                                    valueChange: 2
                                });
            
            for (nI = 0; nI < nL; nI++) {
                expect( ng.getNext() % 2 )
                    .equal(1);
            }
        });
        it("should generate sequence of triangular numbers: 1, 3, 6, 10, 15, ...", function() {
            var ng = new NumGen({
                                    valueChange: function(data) {
                                        return data.index * (data.index + 1) * 0.5;
                                    }
                                });
            
            for (nI = 1; nI < nL; nI++) {
                expect( ng.getNext() )
                    .equal(nI * (nI + 1) * 0.5);
            }
        });
        it("should generate sequence of square numbers: 1, 4, 9, 16, 25, ...", function() {
            var ng = new NumGen({
                                    valueChange: function(data) {
                                        return data.index * data.index;
                                    }
                                });
            
            expect( ng.getValue() )
                .equal(0);
            for (nI = 1; nI < nL; nI++) {
                expect( ng.getNext() )
                    .equal(nI * nI);
            }
        });
        it("should generate sequence of cube numbers: 1, 8, 27, 64, 125, ...", function() {
            var ng = new NumGen({
                                    valueChange: function(data) {
                                        var nI = data.index;
                                        return nI * nI * nI;
                                    }
                                });
            
            expect( ng.getValue() )
                .equal(0);
            for (nI = 1; nI < nL; nI++) {
                expect( ng.getNext() )
                    .equal(nI * nI * nI);
            }
        });
        it("should generate arithmetic progression", function() {
            function test() {
                var nPrev;
                expect( ng.getValue() )
                    .equal( ng.getStartValue() );
                for (nI = 0; nI < nL; nI++) {
                    nPrev = ng.getValue();
                    expect( ng.getNext() - nPrev )
                        .equal(nD);
                }
            }
            
            var nD = 9,
                ng = new NumGen({
                                    valueChange: nD
                                });
            
            test();
            
            nD = -25;
            ng.setStartValue(321)
                .setValueChange(nD)
                .reset();
            test();
        });
        it("should generate geometric progression", function() {
            function test() {
                var nFactor = ng.getFactor(),
                    nPrev, nValue;
                expect( nValue = ng.getValue() )
                    .equal( ng.getStartValue() );
                for (nI = 0; nI < nL; nI++) {
                    nPrev = nValue;
                    expect( nValue = ng.getNext()  )
                        .equal(nPrev * nFactor);
                }
            }
            
            var ng = new NumGen({
                                    startValue: 5,
                                    factor: 2,
                                    valueChange: function(data) {
                                        return data.index > 1 ? data.current : data.value;
                                    }
                                });
            
            test();
            
            ng.setStartValue(1)
                .setFactor(-3)
                .reset();
            test();
        });
        it("should generate sequence of Fibonacci numbers: 1, 1, 2, 3, 5, ...", function() {
            var ng = new NumGen({
                                    valueChange: function(data) {
                                        return data.index > 1
                                                ? data.prev + data.current
                                                : 1;
                                    }
                                }),
                nP1, nP2, nV;
            
            expect( nP2 = ng.getValue() )
                .equal(0);
            expect( nP1 = ng.getNext() )
                .equal(1);
            for (nI = 1; nI < nL; nI++) {
                expect( nV = ng.getNext() )
                    .equal(nP2 + nP1);
                nP2 = nP1;
                nP1 = nV;
            }
        });
        it("should generate sequence of the repeated subsequence, e.g. 1, 2, 3, ..., N, 1, 2, 3, ..., N, 1, 2, ...", function() {
            var ng = new NumGen({
                                    maxValue: 10,
                                    resetValueOnMax: true
                                }),
                nK, nN;
            
            expect( ng.getValue() )
                .equal(0);
            for (nI = 1; nI <= nL; nI++) {
                nK = nI % 10;
                expect( nN = ng.getNext() )
                    .below(11);
                expect(nN)
                    .equal(nK === 0 ? 10 : nK);
            }
            
            ng.setStartValue(-7)
                .setMaxValue(5)
                .setValueChange(2)
                .reset();
            
            expect( ng.getValue() )
                .equal( ng.getStartValue() );
            for (nI = 0; nI < 10; nI++) {
                for (nK = -5; nK <= 5; nK += 2) {
                    expect(ng.getNext())
                        .equal(nK);
                }
            }
        });
    });
    
    describe("number sequence with time restrictions", function() {
        it("should return the same value as previous if sequence item is requested after the change period is elapsed", function(done) {
            this.timeout(10000);
            
            function getNext() {
                expect(ng.getNext())
                    .equal(nCurrent);
                if (nI++ < 10) {
                    setTimeout(getNext, nPeriod + 1);
                }
                else {
                    done();
                }
            }
            
            var nPeriod = 300,
                ng = new NumGen({
                                    valueChangePeriod: nPeriod
                                }),
                nCurrent;
            
            for (nI = 1; nI < 11; nI++) {
                expect(ng.getNext())
                    .equal(nI);
            }
            
            nI = 0;
            nCurrent = ng.getCurrent();
            setTimeout(getNext, nPeriod + 1);
        });
        it("should return the start value if sequence item is requested after the save period is elapsed", function(done) {
            this.timeout(10000);
            
            function subseq() {
                var nV = nStart;
                for (nI = 0; nI < 10; nI++) {
                    expect(ng.getNext())
                        .equal( nV = changer(nV) );
                }
            }
            
            function getNext() {
                expect(ng.getNext())
                    .equal(nStart);
                subseq();
                if (nK++ < 10) {
                    setTimeout(getNext, nPeriod + 1);
                }
                else {
                    done();
                }
            }
            
            var changer = Math.sin,
                nK = 0,
                nPeriod = 555,
                nStart = 2,
                ng = new NumGen({
                                    startValue: nStart,
                                    valueSavePeriod: nPeriod,
                                    valueChange: function(param) {
                                        return changer(param.value);
                                    }
                                });
            
            subseq();
            setTimeout(getNext, nPeriod + 1);
        });
    });
    
    describe("generator's supplementary methods", function() {
        describe("clone", function() {
            it("should clone source object", function() {
                var ng = new NumGen({startValue: 100, valueChange: 2, maxValue: 1000}),
                    copy;
                
                ng.getNext();
                ng.getNext();
                
                copy = ng.clone();
                copy.getNext();
                expect(copy.getStartValue())
                    .equal(ng.getStartValue());
                expect(copy.getValueChange())
                    .equal(ng.getValueChange());
                expect(copy.getMaxValue())
                    .equal(ng.getMaxValue());
                
                expect(copy.getCurrent())
                    .not.equal(ng.getCurrent());
                expect(copy.getIndex())
                    .not.equal(ng.getIndex());
            });
        });
        
        describe("getNextPart(nPartSize)", function() {
            it("should return array containing subsequence of specified size", function() {
                var ng = new NumGen();
                
                expect(ng.getNextPart(3))
                    .deep.equal([1, 2, 3]);
                expect(ng.getNextPart(4))
                    .deep.equal([4, 5, 6, 7]);
                expect(ng.getCurrent())
                    .equal(7);
                expect(ng.getIndex())
                    .equal(7);
                
                ng.setValueChange(2)
                    .reset();
                
                expect(ng.getNextPart(5))
                    .deep.equal([2, 4, 6, 8, 10]);
                expect(ng.getCurrent())
                    .equal(10);
                expect(ng.getIndex())
                    .equal(5);
            });
        });
        
        describe("getPart(nFirstIndex, nLastIndex)", function() {
            it("should return array containing specified slice of sequence without modifying its state", function() {
                var ng = new NumGen(),
                    nCurrent, nIndex;
                
                ng.getNext();
                ng.getNext();
                nCurrent = ng.getCurrent();
                nIndex = ng.getIndex();
                
                expect(ng.getPart(10, 15))
                    .deep.equal([10, 11, 12, 13, 14, 15]);
                expect(ng.getCurrent())
                    .equal(nCurrent);
                expect(ng.getIndex())
                    .equal(nIndex);
                
                expect(ng.getPart(0, 3))
                    .deep.equal([0, 1, 2, 3]);
                expect(ng.getCurrent())
                    .equal(nCurrent);
                expect(ng.getIndex())
                    .equal(nIndex);
            });
        });
        
        describe("toArray(nSize)", function() {
            it("should return array containing specified quantity of items from the beginning of sequence", function() {
                var ng = new NumGen(),
                nCurrent, nIndex;
            
                for (nIndex = 0; nIndex < 10; nIndex++) {
                    ng.getNext();
                }
                nCurrent = ng.getCurrent();
                nIndex = ng.getIndex();
                
                expect(ng.toArray(7))
                    .deep.equal([1, 2, 3, 4, 5, 6, 7]);
                expect(ng.getCurrent())
                    .equal(nCurrent);
                expect(ng.getIndex())
                    .equal(nIndex);
            });
        });
    });
});

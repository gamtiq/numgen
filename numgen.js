/**
 * @module numgen
 */


/**
 * Class for objects that generate number sequences.
 * <br>
 * Numbers of sequence are calculated by the following formula:
 * <br>
 * <code>f * v</code>
 * <br>
 * where 
 * <code>f</code> is constant factor (см. {@link module:numgen~NumberGenerator#_factor _factor}), 
 * <code>v</code> is variable value that changes depending on generator properties (см. {@link module:numgen~NumberGenerator#_value _value}).
 * <br>
 * Objects are ES6-iterable.
 * 
 * @param {Object} [initValue]
 *      Specifies initial property values. Keys are property names, their values are values of corresponding properties.
 *      The following keys (properties) can be specified:
 *      <table>
 *          <tr>
 *              <th>Name</th>
 *              <th>Type</th>
 *              <th>Description</th>
 *          </tr>
 *          <tr>
 *              <td>factor</td>
 *              <td>Number</td>
 *              <td>Constant factor that is used to calculate numbers of sequence.</td>
 *          </tr>
 *          <tr>
 *              <td>maxValue</td>
 *              <td>Number</td>
 *              <td>Maximal value of variable.</td>
 *          </tr>
 *          <tr>
 *              <td>passToChanger</td>
 *              <td>Boolean</td>
 *              <td>Indicates whether reference to this object should be passed into function that is used to calculate new value of variable.</td>
 *          </tr>
 *          <tr>
 *              <td>resetValueOnMax</td>
 *              <td>Boolean</td>
 *              <td>Indicates whether variable value should be set to initial value when variable reaches maximal value.</td>
 *          </tr>
 *          <tr>
 *              <td>startValue</td>
 *              <td>Number</td>
 *              <td>Initial value of variable.</td>
 *          </tr>
 *          <tr>
 *              <td>valueChange</td>
 *              <td>Number, Function, Object, null, undefined</td>
 *              <td>Specifies the way to calculate new value of variable (see {@link module:numgen~NumberGenerator#_valueChange _valueChange}).</td>
 *          </tr>
 *          <tr>
 *              <td>valueChangePeriod</td>
 *              <td>Integer</td>
 *              <td>Time interval in milliseconds during which it is possible to calculate new value of variable (see {@link module:numgen~NumberGenerator#_valueChangePeriod _valueChangePeriod}).</td>
 *          </tr>
 *          <tr>
 *              <td>valueSavePeriod</td>
 *              <td>Integer</td>
 *              <td>Time interval in milliseconds during which it is possible to change or preserve value of variable (see {@link module:numgen~NumberGenerator#_valueSavePeriod _valueSavePeriod}).</td>
 *          </tr>
 *      </table>
 * @constructor
 */
function NumberGenerator(initValue) {
    if (initValue && typeof initValue === "object") {
        if ("factor" in initValue) {
            this.setFactor(initValue.factor);
        }
        if ("startValue" in initValue) {
            this.setStartValue(initValue.startValue);
        }
        if ("maxValue" in initValue) {
            this.setMaxValue(initValue.maxValue);
        }
        if ("resetValueOnMax" in initValue) {
            this.setResetValueOnMax(initValue.resetValueOnMax);
        }
        if ("valueChange" in initValue) {
            this.setValueChange(initValue.valueChange);
        }
        if ("passToChanger" in initValue) {
            this.setPassToChanger(initValue.passToChanger);
        }
        if ("valueChangePeriod" in initValue) {
            this.setValueChangePeriod(initValue.valueChangePeriod);
        }
        if ("valueSavePeriod" in initValue) {
            this.setValueSavePeriod(initValue.valueSavePeriod);
        }
    }
    this.reset();
}


/**
 * Constant factor that is used to calculate numbers of sequence.
 *  
 * @protected
 * @type {Number}
 */
NumberGenerator.prototype._factor = 1;

/**
 * Return constant factor that is used to calculate numbers of sequence.
 *
 * @return {Number}
 *      Constant factor that is used to calculate numbers of sequence.
 * @method
 * @see {@link module:numgen~NumberGenerator#_factor _factor}
 */
NumberGenerator.prototype.getFactor = function() {
    return this._factor;
};

/**
 * Set constant factor that is used to calculate numbers of sequence.
 *
 * @param {Number} nFactor
 *      Constant factor that is used to calculate numbers of sequence.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_factor _factor}
 */
NumberGenerator.prototype.setFactor = function(nFactor) {
    this._factor = nFactor;
    return this;
};

/**
 * Variable value that is used to calculate numbers of sequence.
 *  
 * @protected
 * @type {Number}
 * @see {@link module:numgen~NumberGenerator#_valueChange _valueChange}
 */
NumberGenerator.prototype._value = 0;

/**
 * Return current variable value.
 *
 * @return {Number}
 *      Current variable value.
 * @method
 * @see {@link module:numgen~NumberGenerator#_value _value}
 */
NumberGenerator.prototype.getValue = function() {
    return this._value;
};

/**
 * Initial value of variable.
 *  
 * @protected
 * @type {Number}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 */
NumberGenerator.prototype._startValue = 0;

/**
 * Return initial value of variable.
 *
 * @return {Number}
 *      Initial value of variable.
 * @method
 * @see {@link module:numgen~NumberGenerator#_startValue _startValue}
 */
NumberGenerator.prototype.getStartValue = function() {
    return this._startValue;
};

/**
 * Set initial value of variable.
 *
 * @param {Number} nValue
 *      Initial value of variable.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_startValue _startValue}
 */
NumberGenerator.prototype.setStartValue = function(nValue) {
    this._startValue = nValue;
    return this;
};

/**
 * Maximal value of variable.
 *  
 * @protected
 * @type {Number}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 */
NumberGenerator.prototype._maxValue = Number.MAX_VALUE;

/**
 * Return maximal value of variable.
 *
 * @return {Number}
 *      Maximal value of variable.
 * @method
 * @see {@link module:numgen~NumberGenerator#_maxValue _maxValue}
 */
NumberGenerator.prototype.getMaxValue = function() {
    return this._maxValue;
};

/**
 * Set maximal value of variable.
 *
 * @param {Number} nValue
 *      Maximal value of variable.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_maxValue _maxValue}
 */
NumberGenerator.prototype.setMaxValue = function(nValue) {
    this._maxValue = nValue;
    return this;
};

/**
 * Indicates whether variable value should be set to initial value when variable reaches maximal value.
 *  
 * @protected
 * @type {Boolean}
 * @see {@link module:numgen~NumberGenerator#_maxValue _maxValue}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 */
NumberGenerator.prototype._resetValueOnMax = false;

/**
 * Test whether variable value should be set to initial value when variable reaches maximal value.
 *
 * @return {Boolean}
 *      <code>true</code>, if variable value will be reset, otherwise <code>false</code>.
 * @method
 * @see {@link module:numgen~NumberGenerator#_resetValueOnMax _resetValueOnMax}
 */
NumberGenerator.prototype.isResetValueOnMax = function() {
    return this._resetValueOnMax;
};

/**
 * Change the property that indicates whether variable value should be set to initial value when variable reaches maximal value.
 *
 * @param {Boolean} bReset
 *      <code>true</code>, if variable value should be reset, otherwise <code>false</code>.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_resetValueOnMax _resetValueOnMax}
 */
NumberGenerator.prototype.setResetValueOnMax = function(bReset) {
    this._resetValueOnMax = bReset;
    return this;
};

/**
 * Specifies the way to calculate new value of variable.
 * <br>
 * The following values can be used:
 * <ul>
 * <li><code>null</code> or <code>undefined</code> means that variable's value does not change (i.e. variable is constant);
 * <li>a number means that new value is the sum of previous value and the number;
 * <li>a function or an object having <code>execute</code> method means that new value is result of function/method call.
 * </ul>
 * In the latter case the following object is passed as argument into function/method:
 * <table>
 *     <tr>
 *         <th>Field</th>
 *         <th>Type</th>
 *         <th>Description</th>
 *     </tr>
 *     <tr>
 *         <td><code>current</code></td>
 *         <td><code>Number</code></td>
 *         <td>The current item of sequence (i.e. the last item that was returned 
 *              by {@link module:numgen~NumberGenerator#getNext getNext} method).</td>
 *     </tr>
 *     <tr>
 *         <td><code>factor</code></td>
 *         <td><code>Number</code></td>
 *         <td>Constant factor that is used to calculate numbers of sequence.</td>
 *     </tr>
 *     <tr>
 *         <td><code>generator</code></td>
 *         <td><code>Object</code></td>
 *         <td>
 *              Reference to <code>this</code> object that represents number generator.
 *              This field is available only when <code>passToChanger</code> property is <code>true</code>
 *              (i.e. when {@link module:numgen~NumberGenerator#isPassToChanger isPassToChanger} returns <code>true</code>).
 *         </td>
 *     </tr>
 *     <tr>
 *         <td><code>index</code></td>
 *         <td><code>Integer</code></td>
 *         <td>The index of sequence's number that is being calculated.</td>
 *     </tr>
 *     <tr>
 *         <td><code>maxValue</code></td>
 *         <td><code>Number</code></td>
 *         <td>Maximal value of variable.</td>
 *     </tr>
 *     <tr>
 *         <td><code>prev</code></td>
 *         <td><code>Number</code></td>
 *         <td>The previous item of sequence (i.e. the result that is returned 
 *              by {@link module:numgen~NumberGenerator#getPrev getPrev} method).</td>
 *     </tr>
 *     <tr>
 *         <td><code>startValue</code></td>
 *         <td><code>Number</code></td>
 *         <td>Initial value of variable.</td>
 *     </tr>
 *     <tr>
 *         <td><code>state</code></td>
 *         <td><code>Object</code></td>
 *         <td>
 *              The data that are necessary to generator's work.
 *              The object can be used to save intermediate values (e.g. several preceding items of sequence).
 *         </td>
 *     </tr>
 *     <tr>
 *         <td><code>value</code></td>
 *         <td><code>Number</code></td>
 *         <td>The current value of variable.</td>
 *     </tr>
 * </table>
 *  
 * @protected
 * @type {Number | Function | Object | null | undefined}
 * @see {@link module:numgen~NumberGenerator#_state _state}
 * @see {@link module:numgen~NumberGenerator#_passToChanger _passToChanger}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype._valueChange = 1;

/**
 * Return value that specifies the way to calculate new value of variable.
 *
 * @return {Number | Function | Object | null | undefined}
 *      Value that specifies the way to calculate new value of variable.
 * @method
 * @see {@link module:numgen~NumberGenerator#_valueChange _valueChange}
 */
NumberGenerator.prototype.getValueChange = function() {
    return this._valueChange;
};

/**
 * Set the way to calculate new value of variable.
 *
 * @param {Number | Function | Object | null | undefined} change
 *      Specifies the way to calculate new value of variable.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_valueChange _valueChange}
 */
NumberGenerator.prototype.setValueChange = function(change) {
    this._valueChange = change;
    return this;
};

/**
 * Indicates whether reference to this object should be passed into function that is used to calculate new value of variable.
 * 
 * @protected
 * @type {Boolean}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 * @see {@link module:numgen~NumberGenerator#_valueChange _valueChange}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype._passToChanger = false;

/**
 * Test whether reference to this object should be passed into function that is used to calculate new value of variable.
 *
 * @return {Boolean}
 *      <code>true</code>, if reference to this object should be passed into function, otherwise <code>false</code>.
 * @method
 * @see {@link module:numgen~NumberGenerator#_passToChanger _passToChanger}
 */
NumberGenerator.prototype.isPassToChanger = function() {
    return this._passToChanger;
};

/**
 * Change the property that indicates whether reference to this object should be passed into function that is used to calculate new value of variable.
 *
 * @param {Boolean} bPass
 *      <code>true</code>, if reference to this object should be passed into function, otherwise <code>false</code>.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_passToChanger _passToChanger}
 */
NumberGenerator.prototype.setPassToChanger = function(bPass) {
    this._passToChanger = bPass;
    return this;
};

/**
 * Time interval in milliseconds during which it is possible to calculate new value of variable.
 * Negative value indicates that there are no time restrictions for calculation of new value.
 * 
 * @protected
 * @type {Integer}
 * @see {@link module:numgen~NumberGenerator#_lastNumberTime _lastNumberTime}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 */
NumberGenerator.prototype._valueChangePeriod = -1;

/**
 * Return time interval in milliseconds during which it is possible to calculate new value of variable.
 *
 * @return {Integer}
 *      Time interval in milliseconds during which it is possible to calculate new value of variable.
 * @method
 * @see {@link module:numgen~NumberGenerator#_valueChangePeriod _valueChangePeriod}
 */
NumberGenerator.prototype.getValueChangePeriod = function() {
    return this._valueChangePeriod;
};

/**
 * Set time interval in milliseconds during which it is possible to calculate new value of variable.
 *
 * @param {Integer} nPeriod
 *      Time interval in milliseconds during which new value of variable can be calculated.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_valueChangePeriod _valueChangePeriod}
 */
NumberGenerator.prototype.setValueChangePeriod = function(nPeriod) {
    this._valueChangePeriod = nPeriod;
    return this;
};

/**
 * Time interval in milliseconds during which it is possible to change or preserve value of variable.
 * When the interval ends the variable is reset to initial value.
 * Negative value indicates that reset of variable's value is not used.
 * 
 * @protected
 * @type {Integer}
 * @see {@link module:numgen~NumberGenerator#_lastNumberTime _lastNumberTime}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 */
NumberGenerator.prototype._valueSavePeriod = -1;

/**
 * Return time interval in milliseconds during which it is possible to change or preserve value of variable.
 *
 * @return {Integer}
 *      Time interval in milliseconds during which it is possible to change or preserve value of variable.
 * @method
 * @see {@link module:numgen~NumberGenerator#_valueSavePeriod _valueSavePeriod}
 */
NumberGenerator.prototype.getValueSavePeriod = function() {
    return this._valueSavePeriod;
};

/**
 * Set time interval in milliseconds during which it is possible to change or preserve value of variable.
 *
 * @param {Integer} nPeriod
 *      Time interval in milliseconds during which value of variable can be changed or preserved.
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_valueSavePeriod _valueSavePeriod}
 */
NumberGenerator.prototype.setValueSavePeriod = function(nPeriod) {
    this._valueSavePeriod = nPeriod;
    return this;
};

/**
 * The index of the current item of sequence.
 * 
 * @protected
 * @type {Integer}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype._index = 0;

/**
 * Return the index of the current item of sequence.
 *
 * @return {Integer}
 *      The index of the current item of sequence.
 * @method
 * @see {@link module:numgen~NumberGenerator#_index _index}
 */
NumberGenerator.prototype.getIndex = function() {
    return this._index;
};

/**
 * The previous item of sequence.
 * 
 * @protected
 * @type {Number}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype._prev = void 0;

/**
 * Return the previous item of sequence.
 *
 * @return {Number}
 *      The previous item of sequence.
 * @method
 * @see {@link module:numgen~NumberGenerator#_prev _prev}
 */
NumberGenerator.prototype.getPrev = function() {
    return this._prev;
};

/**
 * The current item of sequence (the last requested item by {@link module:numgen~NumberGenerator#getNext getNext}).
 * 
 * @protected
 * @type {Number}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype._current = 0;

/**
 * Return the current item of sequence (the last requested item by {@link module:numgen~NumberGenerator#getNext getNext}).
 *
 * @return {Number}
 *      The current item of sequence (the last requested item by {@link module:numgen~NumberGenerator#getNext getNext}).
 * @method
 * @see {@link module:numgen~NumberGenerator#_current _current}
 */
NumberGenerator.prototype.getCurrent = function() {
    return this._current;
};

/**
 * Time where the last calculated item of sequence was requested (represented in milliseconds from start of epoch). 
 * 
 * @protected
 * @type {Integer}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype._lastNumberTime = 0;

/**
 * Contains any data necessary for generator's work.
 * Can be used by function that calculates value of variable to save intermediate values e.g. several preceding items of sequence.
 *  
 * @protected
 * @type {Object}
 * @see {@link module:numgen~NumberGenerator#_valueChange _valueChange}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype._state = null;

/**
 * Return next item of sequence.
 *
 * @return {Number}
 *      Next item of sequence.
 * @method
 * @see {@link module:numgen~NumberGenerator#_current _current}
 * @see {@link module:numgen~NumberGenerator#_index _index}
 * @see {@link module:numgen~NumberGenerator#_lastNumberTime _lastNumberTime}
 * @see {@link module:numgen~NumberGenerator#_prev _prev}
 * @see {@link module:numgen~NumberGenerator#_state _state}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 * @see {@link module:numgen~NumberGenerator#getFactor getFactor}
 * @see {@link module:numgen~NumberGenerator#getMaxValue getMaxValue}
 * @see {@link module:numgen~NumberGenerator#getStartValue getStartValue}
 * @see {@link module:numgen~NumberGenerator#getValueChange getValueChange}
 * @see {@link module:numgen~NumberGenerator#getValueChangePeriod getValueChangePeriod}
 * @see {@link module:numgen~NumberGenerator#getValueSavePeriod getValueSavePeriod}
 * @see {@link module:numgen~NumberGenerator#isPassToChanger isPassToChanger}
 * @see {@link module:numgen~NumberGenerator#isResetValueOnMax isResetValueOnMax}
 */
NumberGenerator.prototype.getNext = function() {
    /*jshint boss:true, expr:true*/
    var nFactor = this.getFactor(),
        nPrevTime = this._lastNumberTime,
        nStartValue = this.getStartValue(),
        nTime = this._lastNumberTime = new Date().getTime(),
        nTimeDiff = nTime - nPrevTime,
        nV = this.getValueSavePeriod(),
        change, nMaxValue, param;
    this._index++;
    if (nV >= 0 && nTimeDiff > nV) {
        nV = this._value = nStartValue;
    }
    else if ((nV = this.getValueChangePeriod()) < 0 || nTimeDiff <= nV) {
        nMaxValue = this.getMaxValue();
        change = this.getValueChange();
        if (typeof change === "number") {
            this._value += change;
        }
        else if (change) {
            param = {
                index: this._index,
                value: this._value,
                startValue: this.getStartValue(),
                maxValue: nMaxValue,
                factor: nFactor,
                prev: this._prev,
                current: this._current,
                state: this._state || (this._state = {})
            };
            if (this.isPassToChanger()) {
                param.generator = this;
            }
            if (typeof change === "function") {
                this._value = change(param);
            }
            else if (typeof change.execute === "function") {
                this._value = change.execute(param);
            }
        }
        nV = this._value;
        if (nV >= nMaxValue) {
            nV = this._value = nMaxValue;
            this.isResetValueOnMax() &&
                (this._value = nStartValue);
        }
    }
    else {
        nV = this._value;
    }
    this._prev = this._current;
    return (this._current = nV * nFactor);
};

/**
 * Return array containing several next items of sequence.
 *
 * @param {Integer} nPartSize
 *      Quantity of next items of sequence that should be included in result.
 * @return {Array}
 *      Array containing several next items of sequence.
 * @method
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 */
NumberGenerator.prototype.getNextPart = function(nPartSize) {
    var result = [];
    while (nPartSize-- > 0) {
        result.push(this.getNext());
    }
    return result;
};

/**
 * Create new generator object that is similar to this one but is in initial state.
 *
 * @return {Object}
 *      Reference to the newly created object.
 * @method
 * @see {@link module:numgen~NumberGenerator#getFactor getFactor}
 * @see {@link module:numgen~NumberGenerator#getMaxValue getMaxValue}
 * @see {@link module:numgen~NumberGenerator#getStartValue getStartValue}
 * @see {@link module:numgen~NumberGenerator#getValueChange getValueChange}
 * @see {@link module:numgen~NumberGenerator#getValueChangePeriod getValueChangePeriod}
 * @see {@link module:numgen~NumberGenerator#getValueSavePeriod getValueSavePeriod}
 * @see {@link module:numgen~NumberGenerator#isPassToChanger isPassToChanger}
 * @see {@link module:numgen~NumberGenerator#isResetValueOnMax isResetValueOnMax}
 */
NumberGenerator.prototype.clone = function() {
    return new NumberGenerator({
        factor: this.getFactor(),
        maxValue: this.getMaxValue(),
        passToChanger: this.isPassToChanger(),
        resetValueOnMax: this.isResetValueOnMax(),
        startValue: this.getStartValue(),
        valueChange: this.getValueChange(),
        valueChangePeriod: this.getValueChangePeriod(),
        valueSavePeriod: this.getValueSavePeriod()
    });
};

/**
 * Return array containing several consecutive items of sequence 
 * (subsequence containing items with indexes from <code>nFirstIndex</code> up to <code>nLastIndex</code>).
 * <br>
 * Unlike {@link module:numgen~NumberGenerator#getNextPart getNextPart} this method does not change object's state
 * (i.e. {@link module:numgen~NumberGenerator#_current _current} and {@link module:numgen~NumberGenerator#_index _index}
 * fields preserve their values).
 *
 * @param {Integer} nFirstIndex
 *      Index of first item that should be included in result.
 * @param {Integer} nLastIndex
 *      Index of last item that should be included in result.
 * @return {Array}
 *      Subsequence containing items with indexes from <code>nFirstIndex</code> up to <code>nLastIndex</code>.
 * @method
 * @see {@link module:numgen~NumberGenerator#clone clone}
 * @see {@link module:numgen~NumberGenerator#getNext getNext}
 * @see {@link module:numgen~NumberGenerator#getNextPart getNextPart}
 */
NumberGenerator.prototype.getPart = function(nFirstIndex, nLastIndex) {
    "use strict";
    var result = [],
        copy, nIndex;
    if (nFirstIndex <= nLastIndex) {
        copy = this.clone();
        nIndex = 0;
        while (nIndex < nFirstIndex) {
            nIndex++;
            if (nIndex < nFirstIndex) {
                copy.getNext();
            }
        }
        if (nIndex === 0) {
            result.push(copy.getCurrent());
            nIndex++;
        }
        while (nIndex++ <= nLastIndex) {
            result.push(copy.getNext());
        }
    }
    return result;
};

/**
 * Convert object into array.
 * <br>
 * Essentially this method is the wrap for the following call:
 * <code>this.getPart(1, nSize);</code>
 *
 * @param {Integer} nSize
 *      Size of array.
 * @return {Array}
 *      Subsequence containing items with indexes from 1 up to <code>nSize</code>.
 * @method
 * @see {@link module:numgen~NumberGenerator#getPart getPart}
 */
NumberGenerator.prototype.toArray = function(nSize) {
    return this.getPart(1, nSize);
};

/**
 * Reset parameters of generator to initial values.
 * <br>
 * This method should be called after generator's creation when properties are changed that influence on generator's work.
 * This method shouldn't be called when generator's properties are set by constructor's parameters.
 *
 * @return {Object}
 *      Reference to <code>this</code> object.
 * @method
 * @see {@link module:numgen~NumberGenerator#_lastNumberTime _lastNumberTime}
 * @see {@link module:numgen~NumberGenerator#_value _value}
 */
NumberGenerator.prototype.reset = function() {
    this._value = this._startValue;
    this._current = this.getValue() * this.getFactor();
    this._prev = void 0;
    this._index = 0;
    this._lastNumberTime = new Date().getTime();
    this._state = null;
    return this;
};

/**
 * Free resources that are allocated for object.
 *
 * @method
 * @see {@link module:numgen~NumberGenerator#_state _state}
 */
NumberGenerator.prototype.dispose = function() {
    this._state = null;
};

/**
 * Convert object into string.
 *
 * @return {String}
 *      String representation of the object.
 * @method
 * @see {@link module:numgen~NumberGenerator#getCurrent getCurrent}
 * @see {@link module:numgen~NumberGenerator#getFactor getFactor}
 * @see {@link module:numgen~NumberGenerator#getIndex getIndex}
 * @see {@link module:numgen~NumberGenerator#getMaxValue getMaxValue}
 * @see {@link module:numgen~NumberGenerator#getPrev getPrev}
 * @see {@link module:numgen~NumberGenerator#getStartValue getStartValue}
 * @see {@link module:numgen~NumberGenerator#getValue getValue}
 * @see {@link module:numgen~NumberGenerator#getValueChangePeriod getValueChangePeriod}
 * @see {@link module:numgen~NumberGenerator#getValueSavePeriod getValueSavePeriod}
 * @see {@link module:numgen~NumberGenerator#isPassToChanger isPassToChanger}
 * @see {@link module:numgen~NumberGenerator#isResetValueOnMax isResetValueOnMax}
 */
NumberGenerator.prototype.toString = function() {
    "use strict";
    var nValue;
    return [
            "NumberGenerator: ",
            "factor - ", this.getFactor(),
            ", value - ", this.getValue(),
            ", start value - ", this.getStartValue(),
            ", max value - ", this.getMaxValue(),
            ", value change period - ", ((nValue = this.getValueChangePeriod()) < 0 ? "no" : nValue + "ms"),
            ", value save period - ", ((nValue = this.getValueSavePeriod()) < 0 ? "no" : nValue + "ms"),
            ", index - ", this.getIndex(),
            ", previous item - ", this.getPrev(),
            ", current item - ", this.getCurrent()
            ].join("");
};

if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    NumberGenerator.prototype[Symbol.iterator] = function() {
        return this;
    };
    
    NumberGenerator.prototype.next = function() {
        return {
            done: false,
            value: this.getNext()
        };
    };
}

//Exports

module.exports = NumberGenerator;

# Mixed-Radix

### Create representations of mixed radix numeral systems

A mixed radix numeral system is like our time system or imperial measurement
systems. For instance you can measure time in weeks,days,hours,minutes,seconds.
To represent this system so that you can do math, extract the value at specific
places, and convert to and from regular numbers you can use this package. 

### Usage

```js
const mixedRadix = require('mixed-radix');

// Convert 100000 seconds to a more understandable format

let seconds = 100000;

let timeRadices = [24, 60, 60]
/* this means our numberalSystem allows up to but not including 60 seconds 
 * in the first position, 60 minutes in the second position, and 24 hours in
 * the third position.  The fourth position, days, is unlimited.  We could
 * do [365.25, 24, 60, 60] which would add a years position. 
 */

let time = mixedRadix(100000, timeRadices);
/* create a mixedRadixNumber whose value is 100000 seconds and who's 
 * numeralSystem is defined by timeRadices
 */

time.representation();
/* [1, 3, 46, 40] 
 * That's 1 day, 3 hours, 46 minutes and 40 seconds
 */

// Express 100,000 seconds in hours

let newTime = time.shiftPoint(-2);
/* move the radix point 2 positions to the left.  This makes the "zeros" 
 * place the hours place.
 */

let hours = newTime.value();
/* 
 * 

// Altogether, converting 100,000 seconds to hours

let hours = mixedRadix(100000, [24, 60, 60]).shiftPoint(-2).value();
```

// Create mixed-radix number 

let num = mixedRadix(40, [4,3,2]);

// num will now have an internal representation of 
// [1, 2, 2, 0] and that corresponds to 1 * 4*3*2 + 2 * 3*2 + 2 * 2 + 0

// With a specific radix point
let num = mixedRadix(40, [4,3,2], -1);

// make a numeral system
let system = mixedRadix.make([4,3,2]);

// With specific radix point
let system = mixedRadix.make([4,3,2], -1);

num.representation() 
// [1, 2, 2, 0]

num.value() 
// 40

num.place(0) 
// 0 

num.place(3) 
// 1  

// move the radix point one position to the left, equivalent to multipying a base 10 number by 10^(-1). Returns new number.
let newNum = num.shiftRadixPoint(-1);
newNum.toNumber();
// [value]

// The ; represents the radix point (decimal point), oo represents infinity

num.toString() 
// '1, 2, 2, 0;\noo, 4, 3, 2'

// using unicode subscript notation
num.toSubscriptNotation() 
// 1ₒₒ2₄2₃0₂

// first converts number to back to base 10, performs the addition, 
// then converts to mixed-radix number number back, performs addition, then converts
let newNum = num.add(20);

// can add mixed-radix numbers too
let another = num.add(newNum);





l et numberSystem = places.fromArray([365,24,60,60]);
numberSystem.lowerEndBase(10);
numberSystem.upperEndBase(10);
numberSystem.names(['days', ''], zeroPlace)

let number = numberSystem.fromBase(10, 12345);

number.place(3)
number.toString()
number.toNumber(fromPlace);
number.add();
number.mul();
number.dif();

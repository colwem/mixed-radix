let numberSystem = places.fromArray([365,24,60,60]);
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

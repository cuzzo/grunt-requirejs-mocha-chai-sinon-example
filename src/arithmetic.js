define([
    'times-six',
    'add-one'
    ], function(TimesSix,AddOne) {
        return {
            answer: TimesSix.timesSix(AddOne.addOne(1))
        }
});

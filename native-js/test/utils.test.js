const {indexesOf} = utils

describe('Utils', function() {
    it('test test', function() {
        let foo = 'abx'
        expect(foo).to.be.a('string');
    });
    describe('indexesOf', function() {
        it('should return all indexes of given item in the array', function() {
            const pets = ['tiger', 'dog', 'snake', 'dog']
            let indexes = indexesOf(pets, 'dog')

            expect(indexes).to.have.lengthOf(2);
            expect(indexes[0]).to.equal(1);
            expect(indexes[1]).to.equal(3);
        });

        it('should return empty if given item can\'t be found in array', function() {
            const pets = ['tiger', 'dog', 'snake', 'dog']
            let indexes = indexesOf(pets, 'cat')

            expect(indexes).to.be.empty;
        });
    });

});

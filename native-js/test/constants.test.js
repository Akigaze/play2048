describe('Constants', function() {
    describe('Test Common Constants', function() {
        const {EVENT_KEY} = commonConstants

        it('should event keys include UP, DOWN, LEFT and RIGHT', function() {
            expect(Object.keys(EVENT_KEY)).to.have.lengthOf(8);
            expect(EVENT_KEY['UP']).to.equal(38)
            expect(EVENT_KEY['DOWN']).to.equal(40)
            expect(EVENT_KEY['LEFT']).to.equal(37)
            expect(EVENT_KEY['RIGHT']).to.equal(39)
            expect(EVENT_KEY['38']).to.equal("UP")
            expect(EVENT_KEY['40']).to.equal("DOWN")
            expect(EVENT_KEY['37']).to.equal("LEFT")
            expect(EVENT_KEY['39']).to.equal("RIGHT")
        });
    });
});

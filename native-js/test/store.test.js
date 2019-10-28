describe('Store', function() {
          const expect = chai.expect
    describe('State', function() {
        const {state} = store

        it('should create initialState', function() {
            expect(state.over).to.be.false
            expect(state.win).to.be.false
            expect(state.history).to.be.empty
            expect(state.cellValues).to.be.empty
            expect(state.step).to.equal(0)
        });
    });

    describe('Config', function() {

    });

    describe('Action', function() {

    });
});

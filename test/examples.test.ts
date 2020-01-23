import { run } from '../examples/basicAas';

import { expect } from 'chai';

describe('run examples', function() {
    it('run basicAas example', function() {
        expect(function() {
            run();
        }).to.not.throw();
    });
});

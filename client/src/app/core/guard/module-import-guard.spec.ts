import { TestBed } from '@angular/core/testing';
import { throwIfAlreadyLoaded } from './module-import-guard';

describe('module-import-guard', () => {
    it('Must throw an exception for multiple imports', () => {
        expect(throwIfAlreadyLoaded(null, 'coreModule')).toBeUndefined();
        expect(() => throwIfAlreadyLoaded('testParentModule', 'coreModule')).toThrow();
    });
});

describe('Helpers Factory', function () {
	var HelperFuncs;

	beforeEach(angular.mock.module('co.helpers'));

	beforeEach(inject(function (_HelperFuncs_) {
		HelperFuncs = _HelperFuncs_;
	}));

	it('should exist', function () {
		expect(HelperFuncs).toBeDefined();
	});
	
	describe('Array Average function', function () {
		it('should exist', function () {
			expect(HelperFuncs.arrayAverage).toBeDefined();
		});
		it('should return average', function () {
			expect(HelperFuncs.arrayAverage([1,2,3])).toEqual(2);
		});
		it('should return undefined', function () {
			expect(HelperFuncs.arrayAverage('aaaa')).not.toBeDefined();
		});

	})

	describe('Video Type function', function () {
		it('should exist', function () {
			expect(HelperFuncs.videoType).toBeDefined();
		});
		it('should return mp4', function () {
			expect(HelperFuncs.videoType('video.mp4')).toEqual('mp4');
		});
		it('should return undefined', function () {
			expect(HelperFuncs.videoType('string')).toEqual('string');
		});
		it('should return undefined', function () {
			expect(HelperFuncs.videoType(11)).not.toBeDefined();
		});
	})
})
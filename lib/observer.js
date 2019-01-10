"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersectionObserver = (typeof window !== 'undefined' &&
    typeof IntersectionObserver === 'function' &&
    new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var domEl = entry.target;
                domEl.onIntersection && domEl.onIntersection();
                exports.intersectionObserver.unobserve(domEl);
            }
        });
    }));
function observe(domEl) {
    if (exports.intersectionObserver) {
        exports.intersectionObserver.observe(domEl);
    }
    else {
        throw new Error('This browser doesn\'t support InterceptionObserver, consider to add a pollyfill');
    }
}
exports.observe = observe;
//# sourceMappingURL=observer.js.map